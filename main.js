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
    if (subMenu.classList.contains('show')) {
        // 닫기: 애니메이션 후 display none
        subMenu.classList.remove('show');
        overlay.style.display = 'none';
        setTimeout(function() {
            subMenu.style.display = 'none';
        }, 200); // transition 시간과 맞춤
    } else {
        // 열기 전에 다른 창들 닫기
        // 정보창 닫기
        if (detailWindow.style.display !== 'none') {
            closeDetailWindow();
        }
        
        // 검색 결과 닫기
        var searchResults = document.getElementById('search-results');
        if (searchResults) {
            searchResults.style.display = 'none';
        }
        
        // 열기: display block 후 애니메이션
        subMenu.style.display = 'block';
        overlay.style.display = 'block';
        setTimeout(function() {
            subMenu.classList.add('show');
        }, 10); // 다음 프레임에서 애니메이션 시작
    }
});

// 오버레이 클릭 시 메뉴 닫기
document.getElementById('overlay').addEventListener('click', function () {
    var subMenu = document.getElementById('subMenu');
    var overlay = document.getElementById('overlay');
    
    if (subMenu.classList.contains('show')) {
        subMenu.classList.remove('show');
        overlay.style.display = 'none';
        setTimeout(function() {
            subMenu.style.display = 'none';
        }, 200);
    }
});

// 사용자 프로필 관리
var userProfile = {
    nickname: '',
    profileImage: ''
};

// localStorage에서 프로필 불러오기
function loadUserProfile() {
    var saved = localStorage.getItem('userProfile');
    if (saved) {
        userProfile = JSON.parse(saved);
        updateProfileDisplay();
    }
}

// localStorage에 프로필 저장
function saveUserProfile() {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
}

// 메뉴판 프로필 표시 업데이트
function updateProfileDisplay() {
    var profileNameElement = document.querySelector('.profile-name');
    var profileImageElement = document.querySelector('.profile-image');
    
    // 닉네임 업데이트
    if (userProfile.nickname) {
        var ipText = document.getElementById('userIP').textContent;
        profileNameElement.innerHTML = userProfile.nickname + ' <span class="profile-ip" id="userIP">' + ipText + '</span>';
    } else {
        var ipText = document.getElementById('userIP').textContent;
        profileNameElement.innerHTML = '익명 <span class="profile-ip" id="userIP">' + ipText + '</span>';
    }
    
    // 프로필 이미지 업데이트
    if (userProfile.profileImage) {
        profileImageElement.innerHTML = '<img src="' + userProfile.profileImage + '" alt="프로필" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover;">';
    } else {
        // 기본 SVG 이미지
        profileImageElement.innerHTML = `
            <svg width="60" height="60" viewBox="0 0 60 60">
                <circle cx="30" cy="30" r="30" fill="#E0E0E0"/>
                <circle cx="30" cy="22" r="10" fill="white"/>
                <path d="M 10 50 Q 10 35 30 35 Q 50 35 50 50" fill="white"/>
            </svg>
        `;
    }
}

// 메뉴 버튼 이벤트
document.getElementById('menu-profile').addEventListener('click', function() {
    openProfileModal();
});

document.getElementById('menu-notice').addEventListener('click', function() {
    openNoticeModal();
});

document.getElementById('menu-suggest').addEventListener('click', function() {
    openSuggestModal();
});

document.getElementById('menu-update').addEventListener('click', function() {
    alert('맵 갱신 기능은 준비 중입니다.');
});

// 프로필 모달 열기
function openProfileModal() {
    var modal = document.getElementById('profileModal');
    var nicknameInput = document.getElementById('nicknameInput');
    var profilePreview = document.getElementById('profilePreview');
    
    // 현재 프로필 정보 로드
    nicknameInput.value = userProfile.nickname || '';
    
    if (userProfile.profileImage) {
        profilePreview.innerHTML = '<img src="' + userProfile.profileImage + '" alt="프로필">';
    } else {
        profilePreview.innerHTML = `
            <svg width="80" height="80" viewBox="0 0 60 60">
                <circle cx="30" cy="30" r="30" fill="#E0E0E0"/>
                <circle cx="30" cy="22" r="10" fill="white"/>
                <path d="M 10 50 Q 10 35 30 35 Q 50 35 50 50" fill="white"/>
            </svg>
        `;
    }
    
    modal.style.display = 'flex';
}

// 프로필 모달 닫기
function closeProfileModal() {
    document.getElementById('profileModal').style.display = 'none';
}

// 프로필 모달 이벤트
document.getElementById('profileModalClose').addEventListener('click', closeProfileModal);

document.getElementById('profileImageButton').addEventListener('click', function() {
    document.getElementById('profileImageInput').click();
});

document.getElementById('profileImageInput').addEventListener('change', function(e) {
    var file = e.target.files[0];
    if (file) {
        // 이미지 크기 제한 (2MB)
        if (file.size > 2 * 1024 * 1024) {
            alert('이미지 크기는 2MB 이하여야 합니다.');
            return;
        }
        
        var reader = new FileReader();
        reader.onload = function(event) {
            var img = new Image();
            img.onload = function() {
                // 이미지 리사이징 (최대 200x200)
                var canvas = document.createElement('canvas');
                var maxSize = 200;
                var width = img.width;
                var height = img.height;
                
                if (width > height) {
                    if (width > maxSize) {
                        height *= maxSize / width;
                        width = maxSize;
                    }
                } else {
                    if (height > maxSize) {
                        width *= maxSize / height;
                        height = maxSize;
                    }
                }
                
                canvas.width = width;
                canvas.height = height;
                var ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                
                var resizedImage = canvas.toDataURL('image/jpeg', 0.8);
                document.getElementById('profilePreview').innerHTML = '<img src="' + resizedImage + '" alt="프로필">';
                userProfile.profileImage = resizedImage;
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('profileImageReset').addEventListener('click', function() {
    userProfile.profileImage = '';
    document.getElementById('profilePreview').innerHTML = `
        <svg width="80" height="80" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="30" fill="#E0E0E0"/>
            <circle cx="30" cy="22" r="10" fill="white"/>
            <path d="M 10 50 Q 10 35 30 35 Q 50 35 50 50" fill="white"/>
        </svg>
    `;
});

document.getElementById('profileSaveButton').addEventListener('click', function() {
    var nickname = document.getElementById('nicknameInput').value.trim();
    
    if (nickname && nickname.length > 20) {
        alert('닉네임은 20자 이하로 입력해주세요.');
        return;
    }
    
    userProfile.nickname = nickname;
    saveUserProfile();
    updateProfileDisplay();
    closeProfileModal();
    alert('프로필이 저장되었습니다.');
});

// 모달 외부 클릭 시 닫기
document.getElementById('profileModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeProfileModal();
    }
});

// ===== 공지사항 모달 관리 =====
function openNoticeModal() {
    document.getElementById('noticeModal').style.display = 'flex';
}

function closeNoticeModal() {
    document.getElementById('noticeModal').style.display = 'none';
}

// 공지사항 모달 닫기 버튼
document.getElementById('noticeModalClose').addEventListener('click', function() {
    closeNoticeModal();
});

// 모달 외부 클릭 시 닫기
document.getElementById('noticeModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeNoticeModal();
    }
});

// 정보 제안 모달 관리
var currentSuggestType = '';
var suggestCoords = null;
var isSelectingLocation = false;

// 정보 제안 모달 열기
function openSuggestModal() {
    var modal = document.getElementById('suggestModal');
    var typeSection = document.getElementById('suggestTypeSection');
    var formSection = document.getElementById('suggestFormSection');
    
    // 초기 상태로 리셋
    typeSection.style.display = 'flex';
    formSection.style.display = 'none';
    currentSuggestType = '';
    suggestCoords = null;
    document.getElementById('suggestForm').reset();
    
    modal.style.display = 'flex';
}

// 정보 제안 모달 닫기
function closeSuggestModal() {
    document.getElementById('suggestModal').style.display = 'none';
    isSelectingLocation = false;
}

// 정보 제안 타입 버튼 클릭
document.querySelectorAll('.suggest-type-button').forEach(function(button) {
    button.addEventListener('click', function() {
        currentSuggestType = this.getAttribute('data-type');
        showSuggestForm(currentSuggestType);
    });
});

// 제안 폼 표시
function showSuggestForm(type) {
    var typeSection = document.getElementById('suggestTypeSection');
    var formSection = document.getElementById('suggestFormSection');
    var formTitle = document.getElementById('suggestFormTitle');
    var locationGroup = document.getElementById('suggestLocationGroup');
    
    typeSection.style.display = 'none';
    formSection.style.display = 'block';
    
    // 타입에 따라 폼 제목 및 필드 변경
    if (type === 'add') {
        formTitle.textContent = '추가할 장소 정보';
        locationGroup.style.display = 'block';
        document.getElementById('suggestTitle').placeholder = '장소 이름을 입력하세요';
        document.getElementById('suggestContent').placeholder = '주소, 설명 등 상세 정보를 입력하세요';
    } else if (type === 'edit') {
        formTitle.textContent = '수정할 정보';
        locationGroup.style.display = 'block';
        document.getElementById('suggestTitle').placeholder = '수정할 장소 이름을 입력하세요';
        document.getElementById('suggestContent').placeholder = '수정할 내용을 입력하세요';
    } else if (type === 'feedback') {
        formTitle.textContent = '건의사항';
        locationGroup.style.display = 'none';
        document.getElementById('suggestTitle').placeholder = '제목을 입력하세요';
        document.getElementById('suggestContent').placeholder = '건의사항을 입력하세요';
    }
}

// 뒤로 버튼
document.getElementById('suggestBackButton').addEventListener('click', function() {
    document.getElementById('suggestTypeSection').style.display = 'flex';
    document.getElementById('suggestFormSection').style.display = 'none';
    currentSuggestType = '';
});

// 위치 선택 버튼
document.getElementById('suggestSelectLocation').addEventListener('click', function() {
    isSelectingLocation = true;
    
    // 모달만 닫기 (isSelectingLocation 초기화하지 않음)
    document.getElementById('suggestModal').style.display = 'none';
    
    // 메뉴창도 닫기
    var subMenu = document.getElementById('subMenu');
    var overlay = document.getElementById('overlay');
    if (subMenu.classList.contains('show')) {
        subMenu.classList.remove('show');
        overlay.style.display = 'none';
        setTimeout(function() {
            subMenu.style.display = 'none';
        }, 200);
    }
    
    // 위치 선택 오버레이 표시
    document.getElementById('locationSelectOverlay').style.display = 'flex';
});

// 맵 클릭으로 위치 선택 (기존 맵 클릭 이벤트에 추가 필요)
function handleMapClickForSuggest(coords) {
    if (isSelectingLocation) {
        suggestCoords = coords;
        isSelectingLocation = false;
        
        // 위치 선택 오버레이 숨기기
        document.getElementById('locationSelectOverlay').style.display = 'none';
        
        // 메뉴창 다시 열기
        var subMenu = document.getElementById('subMenu');
        var overlay = document.getElementById('overlay');
        subMenu.style.display = 'block';
        overlay.style.display = 'block';
        setTimeout(function() {
            subMenu.classList.add('show');
        }, 10);
        
        // 정보 제안 모달 다시 열기 (초기화하지 않고 그대로 복원)
        setTimeout(function() {
            var modal = document.getElementById('suggestModal');
            modal.style.display = 'flex';
            
            // 좌표 값 설정
            var coordText = '(' + coords[0].toFixed(0) + ', ' + coords[1].toFixed(0) + ')';
            document.getElementById('suggestCoords').value = coordText;
        }, 250); // 메뉴 애니메이션 후
    }
}

// 제안 폼 제출
document.getElementById('suggestForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    var title = document.getElementById('suggestTitle').value.trim();
    var content = document.getElementById('suggestContent').value.trim();
    
    if (!title || !content) {
        alert('모든 필드를 입력해주세요.');
        return;
    }
    
    // 정보 추가/수정인 경우 위치 필수
    if ((currentSuggestType === 'add' || currentSuggestType === 'edit') && !suggestCoords) {
        alert('위치를 선택해주세요.');
        return;
    }
    
    // 사용자 정보
    var username = userProfile.nickname || (userIPLast2 ? '익명 (' + userIPLast2 + ')' : '익명');
    
    // 서버로 전송할 데이터
    var suggestData = {
        type: currentSuggestType,
        title: title,
        content: content,
        username: username,
        coords: suggestCoords
    };
    
    // 서버로 전송 (API 엔드포인트는 추후 구현)
    fetch('https://api.zerossin.com/suggestions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(suggestData)
    })
    .then(function(response) {
        if (response.ok || response.status === 200 || response.status === 201) {
            return response.json().catch(function() {
                return { success: true };
            });
        } else {
            throw new Error('제안 등록 실패');
        }
    })
    .then(function(data) {
        alert('제안이 등록되었습니다. 검토 후 반영하겠습니다.');
        closeSuggestModal();
    })
    .catch(function(error) {
        console.error('Error:', error);
        alert('제안 등록 중 오류가 발생하였습니다.');
    });
});

// 정보 제안 모달 닫기 버튼
document.getElementById('suggestModalClose').addEventListener('click', closeSuggestModal);

// 모달 외부 클릭 시 닫기
document.getElementById('suggestModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeSuggestModal();
    }
});

// 사용자 IP 주소 저장 (전역 변수)
var userIPLast2 = '';

// 사용자 IP 주소 가져오기 (마지막 2자리만 표시)
fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        var ip = data.ip;
        var ipParts = ip.split('.');
        // 마지막 2자리만 표시
        var lastTwo = ipParts.slice(-2).join('.');
        userIPLast2 = lastTwo;
        document.getElementById('userIP').textContent = '(' + lastTwo + ')';
        
        // IP 로드 후 프로필 불러오기
        loadUserProfile();
    })
    .catch(error => {
        // IP를 가져올 수 없는 경우 빈 문자열
        userIPLast2 = '';
        document.getElementById('userIP').textContent = '';
        
        // IP 없어도 프로필 불러오기
        loadUserProfile();
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

// 리뷰 삭제 함수
function deleteReview(reviewId) {
    var password = prompt('관리자 비밀번호를 입력하세요:');
    
    // 클라이언트 검증 제거
    if (!password) {
        return;
    }
    
    // 바로 서버로 전송 (서버에서 검증)
    fetch(`https://api.zerossin.com/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
            'X-Admin-Password': password  // 서버에서만 검증
        }
    })
        .then(function (response) {
            if (response.ok || response.status === 200 || response.status === 204) {
                alert('리뷰가 삭제되었습니다.');
                // 현재 확장 상태 유지하며 새로고침
                var wasExpanded = detailWindow.classList.contains('expanded');
                openDetailWindow(currentMarker, wasExpanded);
                return;
            } else {
                // 에러 응답 처리 - JSON이 아닐 수 있음
                return response.text().then(function(text) {
                    try {
                        var data = JSON.parse(text);
                        throw new Error(data.message || '리뷰 삭제 실패');
                    } catch (e) {
                        throw new Error('리뷰 삭제 실패 (상태 코드: ' + response.status + ')');
                    }
                });
            }
        })
        .catch(function (error) {
            console.error('Error:', error);
            alert('리뷰 삭제 중 오류가 발생하였습니다: ' + error.message);
        });
}

// 전역으로 노출
window.deleteReview = deleteReview;

// 리뷰 폼 제출 이벤트 핸들러 정의
function handleReviewSubmit(e) {
    e.preventDefault();
    var comment = e.target.comment.value;
    var rating = selectedRating;

    if (rating === 0) {
        alert('별점을 선택해주세요.');
        return;
    }

    // 사용자 이름 생성: 닉네임 있으면 닉네임, 없으면 익명 (IP)
    var username;
    if (userProfile.nickname) {
        username = userProfile.nickname;
    } else {
        username = userIPLast2 ? '익명 (' + userIPLast2 + ')' : '익명';
    }

    // 리뷰 데이터를 서버로 전송
    var reviewData = {
        placeId: currentMarker.text,
        rating: rating,
        comment: comment,
        username: username
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

// 행정구역별 소속 정보 매핑
var districtGu = {
    // 성내구
    '시작동': '성내구',
    '동림동': '성내구',
    '남해동': '성내구',
    '중명동': '성내구',
    '북연동': '성내구',
    
    // 성동구
    '강설부': '성동구',
    '천풍부': '성동구',
    '성호부': '성동구',
    '미수부': '성동구',
    '동명부': '성동구',
    '연월부': '성동구',
    '금청부': '성동구',
    '미지정': '성동구',
    '호반정': '성동구',
    
    // 성남구
    '강남동': '성남구',
    '봉탄동': '성남구',
    '구포동': '성남구',
    '연해동': '성남구',
    '남만면': '성남구',
    
    // 성서구
    '광평동': '성서구',
    '화양동': '성서구',
    '광호면': '성서구',
    '창림면': '성서구',
    '모원면': '성서구',
    
    // 성북구
    '백암동': '성북구'
};

// 가장 가까운 행정구역 찾기 (custom.markers.js의 district 마커 활용)
function findNearestDistrict(x, z) {
    if (!UnminedCustomMarkers || !UnminedCustomMarkers.markers) {
        return null;
    }
    
    // districtGu에 정의된 행정구역 이름으로 필터링
    var districtNames = Object.keys(districtGu);
    var districtMarkers = UnminedCustomMarkers.markers.filter(function(m) {
        return districtNames.indexOf(m.text) !== -1;
    });
    
    var minDistance = Infinity;
    var nearest = null;
    
    for (var i = 0; i < districtMarkers.length; i++) {
        var marker = districtMarkers[i];
        var dx = marker.x - x;
        var dz = marker.z - z;
        var distance = Math.sqrt(dx * dx + dz * dz);
        
        if (distance < minDistance) {
            minDistance = distance;
            nearest = {
                name: marker.text,
                gu: districtGu[marker.text],
                x: marker.x,
                z: marker.z
            };
        }
    }
    
    return nearest;
}

// 프리셋별 카테고리명 매핑
var categoryNames = {
    'line0': '역',
    'line1': '역',
    'line2': '역',
    'line3': '역',
    'line4': '역',
    'subway': '역',
    'district': '행정구역',
    'nature': '자연',
    'park': '공원',
    'restaurant': '음식점',
    'fastfood': '음식점',
    'bakery': '제과점',
    'cafe': '카페',
    'building': '건물',
    'culture': '문화시설',
    'shopping': '쇼핑',
    'port': '항구',
    'government': '관공서',
    'hospital': '병원',
    'heritage': '문화재',
    'hotel': '숙박',
    'house': '주거',
    'sport': '체육시설',
    'university': '교육기관',
    'annex': '부속건물',
    'normal': '일반'
};

// 마커의 프리셋으로 카테고리 추출
function getMarkerCategory(marker) {
    // 마커의 이미지 경로에서 프리셋 추출
    if (!marker.image) return null;
    
    var imagePath = marker.image;
    var match = imagePath.match(/pinImages\/(.+?)\.pin\.svg/);
    if (match && match[1]) {
        var preset = match[1];
        return categoryNames[preset] || null;
    }
    
    return null;
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
        // 드래그와 동일한 방식으로 확장
        detailWindow.style.transition = 'transform 0.25s ease-out, height 0.25s ease-out';
        detailWindow.style.transform = 'translateY(0)';
        detailWindow.style.height = ''; // height 초기화
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
}, { passive: true });

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
                detailWindow.style.transform = `translate3d(0, ${translateY}px, 0)`;
                detailWindow.style.webkitTransform = `translate3d(0, ${translateY}px, 0)`;
            }
        }
        return;
    }
    
    // 10px 이상 움직이면 드래그로 인식
    if (Math.abs(deltaY) > 10) {
        isDragging = true;
        e.preventDefault(); // 맵 스크롤 방지
        
        // 작은 창에서만 드래그 처리
        if (detailWindow.classList.contains('small')) {
            if (deltaY > 0) {
                // 작은 창에서 아래로 드래그
                var translateY = Math.min(deltaY, window.innerHeight);
                detailWindow.style.transform = `translate3d(0, ${translateY}px, 0)`;
                detailWindow.style.webkitTransform = `translate3d(0, ${translateY}px, 0)`;
            } else {
                // 작은 창에서 위로 드래그 - 높이도 함께 늘림
                var absDeltaY = Math.abs(deltaY);
                var newHeight = Math.min(150 + absDeltaY, window.innerHeight);
                detailWindow.style.height = `${newHeight}px`;
                detailWindow.style.transform = 'translate3d(0, 0, 0)';
                detailWindow.style.webkitTransform = 'translate3d(0, 0, 0)';
            }
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
            detailWindow.style.transition = 'transform 0.25s ease-out, height 0.25s ease-out';
            detailWindow.style.transform = 'translate3d(0, 0, 0)';
            detailWindow.style.webkitTransform = 'translate3d(0, 0, 0)';
            detailWindow.style.height = ''; // height 초기화
            detailWindow.classList.remove('small');
            detailWindow.classList.add('expanded');
        }
        // 아래로 많이 드래그 -> 닫기
        else if (deltaY > threshold || (deltaY > 0 && velocity > 150)) {
            detailWindow.style.transition = 'transform 0.25s ease-out';
            detailWindow.style.transform = 'translate3d(0, 100%, 0)';
            detailWindow.style.webkitTransform = 'translate3d(0, 100%, 0)';
            
            // 포커스 마커 제거
            if (focusMarkerLayer) {
                unmined.openlayersMap.removeLayer(focusMarkerLayer);
                focusMarkerLayer = null;
            }
            
            setTimeout(function() {
                detailWindow.classList.remove('expanded', 'small');
                detailWindow.style.display = 'none';
                detailWindow.style.height = ''; // 완전히 사라진 후 height 초기화
            }, 250);
        }
        // 그 외 -> 원위치
        else {
            detailWindow.style.transition = 'transform 0.2s ease-out, height 0.2s ease-out';
            detailWindow.style.transform = 'translate3d(0, 0, 0)';
            detailWindow.style.webkitTransform = 'translate3d(0, 0, 0)';
            detailWindow.style.height = ''; // height 초기화
        }
    } else if (detailWindow.classList.contains('expanded')) {
        // 확장된 창에서 아래로 드래그 -> 축소
        if (deltaY > threshold || (deltaY > 0 && velocity > 150)) {
            // 먼저 small 클래스 추가 (크기 변경 시작)
            detailWindow.classList.add('small');
            detailWindow.style.transition = 'transform 0.25s ease-out, height 0.25s ease-out';
            detailWindow.style.transform = 'translate3d(0, 0, 0)';
            detailWindow.style.webkitTransform = 'translate3d(0, 0, 0)';
            detailWindow.scrollTop = 0; // 스크롤 위치 초기화
            
            // 크기 변경이 끝난 후 expanded 제거 (레이아웃 변경)
            setTimeout(function() {
                detailWindow.classList.remove('expanded');
            }, 250);
        }
        // 그 외 -> 원위치
        else {
            detailWindow.style.transition = 'transform 0.2s ease-out';
            detailWindow.style.transform = 'translate3d(0, 0, 0)';
            detailWindow.style.webkitTransform = 'translate3d(0, 0, 0)';
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
    
    // transition 설정
    detailWindow.style.transition = 'transform 0.25s ease-out';
    
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
        detailWindow.classList.remove('expanded', 'small');
        detailWindow.style.display = 'none';
        detailWindow.style.height = ''; // 완전히 사라진 후 정리
    }, 250);
}

// 닫기 버튼 이벤트 처리
detailCloseButton.addEventListener('click', function (e) {
    e.stopPropagation();
    closeDetailWindow();
});

// 지도 클릭 시 세부 창 닫기
unmined.openlayersMap.on('click', function(evt) {
    // 위치 선택 모드인 경우
    if (isSelectingLocation) {
        handleMapClickForSuggest(evt.coordinate);
        return;
    }
    
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
        return; // 창만 닫고 이동하지 않음
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

    // 기본 정보 채우기 - 카테고리 태그 추가
    var categoryTag = getMarkerCategory(marker);
    if (categoryTag) {
        titleElement.innerHTML = `${marker.text} <span class="place-category">${categoryTag}</span>`;
    } else {
        titleElement.textContent = marker.text;
    }

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
    
    // 주소 정보 표시 - 없으면 가장 가까운 행정구역 표시
    if (marker.address) {
        addressElement.textContent = `${marker.address} (${marker.x}, ${marker.z})`;
    } else {
        var nearestDistrict = findNearestDistrict(marker.x, marker.z);
        if (nearestDistrict) {
            addressElement.textContent = `수민특별시 ${nearestDistrict.gu} ${nearestDistrict.name} (${marker.x}, ${marker.z})`;
        } else {
            addressElement.textContent = `주소 정보 없음 (${marker.x}, ${marker.z})`;
        }
    }

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
            var infoText = currentMarker.info || data.message || '정보가 없습니다.';
            infoElement.textContent = infoText;
            
            // "정보가 없습니다" 일 때 스타일 적용
            if (infoText === '정보가 없습니다.') {
                infoElement.style.textAlign = 'center';
                infoElement.style.color = '#999';
                infoElement.style.padding = '20px';
            } else {
                infoElement.style.textAlign = '';
                infoElement.style.color = '';
                infoElement.style.padding = '';
            }
        })
        .catch(error => {
            infoElement.textContent = currentMarker.info || '정보가 없습니다.';
            infoElement.style.textAlign = 'center';
            infoElement.style.color = '#999';
            infoElement.style.padding = '20px';
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
            
            if (reviews.length === 0) {
                reviewsList.innerHTML = '<li style="text-align: center; color: #999; padding: 20px;">리뷰가 없습니다.</li>';
                return;
            }
            
            reviews.forEach(function (review) {
                var li = document.createElement('li');
                li.innerHTML = `
                    <div class="review-header">
                        <span class="review-user">${review.username || '익명'}</span>
                        <span class="review-rating">${getStars(review.rating)}</span>
                        <span class="review-date">${new Date(review.created_at).toLocaleDateString()}</span>
                        <button class="review-delete-btn" onclick="deleteReview(${review.id})">🗑️</button>
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
