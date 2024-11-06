// uNmINeD 지도 초기화
if (UnminedCustomMarkers && UnminedCustomMarkers.isEnabled && UnminedCustomMarkers.markers) {
    UnminedMapProperties.markers = UnminedMapProperties.markers.concat(UnminedCustomMarkers.markers);
}

let unmined = new Unmined();

if (UnminedPlayers && UnminedPlayers.length > 0) {
    UnminedMapProperties.markers = UnminedMapProperties.markers.concat(unmined.createPlayerMarkers(UnminedPlayers));
}

unmined.map('map', UnminedMapProperties, UnminedRegions);

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
document.getElementById('search-window').addEventListener('input', function (e) {
    var query = e.target.value.toLowerCase();
    updateSearchResults(query);
    console.log('검색어:', query);
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

    matchedMarkers.forEach(function (marker) {
        var resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.innerHTML = `<div class="result-title">${marker.text}</div>`;
        resultItem.addEventListener('click', function () {
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

    // 이전에 추가된 포커스 마커 레이어가 있다면 제거
    if (focusMarkerLayer) {
        unmined.openlayersMap.removeLayer(focusMarkerLayer);
    }

    // 새로운 마커 생성
    var markerFeature = new ol.Feature({
        geometry: new ol.geom.Point(coordinate)
    });

    markerFeature.setStyle(new ol.style.Style({
        image: new ol.style.Icon({
            src: 'pinImages/custom.pin.png',
            anchor: [0.5, 1],
            scale: 0.4
        })
    }));

    var vectorSource = new ol.source.Vector({
        features: [markerFeature]
    });

    focusMarkerLayer = new ol.layer.Vector({
        source: vectorSource
    });

    unmined.openlayersMap.addLayer(focusMarkerLayer);
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

    fetch('https://api.mintsclover.com/reviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
    })
        .then(function (response) {
            if (response.ok) {
                alert('리뷰가 등록되었습니다.');
                // 리뷰 목록 갱신
                showDetailWindow(currentMarker);
            } else {
                alert('리뷰 등록에 실패하였습니다.');
            }
        })
        .catch(function (error) {
            console.error('Error:', error);
            alert('리뷰 등록 중 오류가 발생하였습니다.');
        });

    // 폼 초기화
    e.target.reset();
    selectedRating = 0;
    document.getElementById('selected-rating').textContent = '0점';
}

// 세부 창 요소 가져오기
var detailWindow = document.getElementById('detail-window');
var detailCloseButton = document.getElementById('detail-close-button');

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

    if (detailWindow.classList.contains('small')) {
        detailWindow.classList.remove('small');
        detailWindow.classList.add('expanded');
    }
});

// 닫기 버튼 이벤트 처리
detailCloseButton.addEventListener('click', function (e) {
    e.stopPropagation();
    detailWindow.style.display = 'none';
    detailWindow.classList.remove('expanded');
    detailWindow.classList.add('small');
});

// 세부 창 표시 함수
function showDetailWindow(marker) {
    currentMarker = marker;

    // 창을 작은 상태로 초기화
    detailWindow.classList.remove('expanded');
    detailWindow.classList.add('small');

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
    fetch(`https://api.mintsclover.com/reviews?placeId=${encodeURIComponent(marker.text)}`)
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

    // 세부 창 표시
    detailWindow.style.display = 'block';

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
        fetch('https://test.kevalsil.com/map_data', {
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
        fetch(`https://api.mintsclover.com/reviews?placeId=${encodeURIComponent(currentMarker.text)}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                var reviews = data.reviews;

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
            })
            .catch(function (error) {
                console.error('Error:', error);
                reviewsList.innerHTML = '<li>리뷰를 불러오는 중 오류가 발생하였습니다.</li>';
            });
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
