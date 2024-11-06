// uNmINeD 지도 초기화
if (UnminedCustomMarkers && UnminedCustomMarkers.isEnabled && UnminedCustomMarkers.markers) {
    UnminedMapProperties.markers = UnminedMapProperties.markers.concat(UnminedCustomMarkers.markers);
}

let unmined = new Unmined();

if (UnminedPlayers && UnminedPlayers.length > 0) {
    UnminedMapProperties.markers = UnminedMapProperties.markers.concat(unmined.createPlayerMarkers(UnminedPlayers));
}

unmined.map('map', UnminedMapProperties, UnminedRegions);

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

resultItem.addEventListener('click', function () {
    focusOnMarker(marker);
    showDetailWindow(marker);
    resultsContainer.style.display = 'none'; // 결과 목록 숨기기
    document.getElementById('search-window').value = ''; // 검색창 초기화
});

function focusOnMarker(marker) {
    var coordinate = [marker.x, -marker.z];
    var view = map.getView(); // 이제 전역 변수 map을 사용합니다.
    view.animate({
        center: coordinate,
        duration: 1000 // 1초 동안 애니메이션
    });
}

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
    var user = e.target.user.value;
    var rating = e.target.rating.value;
    var comment = e.target.comment.value;

    if (!currentMarker.reviews) {
        currentMarker.reviews = [];
    }

    currentMarker.reviews.push({ user: user, rating: rating, comment: comment });
    showDetailWindow(currentMarker); // 업데이트된 내용으로 재렌더링
}

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

    var ratingValue = marker.rating || 0;
    ratingElementStars.innerHTML = getStars(ratingValue);
    ratingElementNumber.textContent = ratingValue.toFixed(1);

    // 값 채우기
    titleElement.textContent = marker.text;
    typeElement.textContent = marker.type || '';
    photoElement.src = marker.photo || 'default.jpg';
    photoElement.alt = marker.text;
    infoElement.textContent = marker.info || '정보가 없습니다.';

    // 리뷰 목록 초기화
    reviewsList.innerHTML = '';
    var reviews = marker.reviews || [];
    reviews.forEach(function (review) {
        var li = document.createElement('li');
        li.innerHTML = `<strong>${review.user}</strong> (${review.rating}/5): ${review.comment}`;
        reviewsList.appendChild(li);
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
