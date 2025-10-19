// uNmINeD 지도 초기화
if (UnminedCustomMarkers && UnminedCustomMarkers.isEnabled && UnminedCustomMarkers.markers) {
    UnminedMapProperties.markers = UnminedMapProperties.markers.concat(UnminedCustomMarkers.markers);
}

let unmined = new Unmined();

if (UnminedPlayers && UnminedPlayers.length > 0) {
    UnminedMapProperties.markers = UnminedMapProperties.markers.concat(unmined.createPlayerMarkers(UnminedPlayers));
}

unmined.map('map', UnminedMapProperties, UnminedRegions);

// 중앙 좌표 표시 업데이트 함수
function updateCenterCoordinates() {
    var view = unmined.openlayersMap.getView();
    var center = view.getCenter();
    
    if (center) {
        var x = Math.round(center[0]);
        var z = Math.round(-center[1]);
        
        var coordElement = document.querySelector('.custom-mouse-position');
        if (!coordElement) {
            coordElement = document.querySelector('.ol-mouse-position');
        }
        
        if (coordElement) {
            coordElement.textContent = `${x}, ${z}`;
        }
    }
}

// 지도 이동 및 줌 이벤트에 좌표 업데이트
unmined.openlayersMap.on('moveend', updateCenterCoordinates);
unmined.openlayersMap.on('pointerdrag', updateCenterCoordinates);
unmined.openlayersMap.getView().on('change:center', updateCenterCoordinates);

// 초기 좌표 표시
setTimeout(updateCenterCoordinates, 100);

// 현재 포커스 마커 레이어를 저장할 변수 선언
var focusMarkerLayer = null;

// 메뉴 버튼 클릭 이벤트 처리
document.getElementById('menuBtn').addEventListener('click', function () {
    var subMenu = document.getElementById('subMenu');
    var overlay = document.getElementById('overlay');

    // 보조 메뉴창의 표시 여부를 토글합니다.
    if (subMenu.style.display === 'none' || subMenu.style.display === '') {
        subMenu.style.display = 'block';
        overlay.style.display = 'block'; // 배경 오버레이를 보이도록 합니다.
    } else {
        subMenu.style.display = 'none';
        overlay.style.display = 'none'; // 배경 오버레이를 숨깁니다.
    }
});

// 타이틀 클릭 시 새로고침
document.getElementById('title').addEventListener('click', function () {
    location.reload();
});

// 검색
var lastSearchQuery = '';
var searchTimer = null;
var maxSearchHistory = 10; // 최대 저장 개수

// localStorage에서 검색 기록 가져오기
function getSearchHistory() {
    var history = localStorage.getItem('searchHistory');
    return history ? JSON.parse(history) : [];
}

// localStorage에 검색 기록 저장
function saveSearchHistory(query) {
    if (!query || query.trim() === '') return;
    
    var history = getSearchHistory();
    
    // 중복 제거
    history = history.filter(function(item) {
        return item !== query;
    });
    
    // 최신 검색어를 맨 앞에 추가
    history.unshift(query);
    
    // 최대 개수 제한
    if (history.length > maxSearchHistory) {
        history = history.slice(0, maxSearchHistory);
    }
    
    localStorage.setItem('searchHistory', JSON.stringify(history));
}

// 검색 기록 표시
function showSearchHistory() {
    var resultsContainer = document.getElementById('search-results');
    var history = getSearchHistory();
    
    resultsContainer.innerHTML = '';
    
    if (history.length === 0) {
        resultsContainer.style.display = 'none';
        return;
    }
    
    history.forEach(function(query) {
        var resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.innerHTML = `<div class="result-title">🕐 ${query}</div>`;
        resultItem.addEventListener('click', function() {
            // 해당 마커 찾기
            var marker = UnminedCustomMarkers.markers.find(function(m) {
                return m.text === query;
            });
            
            if (marker) {
                // 마커 찾으면 바로 이동
                focusOnMarker(marker);
                showDetailWindow(marker);
                resultsContainer.style.display = 'none';
                document.getElementById('search-window').value = '';
            } else {
                // 마커 없으면 검색만 실행
                document.getElementById('search-window').value = query;
                performSearch(query);
            }
        });
        resultsContainer.appendChild(resultItem);
    });
    
    // 검색 기록 삭제 버튼 추가
    var clearItem = document.createElement('div');
    clearItem.className = 'result-item clear-history-item';
    clearItem.innerHTML = `<div class="result-title" style="color: #FF5D5D; text-align: center;">검색 기록 지우기</div>`;
    clearItem.addEventListener('click', function() {
        if (confirm('검색 기록을 모두 삭제하시겠습니까?')) {
            localStorage.removeItem('searchHistory');
            resultsContainer.style.display = 'none';
            document.getElementById('search-window').value = '';
            console.log('검색 기록이 삭제되었습니다.');
        }
    });
    resultsContainer.appendChild(clearItem);
    
    resultsContainer.style.display = 'block';
}

// 검색 기록 삭제 (이전 버전 제거)
// document.getElementById('clear-history') 코드 삭제됨

function performSearch(value) {
    var query = value.toLowerCase();
    
    // 조합 중인 자음/모음 제거 (단독으로 끝나는 경우만)
    var cleanQuery = query.replace(/[ㄱ-ㅎㅏ-ㅣ]+$/, '');
    
    // 쿼리가 변경되었을 때만 검색
    if (cleanQuery !== lastSearchQuery) {
        lastSearchQuery = cleanQuery;
        updateSearchResults(cleanQuery);
        console.log('검색어:', cleanQuery);
    }
}

// 검색창 포커스 시 검색 기록 표시
document.getElementById('search-window').addEventListener('focus', function(e) {
    // 검색창이 비어있으면 항상 검색 기록 표시
    if (e.target.value.trim() === '') {
        showSearchHistory();
    }
});

// 검색창 클릭 시에도 검색 기록 표시
document.getElementById('search-window').addEventListener('click', function(e) {
    if (e.target.value.trim() === '') {
        showSearchHistory();
    }
});

document.getElementById('search-window').addEventListener('input', function (e) {
    // 타이머 제거 (debounce)
    if (searchTimer) {
        clearTimeout(searchTimer);
    }
    
    // 즉시 검색 실행
    performSearch(e.target.value);
});

// 검색창에서 엔터키 입력 시 처리
document.getElementById('search-window').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        var query = e.target.value.trim();
        var resultsContainer = document.getElementById('search-results');
        
        // 검색 결과가 있으면 첫 번째 항목 선택
        var firstResult = resultsContainer.querySelector('.result-item');
        if (firstResult && resultsContainer.style.display !== 'none') {
            firstResult.click();
            return;
        }
        
        // 좌표 형식인지 확인 (예: "242, -180" 또는 "242,-180" 또는 "242 -180")
        var coordPattern = /^(-?\d+)[,\s]+(-?\d+)$/;
        var match = query.match(coordPattern);
        
        if (match) {
            var x = parseInt(match[1]);
            var z = parseInt(match[2]);
            
            // 세부 창이 열려있으면 닫기
            var detailWindow = document.getElementById('detail-window');
            if (detailWindow.style.display === 'block') {
                closeDetailWindow();
            }
            
            // 좌표로 이동
            var view = unmined.openlayersMap.getView();
            view.animate({
                center: [x, -z],
                duration: 500,
                zoom: Math.max(view.getZoom(), 1) // 최소 줌 레벨 1
            });
            
            // 검색창 초기화 및 결과 숨기기
            e.target.value = ''; // 검색창 비우기
            resultsContainer.style.display = 'none';
            e.target.blur(); // 키보드 숨기기
            
            // 좌표 표시 강조
            highlightCoordinateDisplay();
        }
    }
});

function updateSearchResults(query) {
    var resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = ''; // 기존 결과 초기화

    if (!query) {
        resultsContainer.style.display = 'none';
        return;
    }

    var matchedMarkers = UnminedCustomMarkers.markers.filter(function (marker) {
        return marker.text.toLowerCase().includes(query);
    });

    if (matchedMarkers.length === 0) {
        resultsContainer.style.display = 'none';
        return;
    }

    // 검색 결과 정렬: 1) 정확히 일치, 2) 시작하는 것, 3) 포함하는 것
    matchedMarkers.sort(function(a, b) {
        var aText = a.text.toLowerCase();
        var bText = b.text.toLowerCase();
        
        // 정확히 일치하는 경우 최우선
        if (aText === query && bText !== query) return -1;
        if (aText !== query && bText === query) return 1;
        
        // 검색어로 시작하는 경우 우선
        var aStarts = aText.startsWith(query);
        var bStarts = bText.startsWith(query);
        
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        
        // 둘 다 시작하거나 둘 다 포함하는 경우 가나다순
        return aText.localeCompare(bText, 'ko');
    });

    matchedMarkers.forEach(function (marker) {
        var resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.innerHTML = `<div class="result-title">${marker.text}</div>`;
        resultItem.addEventListener('click', function () {
            // 검색 기록에 저장
            saveSearchHistory(marker.text);
            
            focusOnMarker(marker);
            showDetailWindow(marker);
            resultsContainer.style.display = 'none'; // 결과 목록 숨기기
            document.getElementById('search-window').value = ''; // 검색창 초기화
        });
        resultsContainer.appendChild(resultItem);
    });

    resultsContainer.style.display = 'block';
}

function focusOnMarker(marker) {
    var coordinate = [marker.x, -marker.z];
    var view = unmined.openlayersMap.getView();
    var resolution = view.getResolution();

    var detailWindow = document.getElementById('detail-window');
    var detailWindowWidth = detailWindow.offsetWidth || 0;
    var detailWindowHeight = detailWindow.offsetHeight || 0;

    var offsetX = 0;
    var offsetY = 0;

    if (window.innerWidth <= 768) {
        offsetY = (detailWindowHeight / 2) * resolution;
    } else {
        offsetX = (detailWindowWidth / 2) * resolution;
    }

    var adjustedCoordinate = [
        coordinate[0] + offsetX,
        coordinate[1] - offsetY
    ];

    view.animate({
        center: adjustedCoordinate,
        duration: 300
    });
    
    // 좌표 표시 강조
    highlightCoordinateDisplay();

    // 이전에 추가된 포커스 마커 레이어가 있다면 제거
    if (focusMarkerLayer) {
        unmined.openlayersMap.removeLayer(focusMarkerLayer);
    }

    // 새로운 마커 생성
    var markerFeature = new ol.Feature({
        geometry: new ol.geom.Point(coordinate)
    });

    var vectorSource = new ol.source.Vector({
        features: [markerFeature]
    });

    focusMarkerLayer = new ol.layer.Vector({
        source: vectorSource
    });

    unmined.openlayersMap.addLayer(focusMarkerLayer);
    
    // 애니메이션 효과 (scale 0에서 0.4로)
    var startTime = Date.now();
    var duration = 400; // 0.4초
    var maxScale = 0.4;
    
    function animate() {
        var elapsed = Date.now() - startTime;
        var progress = Math.min(elapsed / duration, 1);
        
        // easeOutBack 효과 (살짝 오버슈팅)
        var t = progress;
        var overshoot = 1.2;
        var easeProgress;
        
        if (t < 0.7) {
            // 0 -> 1.15배로 빠르게 커짐
            easeProgress = (t / 0.7) * overshoot;
        } else {
            // 1.15배 -> 1배로 살짝 줄어듦
            easeProgress = overshoot - ((t - 0.7) / 0.3) * (overshoot - 1);
        }
        
        var currentScale = maxScale * easeProgress;
        var currentOpacity = Math.min(progress * 1.5, 1); // 빠르게 나타남
        
        markerFeature.setStyle(new ol.style.Style({
            image: new ol.style.Icon({
                src: 'pinImages/custom.pin.png',
                anchor: [0.5, 1],
                scale: currentScale,
                opacity: currentOpacity
            })
        }));
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // 애니메이션 종료 후 최종 스타일 설정
            markerFeature.setStyle(new ol.style.Style({
                image: new ol.style.Icon({
                    src: 'pinImages/custom.pin.png',
                    anchor: [0.5, 1],
                    scale: maxScale,
                    opacity: 1
                })
            }));
        }
    }
    
    // 초기 스타일 (안 보이게)
    markerFeature.setStyle(new ol.style.Style({
        image: new ol.style.Icon({
            src: 'pinImages/custom.pin.png',
            anchor: [0.5, 1],
            scale: 0,
            opacity: 0
        })
    }));
    
    // 애니메이션 시작
    requestAnimationFrame(animate);
}

window.focusOnMarker = focusOnMarker;

// 현재 마커를 저장할 변수 선언
var currentMarker = null;

// 별점 표시 함수
function getStars(rating) {
    var fullStars = Math.floor(rating);
    var halfStar = rating % 1 >= 0.5 ? 1 : 0;
    var emptyStars = 5 - fullStars - halfStar;
    var starsHtml = '';

    for (var i = 0; i < fullStars; i++) {
        starsHtml += '★';
    }
    if (halfStar) {
        starsHtml += '☆';
    }
    for (var i = 0; i < emptyStars; i++) {
        starsHtml += '☆';
    }
    return `${rating.toFixed(1)} ${starsHtml}`;
}

// 별점 선택 기능 구현
var selectedRating = 0;

var starInputs = document.querySelectorAll('.star-rating input');
starInputs.forEach(function (input) {
    input.addEventListener('change', function () {
        selectedRating = parseInt(this.value);
        // 선택한 별점 값을 표시
        document.getElementById('selected-rating').textContent = selectedRating + '점';
    });
});

// 리뷰 폼 제출 이벤트 핸들러 정의
function handleReviewSubmit(e) {
    e.preventDefault();
    var comment = e.target.comment.value;
    var rating = selectedRating;

    if (rating === 0) {
        alert('별점을 선택해주세요.');
        return;
    }

    // 리뷰 데이터를 서버로 전송
    var reviewData = {
        placeId: currentMarker.text,
        rating: rating,
        comment: comment
    };

    fetch('https://api.zerossin.com/reviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
    })
        .then(function (response) {
            // 응답 상태 확인
            if (response.ok || response.status === 200 || response.status === 201) {
                return response.json().catch(function() {
                    // JSON 파싱 실패해도 성공으로 처리
                    return { success: true };
                });
            } else {
                throw new Error('리뷰 등록 실패');
            }
        })
        .then(function (data) {
            alert('리뷰가 등록되었습니다.');
            // 폼 초기화
            e.target.reset();
            selectedRating = 0;
            document.getElementById('selected-rating').textContent = '0점';
            // 리뷰 목록 갱신 - 확장 상태 유지
            var wasExpanded = detailWindow.classList.contains('expanded');
            openDetailWindow(currentMarker, wasExpanded);
        })
        .catch(function (error) {
            console.error('Error:', error);
            alert('리뷰 등록 중 오류가 발생하였습니다.');
        });
}

// 세부 창 요소 가져오기
var detailWindow = document.getElementById('detail-window');
var detailCloseButton = document.getElementById('detail-close-button');

// 드래그 관련 변수
var touchStartY = 0;
var touchCurrentY = 0;
var isDragging = false;
var dragStartScrollTop = 0;
var isScrollingContent = false;

// 세부 창 내부 요소들
var titleElement = document.getElementById('detail-title');
var ratingElementStars = document.getElementById('detail-rating-stars');
var reviewCountElement = document.getElementById('detail-review-count');
var photoElement = document.getElementById('detail-photo');
var addressElement = document.getElementById('detail-address');
var infoElement = document.getElementById('detail-info-text');
var reviewsList = document.getElementById('detail-reviews');

// 세부 창 클릭 시 확장
detailWindow.addEventListener('click', function (e) {
    if (e.target === detailCloseButton || e.target.closest('#review-form')) {
        return;
    }

    // 클릭으로 확장 (드래그가 아닐 때만)
    if (detailWindow.classList.contains('small') && !isDragging) {
        detailWindow.classList.remove('small');
        detailWindow.classList.add('expanded');
    }
});

// 터치 시작
detailWindow.addEventListener('touchstart', function(e) {
    if (e.target === detailCloseButton || e.target.closest('#review-form')) {
        return;
    }
    
    touchStartY = e.touches[0].clientY;
    isDragging = false;
    isScrollingContent = false;
    
    // 확장된 상태에서는 기본적으로 스크롤 가능하도록 설정
    if (detailWindow.classList.contains('expanded')) {
        dragStartScrollTop = detailWindow.scrollTop;
        var scrollableHeight = detailWindow.scrollHeight - detailWindow.clientHeight;
        
        // 스크롤 가능한 콘텐츠가 있으면 스크롤 모드로 시작
        if (scrollableHeight > 0) {
            isScrollingContent = true;
        }
    }
    
    // transition 비활성화 (부드러운 드래그를 위해)
    detailWindow.style.transition = 'none';
});

// 터치 이동
detailWindow.addEventListener('touchmove', function(e) {
    if (e.target === detailCloseButton || e.target.closest('#review-form')) {
        return;
    }
    
    touchCurrentY = e.touches[0].clientY;
    var deltaY = touchCurrentY - touchStartY;
    
    // 확장된 상태에서 스크롤 처리
    if (detailWindow.classList.contains('expanded')) {
        var currentScrollTop = detailWindow.scrollTop;
        var maxScroll = detailWindow.scrollHeight - detailWindow.clientHeight;
        
        // 위로 스크롤하는 경우 (deltaY < 0) - 항상 허용
        if (deltaY < 0) {
            if (currentScrollTop < maxScroll) {
                // 스크롤 가능한 상태면 스크롤만 허용
                return;
            }
        }
        // 아래로 스크롤하는 경우 (deltaY > 0)
        else if (deltaY > 0) {
            if (currentScrollTop > 0) {
                // 스크롤이 최상단이 아니면 스크롤만 허용
                return;
            }
            // 스크롤이 최상단이고, 아래로 많이 당기면 창 축소
            if (Math.abs(deltaY) > 10) {
                isDragging = true;
                e.preventDefault();
                var translateY = Math.min(deltaY, window.innerHeight);
                detailWindow.style.transform = `translateY(${translateY}px)`;
            }
        }
        return;
    }
    
    // 10px 이상 움직이면 드래그로 인식 (작은 창에서)
    if (Math.abs(deltaY) > 10) {
        isDragging = true;
        e.preventDefault(); // 맵 스크롤 방지
        
        // 실시간으로 창 위치 및 높이 조정
        if (deltaY > 0) {
            // 아래로 드래그
            var translateY = Math.min(deltaY, window.innerHeight);
            detailWindow.style.transform = `translateY(${translateY}px)`;
        } else if (detailWindow.classList.contains('small')) {
            // 작은 창에서 위로 드래그 - 높이도 함께 늘림
            var absDeltaY = Math.abs(deltaY);
            var newHeight = Math.min(150 + absDeltaY, window.innerHeight);
            detailWindow.style.height = `${newHeight}px`;
            detailWindow.style.transform = 'translateY(0)';
        }
    }
});

// 터치 종료
detailWindow.addEventListener('touchend', function(e) {
    if (e.target === detailCloseButton || e.target.closest('#review-form')) {
        return;
    }
    
    if (!isDragging) {
        // 드래그 아닌 경우 transition 상태 유지
        isDragging = false;
        isScrollingContent = false;
        touchStartY = 0;
        touchCurrentY = 0;
        return;
    }
    
    var deltaY = touchCurrentY - touchStartY;
    var threshold = 80; // 80px 이상 드래그 시 동작
    var velocity = Math.abs(deltaY);
    
    if (detailWindow.classList.contains('small')) {
        // 작은 창에서 위로 드래그 -> 확장
        if (deltaY < -threshold || (deltaY < 0 && velocity > 150)) {
            detailWindow.style.transition = 'transform 0.3s ease-out, height 0.3s ease-out';
            detailWindow.style.transform = 'translateY(0)';
            detailWindow.style.height = ''; // height 초기화
            detailWindow.classList.remove('small');
            detailWindow.classList.add('expanded');
        }
        // 아래로 많이 드래그 -> 닫기
        else if (deltaY > threshold || (deltaY > 0 && velocity > 150)) {
            detailWindow.style.transition = 'transform 0.2s ease-out, height 0.2s ease-out';
            detailWindow.style.height = ''; // height 초기화
            closeDetailWindow();
        }
        // 그 외 -> 원위치
        else {
            detailWindow.style.transition = 'transform 0.2s ease-out, height 0.2s ease-out';
            detailWindow.style.transform = 'translateY(0)';
            detailWindow.style.height = ''; // height 초기화
        }
    } else if (detailWindow.classList.contains('expanded')) {
        // 확장된 창에서 아래로 드래그 -> 축소
        if (deltaY > threshold || (deltaY > 0 && velocity > 150)) {
            // 먼저 small 클래스 추가 (크기 변경 시작)
            detailWindow.classList.add('small');
            detailWindow.style.transition = 'transform 0.25s ease-out, height 0.25s ease-out';
            detailWindow.style.transform = 'translateY(0)';
            detailWindow.scrollTop = 0; // 스크롤 위치 초기화
            
            // 크기 변경이 끝난 후 expanded 제거 (레이아웃 변경)
            setTimeout(function() {
                detailWindow.classList.remove('expanded');
            }, 250);
        }
        // 그 외 -> 원위치
        else {
            detailWindow.style.transition = 'transform 0.2s ease-out';
            detailWindow.style.transform = 'translateY(0)';
        }
    }
    
    isDragging = false;
    isScrollingContent = false;
    touchStartY = 0;
    touchCurrentY = 0;
});

// 세부 창 닫기 함수
function closeDetailWindow() {
    var isMobile = window.innerWidth <= 768;
    
    detailWindow.classList.remove('expanded', 'small');
    
    if (isMobile) {
        // 모바일: 아래로
        detailWindow.style.transform = 'translateY(100%)';
    } else {
        // PC: 오른쪽으로
        detailWindow.style.transform = 'translateX(100%)';
    }
    
    // 포커스 마커 제거
    if (focusMarkerLayer) {
        unmined.openlayersMap.removeLayer(focusMarkerLayer);
        focusMarkerLayer = null;
    }
    
    setTimeout(function() {
        detailWindow.style.display = 'none';
    }, 200);
}

// 닫기 버튼 이벤트 처리
detailCloseButton.addEventListener('click', function (e) {
    e.stopPropagation();
    closeDetailWindow();
});

// 지도 클릭 시 세부 창 닫기
unmined.openlayersMap.on('click', function(evt) {
    // 검색 결과 닫기
    var resultsContainer = document.getElementById('search-results');
    if (resultsContainer.style.display !== 'none') {
        resultsContainer.style.display = 'none';
    }
    
    // 모바일 환경에서 더 큰 히트 허용 오차 적용
    var isMobile = window.innerWidth <= 768;
    var hitTolerance = isMobile ? 15 : 5; // 모바일: 15px, PC: 5px
    
    var feature = unmined.openlayersMap.forEachFeatureAtPixel(evt.pixel, function(feature) {
        return feature;
    }, {
        hitTolerance: hitTolerance
    });
    
    // 마커를 클릭하지 않았고 세부 창이 열려있으면 닫기
    if (!feature && detailWindow.style.display === 'block') {
        closeDetailWindow();
    }
    
    // 마커가 아닌 곳을 클릭하면 해당 위치로 시점 이동
    if (!feature) {
        var coordinate = evt.coordinate;
        var view = unmined.openlayersMap.getView();
        
        // 시점 이동
        view.animate({
            center: coordinate,
            duration: 300
        });
        
        // 좌표 표시 강조
        highlightCoordinateDisplay();
    }
});

// 좌표 표시 강조 함수
function highlightCoordinateDisplay() {
    var coordElement = document.querySelector('.custom-mouse-position');
    if (!coordElement) {
        coordElement = document.querySelector('.ol-mouse-position');
    }
    
    if (coordElement) {
        // 강조 표시
        coordElement.style.backgroundColor = '#3CB371';
        coordElement.style.color = 'white';
        coordElement.style.transition = 'all 0.3s';
        
        // 1초 후 원래대로
        setTimeout(function() {
            coordElement.style.backgroundColor = 'white';
            coordElement.style.color = 'black';
        }, 1000);
    }
}

// 세부 창 표시 함수
function showDetailWindow(marker) {
    currentMarker = marker;

    // 이미 열려있는 창이 있으면 먼저 닫기
    if (detailWindow.style.display === 'block') {
        var isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            detailWindow.style.transform = 'translateY(100%)';
        } else {
            detailWindow.style.transform = 'translateX(100%)';
        }
        
        setTimeout(function() {
            openDetailWindow(marker);
        }, 200);
    } else {
        openDetailWindow(marker);
    }
}

function openDetailWindow(marker, keepExpanded) {
    // PC에서는 항상 확장된 상태로, 모바일에서는 작은 상태로 시작
    // keepExpanded가 true면 현재 상태 유지
    var isMobile = window.innerWidth <= 768;
    
    if (keepExpanded) {
        // 확장 상태 유지
        detailWindow.classList.remove('small');
        detailWindow.classList.add('expanded');
    } else if (isMobile) {
        detailWindow.classList.remove('expanded');
        detailWindow.classList.add('small');
    } else {
        detailWindow.classList.remove('small');
        detailWindow.classList.add('expanded');
    }

    // 기본 정보 채우기
    titleElement.textContent = marker.text;

    // 이미지 파일 경로 설정
    var imageExtensions = ['png', 'jpg', 'jpeg'];
    var imageIndex = 0;

    function loadImage() {
        if (imageIndex < imageExtensions.length) {
            var extension = imageExtensions[imageIndex++];
            photoElement.src = `mImages/${marker.text}.${extension}`;
            photoElement.onerror = loadImage;
        } else {
            photoElement.src = 'images/default.png';
        }
    }

    loadImage();

    photoElement.alt = marker.text;
    addressElement.textContent = marker.address ? `${marker.address} (${marker.x}, ${marker.z})` : `주소 정보 없음 (${marker.x}, ${marker.z})`;

    // 가장 가까운 지하철 역 찾기
    var nearest = findNearestSubwayStation(marker);
    var subwayInfoElement = document.getElementById('detail-subway-info');

    if (nearest.station) {
        var distances = calculateDistancesAndTime(nearest.distance);
        subwayInfoElement.innerHTML = `${nearest.line} ${nearest.station.text} ${distances.straightDistance} · 도보 ${distances.walkingTime}분`;
    } else {
        subwayInfoElement.textContent = '근처에 지하철 역이 없습니다.';
    }

    // 추가 내용 초기화
    infoElement.textContent = '';
    reviewsList.innerHTML = '';

    // 별점 및 리뷰 수 가져오기
    fetch(`https://api.zerossin.com/reviews?placeId=${encodeURIComponent(marker.text)}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var reviews = data.reviews;
            var averageRating = data.averageRating;
            var reviewCount = reviews.length;

            ratingElementStars.innerHTML = getStars(averageRating);
            reviewCountElement.textContent = `${reviewCount}개`;
        })
        .catch(function (error) {
            console.error('Error:', error);
            ratingElementStars.innerHTML = getStars(0);
            reviewCountElement.textContent = '0개';
        });

    // 세부 창 표시 (애니메이션 적용)
    var isMobile = window.innerWidth <= 768;
    detailWindow.style.display = 'block';
    
    if (isMobile) {
        // 모바일: 아래에서 위로
        detailWindow.style.transform = 'translateY(100%)';
        setTimeout(function() {
            detailWindow.style.transform = 'translateY(0)';
        }, 10);
    } else {
        // PC: 오른쪽에서 왼쪽으로
        detailWindow.style.transform = 'translateX(100%)';
        setTimeout(function() {
            detailWindow.style.transform = 'translateX(0)';
        }, 10);
    }

    // 리뷰 폼 이벤트 리스너 추가
    var reviewForm = document.getElementById('review-form');
    reviewForm.removeEventListener('submit', handleReviewSubmit);
    reviewForm.addEventListener('submit', handleReviewSubmit);
}

// 창이 확장된 후 추가 내용 로드
detailWindow.addEventListener('transitionend', function () {
    if (detailWindow.classList.contains('expanded')) {
        //api 요청
        // 질문을 담은 객체
        const questionData = {
            question: currentMarker.text
        };

        // Flask API에 POST 요청 보내기
        fetch('https://guminai.zerossin.com/map_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(questionData)
        })
        .then(response => response.json())
        .then(data => {
            infoElement.textContent = currentMarker.info || data.message || '정보가 없습니다.';
            console.log("응답 메시지:", data.message);
        })
        .catch(error => {
            infoElement.textContent = currentMarker.info || '정보가 없습니다.';
            console.error("에러 발생:", error);
        });

        // 리뷰 목록 가져오기
        var currentReviewCount = 5; // 초기 표시 개수
        var allReviews = []; // 전체 리뷰 저장
        
        fetch(`https://api.zerossin.com/reviews?placeId=${encodeURIComponent(currentMarker.text)}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                allReviews = data.reviews;

                // 초기 5개만 표시
                renderReviews(allReviews.slice(0, currentReviewCount));
                
                // 기존 더보기 버튼 제거
                var existingBtn = document.getElementById('load-more-reviews');
                if (existingBtn) {
                    existingBtn.remove();
                }
                
                // 더보기 버튼 추가 (리뷰가 5개 이상인 경우)
                if (allReviews.length > currentReviewCount) {
                    var loadMoreBtn = document.createElement('button');
                    loadMoreBtn.id = 'load-more-reviews';
                    loadMoreBtn.textContent = `더보기 (${allReviews.length - currentReviewCount}개 남음)`;
                    loadMoreBtn.style.cssText = 'width: 100%; padding: 12px; margin-top: 10px; background-color: #f5f5f5; color: #333; border: none; border-radius: 4px; cursor: pointer; font-size: 14px;';
                    
                    loadMoreBtn.addEventListener('click', function() {
                        currentReviewCount += 5;
                        renderReviews(allReviews.slice(0, currentReviewCount));
                        
                        // 남은 리뷰가 있으면 버튼 업데이트, 없으면 제거
                        if (currentReviewCount >= allReviews.length) {
                            loadMoreBtn.remove();
                        } else {
                            loadMoreBtn.textContent = `더보기 (${allReviews.length - currentReviewCount}개 남음)`;
                        }
                    });
                    
                    reviewsList.parentElement.appendChild(loadMoreBtn);
                }
            })
            .catch(function (error) {
                console.error('Error:', error);
                reviewsList.innerHTML = '<li>리뷰를 불러오는 중 오류가 발생하였습니다.</li>';
            });
        
        // 리뷰 렌더링 함수
        function renderReviews(reviews) {
            reviewsList.innerHTML = '';
            reviews.forEach(function (review) {
                var li = document.createElement('li');
                li.innerHTML = `
                    <div class="review-header">
                        <span class="review-user">${review.username || '익명'}</span>
                        <span class="review-rating">${getStars(review.rating)}</span>
                        <span class="review-date">${new Date(review.created_at).toLocaleDateString()}</span>
                    </div>
                    <div class="review-comment">${review.comment}</div>
                `;
                reviewsList.appendChild(li);
            });
        }
    }
});

// 가장 가까운 지하철 역 찾기 함수
function findNearestSubwayStation(marker) {
    var lineColors = {
        [line1Color]: "1호선",
        [line2Color]: "2호선",
        [line3Color]: "3호선",
        [line4Color]: "4호선"
    };

    var subwayStations = UnminedCustomMarkers.markers.filter(function (m) {
        return Object.keys(lineColors).includes(m.textStrokeColor);
    });

    var minDistance = Infinity;
    var nearestStation = null;

    subwayStations.forEach(function (station) {
        var dx = station.x - marker.x;
        var dz = station.z - marker.z;
        var distance = Math.sqrt(dx * dx + dz * dz);

        if (distance < minDistance) {
            minDistance = distance;
            nearestStation = station;
        }
    });

    return {
        station: nearestStation,
        distance: minDistance,
        line: nearestStation ? lineColors[nearestStation.textStrokeColor] : null
    };
}

// 거리 및 도보 시간 계산 함수
function calculateDistancesAndTime(distance) {
    var straightDistanceMod = Math.floor(distance / 1.3);
    var straightDistanceStr = straightDistanceMod + 'm';

    var walkingDistance = distance * 1.57;

    var walkingTime = Math.round(walkingDistance / 83.33);

    return {
        straightDistance: straightDistanceStr,
        walkingTime: walkingTime
    };
}
