
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { collection, doc, setDoc, deleteDoc , getDocs, getFirestore } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";


function nowTime() {// 현재 시간 객체 생성
    var currentTime = new Date();

    // 년, 월, 일, 시, 분, 초 추출
    var year = currentTime.getFullYear();
    var month = currentTime.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
    var day = currentTime.getDate();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();

    // 월, 일, 시, 분, 초가 10보다 작을 경우, 앞에 0을 추가하여 두 자리로 만듭니다.
    if (month < 10) {
        month = '0' + month;
    }

    if (day < 10) {
        day = '0' + day;
    }

    if (hours < 10) {
        hours = '0' + hours;
    }

    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    var currentTimeString = year + month + day + hours + minutes + seconds;
    return currentTimeString
}
function generateRandomKey() {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var key = '';

    for (var i = 0; i < 5; i++) {
        var randomIndex = Math.floor(Math.random() * characters.length);
        key += characters.charAt(randomIndex);
    }

    return key;
}
function getCurrentTimestampInSeconds() {
    return Math.floor(Date.now() / 1000);
}
function timestampToDateTime(timestamp) {
    const dateObj = new Date(timestamp * 1000); // 초 단위 타임스탬프를 밀리초 단위로 변환

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 해줍니다.
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');

    return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분 ${seconds}초`;
}
function situationStyle(type) {
    var situation_style = document.getElementById('situation')
    if (type == 'occur') {
        situation_style.style = 'background-color: rgb(255, 0, 0); display:block; color:white;'
    } else if (type == 'occur_bf') {
        situation_style.style = 'background-color: rgb(255, 125, 0); display:block; color:black;'
    } else if (type == 'danger') {
        situation_style.style = 'background-color: rgb(255, 244, 0); display:block; color:black;'
    } else if (type == 'difference') {
        situation_style.style = 'background-color: rgb(131, 131, 131); display:block; color:black;'
    } else if (type == 'usual') {
        situation_style.style = 'background-color: rgb(228, 228, 228); display:block; color:black;'
    }
    document.getElementById('notification').style = 'display:block'
}

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCP7PpAFX7-be7xnYjMC2NGAY3TNneAnQM",
    authDomain: "project-drs-1c0f5.firebaseapp.com",
    projectId: "project-drs-1c0f5",
    storageBucket: "project-drs-1c0f5.appspot.com",
    messagingSenderId: "815889035194",
    appId: "1:815889035194:web:b7cb130218e95a8c923783",
    measurementId: "G-R12EV3GPH2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();
const auth = getAuth();
document.getElementById('google_login').addEventListener("click", () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // console.log(result)
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            localStorage.setItem('email', result.user.email)
            location.reload();
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            console.log(error)
        });
})

var email = localStorage.getItem('email');
if (email == null) {
    document.getElementById('bf_login').style.display = 'block'
    document.getElementById('togo').style.display = 'none'
} else if (email != null) {
    document.getElementById('bf_login').style.display = 'none'
    document.getElementById('togo').style.display = 'block'
}
document.getElementById('logout').addEventListener('click', function () {
    localStorage.clear()
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        alert(error)
    });
    alert('로그아웃되었습니다.')
    location.reload();
})

const db = getFirestore(app);


//first 지우기
var onedaychecked = localStorage.getItem('oneday')
if(onedaychecked != null){
    var givenDate = new Date(onedaychecked.slice(0,-9))
    var currentDate = new Date()
    // console.log(1)
    if(givenDate > currentDate){
        document.getElementById('first').style = 'display:none'
        document.getElementById('back').style = 'display:none'
    }
}
document.getElementById('first_close').addEventListener('click', function () {
    document.getElementById('first').style = 'display:none'
    document.getElementById('back').style = 'display:none'
    if(document.getElementById('oneday').checked){
        localStorage.setItem('oneday', validTime)
    }
})

var now_loc = L.icon({
    iconUrl: '../resource/loc.png',
    iconSize: [35, 35],
})
const locMarker = L.layerGroup().addTo(map)
//투고 시 위치정보 수동
function onMapClick(e) {
    locMarker.clearLayers();
    var latitude = e.latlng.lat.toFixed(6);
    var longitude = e.latlng.lng.toFixed(6);

    document.getElementById('input_lat').value = latitude;
    document.getElementById('input_lon').value = longitude;
    var now_loc_marker = L.marker([latitude, longitude], { icon: now_loc }).addTo(map)
    locMarker.addLayer(now_loc_marker)
}
map.on('click', onMapClick);

//위치정보 수집
document.getElementById('now_location').addEventListener('click', function (event) {
    event.preventDefault(); // 폼 제출의 기본 동작 방지
    var options = {
        enableHighAccuracy: true
    };
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(moveNowLoc, showError, options);
    } else {
        console.error('Geolocation을 지원하지 않는 브라우저입니다.');
    }
});
var now_icon = L.icon({
    iconUrl: '../resource/now.svg',
    iconSize: [25, 25]
})
function moveNowLoc(position) {
    const latitude = position.coords.latitude.toFixed(5);
    const longitude = position.coords.longitude.toFixed(5);

    map.setView([latitude, longitude], 15);
    L.marker([latitude, longitude], { icon: now_icon }).addTo(map);
}
document.getElementById('auto').addEventListener('click', function (event) {
    event.preventDefault(); // 폼 제출의 기본 동작 방지
    var options = {
        enableHighAccuracy: true
    };
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError, options);
    } else {
        console.error('Geolocation을 지원하지 않는 브라우저입니다.');
    }
});
document.getElementById('correct_auto').addEventListener('click', function (event) {
    event.preventDefault(); // 폼 제출의 기본 동작 방지
    var options = {
        enableHighAccuracy: true
    };
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showCorrectPosition, showError, options);
    } else {
        console.error('Geolocation을 지원하지 않는 브라우저입니다.');
    }
});
function showCorrectPosition(position){
    locMarker.clearLayers();
    const latitude = position.coords.latitude.toFixed(6);
    const longitude = position.coords.longitude.toFixed(6);

    document.getElementById('correct_lat').value = latitude;
    document.getElementById('correct_lon').value = longitude;

    var now_loc_marker = L.marker([latitude, longitude], { icon: now_loc }).addTo(map)
    locMarker.addLayer(now_loc_marker)
}
function showPosition(position) {
    locMarker.clearLayers();
    const latitude = position.coords.latitude.toFixed(6);
    const longitude = position.coords.longitude.toFixed(6);

    document.getElementById('input_lat').value = latitude;
    document.getElementById('input_lon').value = longitude;

    var now_loc_marker = L.marker([latitude, longitude], { icon: now_loc }).addTo(map)
    locMarker.addLayer(now_loc_marker)
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.error('위치 정보 요청이 거부되었습니다.');
            break;
        case error.POSITION_UNAVAILABLE:
            console.error('위치 정보를 사용할 수 없습니다.');
            break;
        case error.TIMEOUT:
            console.error('위치 정보 요청이 시간 초과되었습니다.');
            break;
        case error.UNKNOWN_ERROR:
            console.error('알 수 없는 오류가 발생했습니다.');
            break;
    }
}


/**disasterType의 데이터를 한국어로 변환시켜줍니다.*/
function getDisasterDescription(disasterType) {
    let disaster = '';
    
    for (var i = 0; i < disasterType.length; i++) {
        switch (disasterType[i]) {
            case 'earthquake':
                disaster += '지진, ';
                break;
            case 'heavyrain':
                disaster += '폭우, ';
                break;
            case 'lightning':
                disaster += '번개, ';
                break;
            case 'landslide':
                disaster += '산사태, ';
                break;
            case 'flood':
                disaster += '홍수, ';
                break;
            case 'fire':
                disaster += '화재, ';
                break;
            case 'hot':
                disaster += '폭염, ';
                break;
            case 'cold':
                disaster += '한파, ';
                break;
            case 'heavysnow':
                disaster += '폭설, ';
                break;
            case 'wind':
                disaster += '강풍, ';
                break;
            case 'tornado':
                disaster += '토네이도, ';
                break;
            case 'tsunami':
                disaster += '지진해일, ';
                break;
            case 'surge':
                disaster += '폭풍해일, ';
                break;
            case 'pollution':
                disaster += '대기오염, ';
                break;
            case 'social':
                disaster += '사회재난, ';
                break;
            case 'volcano':
                disaster += '화산, ';
                break;
            case 'etc':
                disaster += '기타재해, ';
                break;
        }
    }

    // 마지막 쉼표(,) 제거
    if (disaster.length > 0) {
        disaster = disaster.slice(0, -2);
    }

    return disaster;
}
/**situationType의 데이터를 한국어로 변환시켜줍니다.*/
function getSituationDescription(situationType) {
    let situation = '';
    switch (situationType) {
        case 'occur':
            situation = '재해 발생!';
            break;
        case 'occur_bf':
            situation = '재해 발생 직전';
            break;
        case 'danger':
            situation = '위험 감지';
            break;
        case 'difference':
            situation = '평소와 다름';
            break;
        case 'usual':
            situation = '평소';
            break;
    }
    return situation;
}
//시간
var nowDate = new Date();
//유효시각
var validTime = new Date(nowDate.getTime() + 24 * 60 * 60 * 1000)

//아이콘들
const earthquake = L.divIcon({
    className: 'earthquake',
    html: '<i class="fa-solid fa-house-crack" style="font-size:20px; margin-left:-5px; margin-top:-10px;"></i>'
})
const heavyrain = L.divIcon({
    className: 'heavyrain',
    html: '<i class="fa-solid fa-cloud-showers-heavy" style="font-size:20px; margin-left:-4px; margin-top:-10px;"></i>'
})
const lightning = L.divIcon({
    className: 'lightning',
    html: '<i class="fa-solid fa-bolt-lightning" style="font-size:20px; margin-left:-1px; margin-top:-3px;"></i>'
})
const landslide = L.divIcon({
    className: 'landslide',
    html: '<i class="fa-solid fa-mountain" style="font-size:20px; margin-left:-4px; margin-top:-10px;"></i>'
})
const flood = L.divIcon({
    className: 'flood',
    html: '<i class="fa-solid fa-house-flood-water" style="font-size:20px; margin-left:-5.5px; margin-top:-10px;"></i>'
})
const fire = L.divIcon({
    className: 'fire',
    html: '<i class="fa-solid fa-fire" style="font-size:20px; margin-left:-3px; margin-top:-6px;"></i>'
})
const hot = L.divIcon({
    className: 'hot',
    html: '<i class="fa-solid fa-sun" style="font-size:20px; margin-left:-4px; margin-top:-4px;"></i>'
})
const cold = L.divIcon({
    className: 'cold',
    html: '<i class="fa-solid fa-snowflake" style="font-size:20px; margin-left:-3px; margin-top:-4px;"></i>'
})
const heavysnow = L.divIcon({
    className: 'heavysnow',
    html: '<i class="fa-solid fa-cloud-meatball" style="font-size:20px; margin-left:-4px; margin-top:-4px;"></i>'
})
const wind = L.divIcon({
    className: 'wind',
    html: '<i class="fa-solid fa-wind" style="font-size:20px; margin-left:-4px; margin-top:-4px;"></i>'
})
const tornado = L.divIcon({
    className: 'tornado',
    html: '<i class="fa-solid fa-tornado" style="font-size:20px; margin-left:-3px; margin-top:-3px;"></i>'
})
const tsunami = L.divIcon({
    className: 'tsunami',
    html: '<i class="fa-solid fa-house-tsunami" style="font-size:20px; margin-left:-6px; margin-top:-4px;"></i>'
})
const surge = L.divIcon({
    className: 'surge',
    html: '<i class="fa-solid fa-water" style="font-size:20px; margin-left:-5px; margin-top:-5px;"></i>'
})
const pollution = L.divIcon({
    className: 'pollution',
    html: '<i class="fa-solid fa-smog" style="font-size:20px; margin-left:-6px; margin-top:-4px;"></i>'
})
const social = L.divIcon({
    className: 'social',
    html: '<i class="fa-solid fa-triangle-exclamation" style="font-size:20px; margin-left:-4px; margin-top:-6px;"></i>'
})
const volcano = L.divIcon({
    className: 'volcano',
    html: '<i class="fa-solid fa-volcano" style="font-size:20px; margin-left:-4px; margin-top:-6px;"></i>'
})
const etc = L.divIcon({
    className: 'etc',
    html: '<i class="fa-solid fa-ellipsis" style="font-size:20px; margin-left:-3px; margin-top:-4px;"></i>'
})
const twoPlus = L.divIcon({
    className: 'twoPlus',
    html: '<i class="fa-solid fa-plus" style="font-size:20px; margin-left:-3px; margin-top:-4px;"></i>'
})
const red = L.icon({
    iconUrl: '../resource/red.svg',
    iconSize: [32, 32]
})
const orange = L.icon({
    iconUrl: '../resource/orange.svg',
    iconSize: [32, 32]
})
const yellow = L.icon({
    iconUrl: '../resource/yellow.svg',
    iconSize: [32, 32]
})
const gray = L.icon({
    iconUrl: '../resource/gray.svg',
    iconSize: [32, 32]
})
const white = L.icon({
    iconUrl: '../resource/white.svg',
    iconSize: [32, 32]
})
//보고 버튼
var loc = [];
document.getElementById('submit').addEventListener('click', function (event) {
    event.preventDefault(); // 폼 제출의 기본 동작 방지

    //정보 수집
    var disaster = document.getElementById('disaster_type');
    var selectedOptions = Array.from(disaster.selectedOptions).map(function (option) {
        return option.value;
    });

    if (email == null) {
        alert('로그인이 필요합니다.')
        location.reload();
    } else {
        if ((document.getElementById('name').value).length == 0) {
            alert('이름을 입력해주세요.');
            return;
        }
        if (selectedOptions.length === 0) {
            alert('적어도 하나의 재해 종류를 선택해주세요.');
            return;
        }
        if (document.getElementById('input_lat').value == '' && document.getElementById('input_lon').value == '') {
            alert('위치정보를 입력해주세요.');
            return;
        }
        loc.push([document.getElementById('input_lat').value, document.getElementById('input_lon').value])
        var ok = confirm(`입력하신 정보가 확실합니까?
> ${getDisasterDescription(selectedOptions)} | ${getSituationDescription(document.getElementById('situation_type').value)}
> ${document.getElementById('explain').value}`)
        if (ok) {
            //서버 전송
            var id=nowTime()+generateRandomKey()
            setDoc(doc(db, "report", id), {
                name: document.getElementById('name').value,
                id: id,
                pressTime: nowDate,
                validTime: validTime,
                location: [document.getElementById('input_lat').value, document.getElementById('input_lon').value],
                disasterType: selectedOptions,
                situationType: document.getElementById('situation_type').value,
                comment: document.getElementById('explain').value,
                email: email
            });
            document.getElementById('sending').style='display:block;'
            setTimeout(function() {
                location.reload();
            }, 3000);
        } else {
            alert('다시한번 확인해주세요')
        }
        
    }
});

var count = 0
document.getElementById('see_mobile_tab').addEventListener('click', function () {
    count += 1
    if (count % 2 == 1) {
        document.getElementById('content').style = `top:30%;`
    } else {
        document.getElementById('content').style = `top:90%;`
    }
    // console.log(count)
})
async function deleteReport(selected_report_email, id, name){
    // console.log(selected_report_email)
    // console.log(id)
    if(selected_report_email == email){
        // console.log('똑같음')
        document.getElementById('plzdelete').style="display:block;"
        document.getElementById('notification').style="display:none;"
        document.getElementById('nickname').textContent = name;
        document.getElementById('input_nickname').placeholder = name;
        document.getElementById('plzdelete').addEventListener("click",function(){
            document.getElementById('correct_box').style='display:none;'
            document.getElementById('plzdelete').style='display:none;'
            document.getElementById('delete_box').style='display:block;'
            document.getElementById('plzcorrect').style='display:block;'
        })
        document.getElementById('delete_cancel').addEventListener("click",function(){
            document.getElementById('delete_box').style='display:none;'
            document.getElementById('plzdelete').style='display:block;'
        })
        document.getElementById('delete_confirm').addEventListener("click",async function(){
            // console.log(document.getElementById('input_nickname').value)
            if(document.getElementById('input_nickname').value == name){
                if(selected_report_email == email){
                    document.getElementById('sending_message').textContent='삭제중입니다...'
                    await deleteDoc(doc(db, "report", id));
                    document.getElementById('sending').style='display:block;';
                    setTimeout(function() {
                        location.reload();
                    }, 2000);
                }
            }else{
                alert('입력된 값이 제시된 값과 다릅니다.')
            }
        })
    }
}
async function correctReport(data){
    // console.log(data)
    if(data.email == email){
        document.getElementById('notification_box').style="display:none;"
        document.getElementById('plzcorrect').style="display:block;"
        document.getElementById('correct_name').value = data.name;
        document.getElementById('correct_lat').value = data.location[0];
        document.getElementById('correct_lon').value = data.location[1];
        document.getElementById('correct_lat').value = data.location[0];
        for(var i = 0; i < document.getElementById("correct_disaster_type").options.length; i++){
            var option = document.getElementById("correct_disaster_type").options[i];
            option.selected = (data.disasterType).includes(option.value);
        }
        for(var i = 0; i < document.getElementById('correct_situation_type').options.length; i++){
            var option = document.getElementById('correct_situation_type').options[i];
            if (option.value == data.situationType) {
                option.selected = true;
                break; // 선택된 옵션을 찾았으면 루프 종료
            }
        }
        document.getElementById('correct_explain').value = data.comment;
        
        document.getElementById('plzcorrect').addEventListener("click",function(){
            document.getElementById('delete_box').style='display:none;'
            document.getElementById('plzcorrect').style='display:none;'
            document.getElementById('correct_box').style='display:block;'
            document.getElementById('plzdelete').style='display:block;'
        })
        document.getElementById('correct_cancel').addEventListener("click",function(){
            document.getElementById('correct_box').style='display:none;'
            document.getElementById('plzcorrect').style='display:block;'
        })
        document.getElementById('correct_confirm').addEventListener("click", function(){
            var disaster = document.getElementById('correct_disaster_type');
            var selectedOptions = Array.from(disaster.selectedOptions).map(function (option) {
                return option.value;
            });
            if ((document.getElementById('correct_name').value).length == 0) {
                alert('이름을 입력해주세요.');
                return;
            }
            if (selectedOptions.length === 0) {
                alert('적어도 하나의 재해 종류를 선택해주세요.');
                return;
            }
            if (document.getElementById('correct_lat').value == '' && document.getElementById('correct_lon').value == '') {
                alert('위치정보를 입력해주세요.');
                return;
            }

            var ok = confirm(`입력하신 정보가 확실합니까?
> ${getDisasterDescription(selectedOptions)} | ${getSituationDescription(document.getElementById('correct_situation_type').value)}
> ${document.getElementById('correct_explain').value}`)
            if(ok){
                setDoc(doc(db, "report", data.id), {
                    name: document.getElementById('correct_name').value,
                    id: data.id,
                    pressTime: data.pressTime,
                    validTime: data.validTime,
                    location: [document.getElementById('correct_lat').value, document.getElementById('correct_lon').value],
                    disasterType: selectedOptions,
                    situationType: document.getElementById('correct_situation_type').value,
                    comment: document.getElementById('correct_explain').value,
                    email: email
                });
                document.getElementById('sending').style='display:block;'
                setTimeout(function() {
                    location.reload();
                }, 3000);
            } else {
                alert('다시한번 확인해주세요')
            }
        })

    }
}

function onMarkerClick(e) {
    var marker = e.target;
    document.getElementById('plzdelete').style="display:none;"
    document.getElementById('plzcorrect').style="display:none;"
    var data = marker.data; // 마커에 연결된 데이터 객체

    // 정보를 표시할 div 엘리먼트 선택
    document.getElementById('see_report_box').style='display:block;margin:10px;'
    document.getElementById('see_report_title').textContent = `${data.name}님의 보고`;
    document.getElementById('report_time').textContent = timestampToDateTime((data.pressTime).seconds)  + ' 기준';
    document.getElementById('disaster').textContent = getDisasterDescription(data.disasterType)
    document.getElementById('disaster_asdf').textContent = ' 보고됨';
    document.getElementById('situation').textContent = getSituationDescription(data.situationType);
    document.getElementById('comment').textContent = data.comment;
    situationStyle(data.situationType)
    map.setView(data.location, 12)
    localStorage.setItem('report_id', data.id);
    deleteReport((data.email), data.id, data.name)
    correctReport(data)
}
const reportMarker = L.layerGroup().addTo(map);
// const querySnapshot = await getDocs(collection(db, "report"));
const data_list = []
const querySnapshot = await getDocs(collection(db, "report"));
querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    var data = doc.data()
    data_list.push(data)
});
function pingReportMarker(){
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        var data = doc.data()
        var marker
        if (data.situationType == 'occur') {
            marker = L.marker(data.location, { icon: red }).addTo(map);
        } else if (data.situationType == 'occur_bf') {
            marker = L.marker(data.location, { icon: orange }).addTo(map);
        } else if (data.situationType == 'danger') {
            marker = L.marker(data.location, { icon: yellow }).addTo(map);
        } else if (data.situationType == 'difference') {
            marker = L.marker(data.location, { icon: gray }).addTo(map);
        } else if (data.situationType == 'usual') {
            marker = L.marker(data.location, { icon: white }).addTo(map);
        }
        reportMarker.addLayer(marker)
        if ((data.disasterType).length == 1) {
            if (data.disasterType == 'earthquake') {
                marker = L.marker(data.location, { icon: earthquake }).addTo(map);
            } else if (data.disasterType == 'heavyrain') {
                marker = L.marker(data.location, { icon: heavyrain }).addTo(map);
            } else if (data.disasterType == 'lightning') {
                marker = L.marker(data.location, { icon: lightning }).addTo(map);
            } else if (data.disasterType == 'landslide') {
                marker = L.marker(data.location, { icon: landslide }).addTo(map);
            } else if (data.disasterType == 'flood') {
                marker = L.marker(data.location, { icon: flood }).addTo(map);
            } else if (data.disasterType == 'fire') {
                marker = L.marker(data.location, { icon: fire }).addTo(map);
            } else if (data.disasterType == 'hot') {
                marker = L.marker(data.location, { icon: hot }).addTo(map);
            } else if (data.disasterType == 'cold') {
                marker = L.marker(data.location, { icon: cold }).addTo(map);
            } else if (data.disasterType == 'heavysnow') {
                marker = L.marker(data.location, { icon: heavysnow }).addTo(map);
            } else if (data.disasterType == 'wind') {
                marker = L.marker(data.location, { icon: wind }).addTo(map);
            } else if (data.disasterType == 'tornado') {
                marker = L.marker(data.location, { icon: tornado }).addTo(map);
            } else if (data.disasterType == 'tsunami') {
                marker = L.marker(data.location, { icon: tsunami }).addTo(map);
            } else if (data.disasterType == 'surge') {
                marker = L.marker(data.location, { icon: surge }).addTo(map);
            } else if (data.disasterType == 'pollution') {
                marker = L.marker(data.location, { icon: pollution }).addTo(map);
            } else if (data.disasterType == 'social') {
                marker = L.marker(data.location, { icon: social }).addTo(map);
            } else if (data.disasterType == 'volcano') {
                marker = L.marker(data.location, { icon: volcano }).addTo(map);
            } else if (data.disasterType == 'etc') {
                marker = L.marker(data.location, { icon: etc }).addTo(map);
            }
            reportMarker.addLayer(marker)
        } else {
            marker = L.marker(data.location, { icon: twoPlus }).addTo(map);
            reportMarker.addLayer(marker)
        }
    
        marker.data = data;
    
        // 마커 클릭 이벤트 등록
        marker.on('click', onMarkerClick);
    });
}
pingReportMarker()
// console.log(data_list)
const container = document.getElementById('list');
var revdata = data_list.slice().reverse();
for (let i = 0; i < revdata.length; i++) {
    const currentData = revdata[i];
    const divElement = document.createElement('div');
    divElement.className = 'dataDiv'

    const title = document.createElement('h4');
    title.textContent = timestampToDateTime((currentData.pressTime).seconds);
    divElement.appendChild(title);
    const context = document.createElement('h3');
    context.textContent = getDisasterDescription(currentData.disasterType) + ' | ' + getSituationDescription(currentData.situationType);
    divElement.appendChild(context);

    //스타일
    if (currentData.situationType == 'occur') {
        divElement.style.backgroundColor = `#f00`
        divElement.style.color = `white`
    } else if (currentData.situationType == 'occur_bf') {
        divElement.style.backgroundColor = `#ff7d00`
    } else if (currentData.situationType == 'danger') {
        divElement.style.backgroundColor = `#fff400`
    } else if (currentData.situationType == 'difference') {
        divElement.style.backgroundColor = `#838383`
    } else if (currentData.situationType == 'usual') {
        divElement.style.backgroundColor = `#e4e4e4`
    }

    divElement.addEventListener('click', () => {
        document.getElementById('plzdelete').style="display:none;"
        document.getElementById('plzcorrect').style="display:none;"
        document.getElementById('see_report_box').style= 'display:block; margin:10px;'
        document.getElementById('see_report_title').textContent = `${currentData.name}님의 보고`;
        document.getElementById('report_time').textContent = timestampToDateTime((currentData.pressTime).seconds) + ' 기준';
        document.getElementById('disaster').textContent = getDisasterDescription(currentData.disasterType);
        document.getElementById('disaster_asdf').textContent = ' 보고됨'
        document.getElementById('situation').textContent = getSituationDescription(currentData.situationType);
        document.getElementById('comment').textContent = currentData.comment;
        situationStyle(currentData.situationType)

        map.setView(currentData.location, 12)
        document.getElementById('notification_box').style = 'display:none;'
        deleteReport((currentData.email), currentData.id, currentData.name)
        correctReport(currentData)
    })

    container.appendChild(divElement)
    // console.log(currentData.validTime.seconds);
    if(currentData.validTime.seconds - getCurrentTimestampInSeconds() < 0){
        await deleteDoc(doc(db, "report", currentData.id));
    }
}



document.addEventListener("keydown", function (event) {
    var keyCode = event.keyCode || event.which;
    if (keyCode === 27) {
        document.getElementById('see_report_box').style= 'display:none; margin:10px;';
        document.getElementById('see_report_title').textContent = '다른 유저의 보고를 선택해주세요.';
        document.getElementById('notification_box').style = 'display:none;'
        map.setView([36.5, 127.5], 7);
        locMarker.clearLayers();
        document.getElementById('input_lat').value=''
        document.getElementById('input_lon').value=''
    }
});



function copyCurrentUrl() {
    var currentUrl = window.location.href;

    var tempInput = document.createElement('input');
    tempInput.setAttribute('value', currentUrl);
    document.body.appendChild(tempInput);

    tempInput.select();
    document.execCommand('copy');

    document.body.removeChild(tempInput);
}

document.getElementById('share').addEventListener("click", function () {
    copyCurrentUrl();
    var share_announce = document.getElementById('share_announce');
    var share_announce_talk = document.getElementById('share_announce_talk');

    // 나타나기
    share_announce.style.opacity = '1';
    share_announce_talk.style.opacity = '1';

    // 2초 후에 사라지기
    setTimeout(function () {
        share_announce.style.opacity = '0';
        share_announce_talk.style.opacity = '0';
    }, 1000);
})
// var red_icon = 0;
// var orange_icon = 0;
// var yellow_icon = 0;
// var green_icon = 0;
// var blue_icon = 0;
// var white_icon = 0;
const pastMarker = L.layerGroup().addTo(map)
async function pastReport(id, type, value){
    var pastReportData = []
    const pastReportSnapshot = await getDocs(collection(db, "past-disaster",id, 'report'));
    pastReportSnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        pastReportData.push(doc.data())
    });
    if(type=='지진'){
        document.getElementById('red').textContent = '무시무시하게 흔들림';
        document.getElementById('orange').textContent = '격렬하게 흔들림';
        document.getElementById('yellow').textContent = '강하게 흔들림';
        document.getElementById('green').textContent = '약하게 흔들림';
        document.getElementById('blue').textContent = '흔들린것 같은 느낌';
        document.getElementById('white').textContent = '흔들리지 않음';
        document.getElementById('value').textContent = '규모: ' + value;
        epicenter = L.icon({
            iconUrl: '../resource/epicenter.png',
            iconSize: [40, 40]
        })
    }
    if(type=='태풍'){
        document.getElementById('red').textContent = '거주 불가능';
        document.getElementById('orange').textContent = '무시무시한 피해를 입음';
        document.getElementById('yellow').textContent = '많은 피해 발생';
        document.getElementById('green').textContent = '피해 발생';
        document.getElementById('blue').textContent = '약간의 피해 있음';
        document.getElementById('white').textContent = '피해 없음';
        document.getElementById('value').textContent = value;
        epicenter = L.icon({
            iconUrl: '../resource/epicenter.png',
            iconSize: [40, 40]
        })
    }
    for(var i=0;i<pastReportData.length;i++){
        var past_marker
        if (pastReportData[i].felt == 'red') {
            var past_icon = L.icon({
                iconUrl: '../resource/red.svg',
                iconSize: [20, 20]
            })
            past_marker = L.marker(pastReportData[i].location, { icon: past_icon }).addTo(map)
            // red_icon += 1
            // document.getElementById('past_red').textContent = ': ' + red_icon;
        } else if (pastReportData[i].felt == 'orange') {
            var past_icon = L.icon({
                iconUrl: '../resource/orange.svg',
                iconSize: [20, 20]
            })
            past_marker = L.marker(pastReportData[i].location, { icon: past_icon }).addTo(map)
            // orange_icon += 1
            // document.getElementById('past_orange').textContent = ': ' + orange_icon;
        } else if (pastReportData[i].felt == 'yellow') {
            var past_icon = L.icon({
                iconUrl: '../resource/yellow.svg',
                iconSize: [20, 20]
            })
            past_marker = L.marker(pastReportData[i].location, { icon: past_icon }).addTo(map)
            // yellow_icon += 1
            // document.getElementById('past_yellow').textContent = ': ' + yellow_icon;
        } else if (pastReportData[i].felt == 'green') {
            var past_icon = L.icon({
                iconUrl: '../resource/green.svg',
                iconSize: [20, 20]
            })
            past_marker = L.marker(pastReportData[i].location, { icon: past_icon }).addTo(map)
            // green_icon += 1
            // document.getElementById('past_green').textContent = ': ' + green_icon;
        } else if (pastReportData[i].felt == 'blue') {
            var past_icon = L.icon({
                iconUrl: '../resource/blue.svg',
                iconSize: [20, 20]
            })
            past_marker = L.marker(pastReportData[i].location, { icon: past_icon }).addTo(map)
            // blue_icon += 1
            // document.getElementById('past_blue').textContent = ': ' + blue_icon;
        } else if (pastReportData[i].felt == 'white') {
            var past_icon = L.icon({
                iconUrl: '../resource/white.svg',
                iconSize: [20, 20]
            })
            past_marker = L.marker(pastReportData[i].location, { icon: past_icon }).addTo(map)
            // white_icon += 1
            // document.getElementById('past_white').textContent = ': ' + white_icon;
        }
        pastMarker.addLayer(past_marker)
        // console.log(red)
    }
}
document.getElementById('back_report').addEventListener("click", function () {
    document.getElementById('section1').style = 'display:block'
    document.getElementById('section2').style = 'display:block'
    document.getElementById('section3').style = 'display:block'
    document.getElementById('past_legend').style = 'display:none'
    document.getElementById('back_report').style = 'display:none'
    document.getElementById('past_disaster').style = 'display:none'
    // document.getElementById('past_number').style = 'display:none'
    document.getElementById('this_report').style ='display:none'
    pastMarker.clearLayers();
    map.setView([36.5, 127.5], 7)
    pingReportMarker()
})
const pastSnapshot = await getDocs(collection(db, "past-disaster"));

var pastData = []
pastSnapshot.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());
    pastData.push(doc.data())
});
// console.log(pastData.response.body.data.reports[0].report)
const report_box = document.getElementById('report');
pastData.reverse()
// console.log(pastData)
for (var i = 0; i < pastData.length; i++) {
    const currentData = pastData[i];
    const divElement = document.createElement('div');
    divElement.className = 'dataDiv';

    const title = document.createElement('h4');
    title.textContent = currentData.name;
    divElement.appendChild(title);
    const context = document.createElement('h3');
    context.textContent = currentData.disasterType + ' | ' + currentData.value;
    divElement.appendChild(context);

    divElement.addEventListener('click', () => {
        pastMarker.clearLayers();
        reportMarker.clearLayers();
        locMarker.clearLayers();
        document.getElementById('section1').style = 'display:none'
        document.getElementById('section2').style = 'display:none'
        document.getElementById('section3').style = 'display:none'
        document.getElementById('past_legend').style = 'display:block'
        document.getElementById('back_report').style = 'display:block'
        document.getElementById('past_disaster').style = 'display:block'
        // document.getElementById('past_number').style = 'display:block; display: flex;'
        document.getElementById('this_report').style = 'display:block;'
        // console.log(currentData.id)
        document.getElementById('this_report').href=`./convey/${currentData.id}/index.html`;
        pastReport(currentData.id, currentData.disasterType, currentData.value)
        map.setView(currentData.location, 9)
        // pingPastMarker()
        var epi_marker = L.marker(currentData.location, { icon: epicenter }).addTo(map)
        pastMarker.addLayer(epi_marker);
        document.getElementById('past_name').textContent = currentData.name
        document.getElementById('past_occurtime').textContent = timestampToDateTime(currentData.occurTime.seconds)
        document.getElementById('other').textContent = currentData.other_info;
        document.getElementById('free').textContent = currentData.free;
    })

    report_box.appendChild(divElement)
}

const airraid = await getDocs(collection(db, "important"));
airraid.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());
    if(doc.id == 'air-raid'){
        var data = doc.data()
        if(data.show == true){
            document.getElementById('air-raid').style = 'display:block; '
            if(data.test == true){
                document.getElementById('is_drill').style='display:block';
            }
            var time = timestampToDateTime((data.time).seconds)
            document.getElementById('air-raid-time').textContent = time.slice(10,12)+'일 ' + time.slice(13,16) + ':' + time.slice(18,20)
            if(data.type == '공습경보'){
                document.getElementById('air-raid-title').textContent = '공습경보'
                document.getElementById('air-raid-title-en').textContent = 'AIR RAID ALERM'
                document.getElementById('air-raid').style.backgroundColor = 'red';
                document.getElementById('air-raid-text').textContent = '가까운 지하시설로 대피하고 방송청취'
            }else if(data.type == '경계경보'){
                document.getElementById('air-raid-title').textContent = '경계경보'
                document.getElementById('air-raid-title-en').textContent = 'WARNING ALERM'
                document.getElementById('air-raid').style.backgroundColor = 'blue';
                document.getElementById('air-raid-text').textContent = '가까운 지하시설로 대피할 준비하고 방송청취'
            }else if(data.type == '화생방경보'){
                document.getElementById('air-raid-title').textContent = '화생방경보'
                document.getElementById('air-raid-title-en').textContent = 'CBR ALERM'
                document.getElementById('air-raid').style.backgroundColor = 'yellow';
                document.getElementById('air-raid').style.color = 'black';
                document.getElementById('air-raid-text').textContent = '호흡기 및 피부 등을 보호하여 오염되지 않은 지역으로 대피하고 방송청취'
            }else if(data.type == '경보해제'){
                document.getElementById('air-raid-title').textContent = '경보해제'
                document.getElementById('air-raid-title-en').textContent = 'ALERM LIFTED'
                document.getElementById('air-raid').style.backgroundColor = 'white';
                document.getElementById('air-raid').style.color = 'black';
                document.getElementById('air-raid-text').textContent = '정상업무에 복귀'
            }
            document.getElementById('air-raid-area').textContent = data.area
        }
    }
    // pastReportData.push(doc.data())
});