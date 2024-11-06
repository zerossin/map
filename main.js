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
    var view = unmined.openlayersMap.getView(); // 수정된 부분
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
        unmined.openlayersMap.removeLayer(focusMarkerLayer); // 수정된 부분
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

    unmined.openlayersMap.addLayer(focusMarkerLayer); // 수정된 부분
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
    return starsHtml;
}

// 리뷰 폼 제출 이벤트 핸들러 정의
function handleReviewSubmit(e) {
    e.preventDefault();
    var comment = e.target.comment.value;
    var rating = selectedRating; // 사용자가 선택한 별점

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
    stars.forEach(function (s) {
        s.classList.remove('selected');
    });
    document.getElementById('selected-rating').textContent = '0점';
}

// 별점 선택 기능 구현
var selectedRating = 0;
var stars = document.querySelectorAll('.star-rating span');

stars.forEach(function (star) {
    star.addEventListener('click', function () {
        selectedRating = parseInt(star.getAttribute('data-value'));

        // 모든 별에서 'selected' 클래스 제거
        stars.forEach(function (s) {
            s.classList.remove('selected');
        });

        // 선택된 별과 그 이전 별들에게 'selected' 클래스 추가
        stars.forEach(function (s) {
            if (parseInt(s.getAttribute('data-value')) <= selectedRating) {
                s.classList.add('selected');
            }
        });

        // 선택한 별점 값을 표시
        document.getElementById('selected-rating').textContent = selectedRating + '점';
    });
});

function showDetailWindow(marker) {
    var detailWindow = document.getElementById('detail-window');
    currentMarker = marker; // 현재 마커 업데이트

    // 세부 정보 요소들 가져오기
    var titleElement = document.getElementById('detail-title');
    var typeElement = document.getElementById('detail-type');
    var ratingElementStars = document.getElementById('detail-rating-stars');
    var ratingElementNumber = document.getElementById('detail-rating-number');
    var photoElement = document.getElementById('detail-photo');
    var infoElement = document.getElementById('detail-info-text');
    var reviewsList = document.getElementById('detail-reviews');

    // 값 채우기
    titleElement.textContent = marker.text;
    typeElement.textContent = marker.type || '';
    photoElement.src = marker.photo || 'images/default.png';
    photoElement.alt = marker.text;
    infoElement.textContent = marker.info || '정보가 없습니다.';

    // 서버에서 리뷰 및 별점 평균 가져오기
    fetch(`https://api.mintsclover.com/reviews?placeId=${encodeURIComponent(marker.text)}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // 별점 평균 계산 및 표시
            var reviews = data.reviews;
            var averageRating = data.averageRating;

            ratingElementStars.innerHTML = getStars(averageRating);
            ratingElementNumber.textContent = averageRating.toFixed(1);

            // 리뷰 목록 표시
            reviewsList.innerHTML = '';
            reviews.forEach(function (review) {
                var li = document.createElement('li');
                li.innerHTML = `<strong>${review.user || '익명'}</strong> (${review.rating}/5): ${review.comment}`;
                reviewsList.appendChild(li);
            });
        })
        .catch(function (error) {
            console.error('Error:', error);
            ratingElementStars.innerHTML = getStars(0);
            ratingElementNumber.textContent = '0.0';
            reviewsList.innerHTML = '<li>리뷰를 불러오는 중 오류가 발생하였습니다.</li>';
        });

    detailWindow.style.display = 'block';

    // 모바일 대응
    if (window.innerWidth <= 768) {
        detailWindow.classList.add('mobile');
    } else {
        detailWindow.classList.remove('mobile');
    }

    // 리뷰 폼 이벤트 리스너 추가 (이미 리스너가 있으면 제거)
    var reviewForm = document.getElementById('review-form');
    reviewForm.removeEventListener('submit', handleReviewSubmit);
    reviewForm.addEventListener('submit', handleReviewSubmit);
}

// 세부 정보 창 닫기 버튼 이벤트 처리
var closeButton = document.getElementById('detail-close-button');
closeButton.addEventListener('click', function () {
    var detailWindow = document.getElementById('detail-window');
    detailWindow.style.display = 'none';
});

window.showDetailWindow = showDetailWindow;
