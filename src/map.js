var w = window.innerWidth
if (w > 800) {
    var wid = w - 400;
    // console.log(wid);
    document.getElementById('map').style.width = wid + "px";
    document.getElementById('news_content_box').style.width = wid - 30 + "px";
}
window.addEventListener('resize', function () {
    var wasdf = window.innerWidth
    if (wasdf > 800) {
        var wid = wasdf - 400;
        // console.log(wid);
        document.getElementById('map').style.width = wid + "px";
        document.getElementById('news_content_box').style.width = wid - 30 + "px";
    } else if (wasdf <= 800) {
        document.getElementById('map').style.width = 100 + "vw";
        document.getElementById('news_content_box').style.width = 95 + "%";
    }
});
// URL에서 lat과 long 매개변수 값을 가져오는 함수
function getParameterByName(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    var results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// 기본 중심 좌표와 줌 레벨 설정
var defaultLat = 36.5;
var defaultLong = 127.5;
var defaultZoom = 7;

// URL에서 lat과 long 매개변수 값을 가져옴
var userLat = getParameterByName('lat');
var userLong = getParameterByName('lon');
var userZoom = getParameterByName('zoom');

// 사용자 입력값이 있는 경우 해당 위치로 지도의 중심을 설정
// 입력값이 없는 경우 기본값으로 설정
var centerLat = userLat ? parseFloat(userLat) : defaultLat;
var centerLong = userLong ? parseFloat(userLong) : defaultLong;
var zoomLevel = userZoom ? parseFloat(userZoom) : defaultZoom

// 지도 생성 및 중심 위치 설정
var map = L.map('map').setView([centerLat, centerLong], zoomLevel);
// URL에서 기존 좌표값 가져오기
var lat = parseFloat(getParameterByName('lat'));
var lon = parseFloat(getParameterByName('lon'));
var zoom = parseInt(getParameterByName('zoom'));

// 지도 이동 이벤트 핸들러
function onMapMove(e) {
    var center = map.getCenter();
    var currentUrl = window.location.href;
    var newUrl;

    // URL에 lat, lon, zoom 매개변수가 있는지 확인
    var hasQueryParams = currentUrl.indexOf('?') !== -1;
    if (hasQueryParams) {
        // 기존의 매개변수를 유지하면서 lat, lon, zoom 값을 갱신
        var urlParams = currentUrl.split('?')[1];
        var paramsArray = urlParams.split('&');
        var updatedParamsArray = paramsArray.map(function (param) {
            if (param.startsWith('lat=')) {
                return 'lat=' + center.lat.toFixed(6);
            } else if (param.startsWith('lon=')) {
                return 'lon=' + center.lng.toFixed(6);
            } else if (param.startsWith('zoom=')) {
                return 'zoom=' + map.getZoom();
            }
            return param;
        });

        newUrl = currentUrl.split('?')[0] + '?' + updatedParamsArray.join('&');
    } else {
        // URL에 매개변수가 없는 경우 새로 추가
        newUrl = currentUrl + '?lat=' + center.lat.toFixed(6) + '&lon=' + center.lng.toFixed(6) + '&zoom=' + map.getZoom();
    }

    window.history.pushState({ path: newUrl }, '', newUrl);
}

// 지도 이동 이벤트 등록
map.on('moveend', onMapMove);

// 기존 좌표값이 있는 경우 해당 좌표로 지도 중심 이동
if (!isNaN(lat) && !isNaN(lon)) {
    map.setView([lat, lon], zoom || 7);
}
// 타일 레이어 추가
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 20,
}).addTo(map);

document.getElementById('move_country').addEventListener("click", function () {
    map.setView([36.5, 127.5], 7)
})
