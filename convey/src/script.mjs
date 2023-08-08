import { collection, doc, setDoc, getFirestore } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";


const firebaseConfig = {
    apiKey: "AIzaSyCP7PpAFX7-be7xnYjMC2NGAY3TNneAnQM",
    authDomain: "project-drs-1c0f5.firebaseapp.com",
    projectId: "project-drs-1c0f5",
    storageBucket: "project-drs-1c0f5.appspot.com",
    messagingSenderId: "815889035194",
    appId: "1:815889035194:web:b7cb130218e95a8c923783",
    measurementId: "G-R12EV3GPH2"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
function allclear() {
    document.getElementById('red').style = "background-color:white; color:black";
    document.getElementById('orange').style = "background-color:white; color:black";
    document.getElementById('yellow').style = "background-color:white; color:black";
    document.getElementById('green').style = "background-color:white; color:black";
    document.getElementById('blue').style = "background-color:white; color:black";
    document.getElementById('white').style = "background-color:white; color:black";
}
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
function getCurrentLocation() {
    if ('geolocation' in navigator) {

        // 위치 정보를 지원하는 경우
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // 위치 정보를 가져온 경우
                const latitude = position.coords.latitude.toFixed(4);
                const longitude = position.coords.longitude.toFixed(4);
                document.getElementById('lat').textContent = latitude
                document.getElementById('lon').textContent = longitude;
            },
            (error) => {
                // 위치 정보를 가져오는데 실패한 경우
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        console.error('사용자가 위치 정보 수집 권한을 거부했습니다.');
                        alert('위치정보 수집에 실패했습니다. 다시 시도해주세요.')
                        document.getElementById('lat').textContent = '-'
                        document.getElementById('lon').textContent = '-'
                        break;
                    case error.POSITION_UNAVAILABLE:
                        console.error('위치 정보를 사용할 수 없습니다.');
                        alert('위치정보 수집에 실패했습니다. 다시 시도해주세요.')
                        break;
                    case error.TIMEOUT:
                        console.error('위치 정보 수집이 시간 초과되었습니다.');
                        alert('위치정보 수집에 실패했습니다. 다시 시도해주세요.')
                        break;
                    default:
                        console.error('알 수 없는 오류가 발생했습니다.');
                        alert('위치정보 수집에 실패했습니다. 다시 시도해주세요.')
                        break;
                }
            }
        );
    } else {
        console.error('브라우저가 위치 정보 수집을 지원하지 않습니다.');
    }
}
var clicked = ''
document.getElementById('red').addEventListener('click', function () {
    allclear()
    this.style = 'background-color:red;color:white;'
    clicked = 'red';
})
document.getElementById('orange').addEventListener('click', function () {
    allclear()
    this.style = 'background-color:orange;color:white;'
    clicked = 'orange';
})
document.getElementById('yellow').addEventListener('click', function () {
    allclear()
    this.style = 'background-color:yellow;color:black;'
    clicked = 'yellow';
})
document.getElementById('green').addEventListener('click', function () {
    allclear()
    this.style = 'background-color:green;color:black;'
    clicked = 'green';
})
document.getElementById('blue').addEventListener('click', function () {
    allclear()
    this.style = 'background-color:blue;color:white;'
    clicked = 'blue';
})
document.getElementById('white').addEventListener('click', function () {
    allclear()
    this.style = 'background-color:rgb(211, 211, 211);color:black;'
    clicked = 'white';
})
var lat;
var lon;
document.getElementById('get_location').addEventListener('click', function (event) {
    event.preventDefault(); // 폼 제출의 기본 동작 방지
    getCurrentLocation()
    console.log(loc)
    setTimeout(function () {
        lat = document.getElementById('lat').textContent
        lon = document.getElementById('lon').textContent;
        console.log(lat)
        if (lat == '-' || lon == '-') {
            alert('위치정보 수집에 실패했습니다. 다시 시도해주세요.');
            location.reload()
        }
    }, 100)
});
document.getElementById('send').addEventListener('click', function (event) {
    event.preventDefault(); // 폼 제출의 기본 동작 방지
    if(clicked == '') {
        alert('항목을 선택해주세요')
        location.reload()
    }else{
        var dis_id = document.getElementById('id').textContent
        console.log(dis_id)
        var id = nowTime() + generateRandomKey();
    
        lat = document.getElementById('lat').textContent
        lon = document.getElementById('lon').textContent;
        console.log(lat)
        if (lat == '-' || lon == '-' || lat=='---' || lon=='---') {
            alert('위치정보 수집에 실패했습니다. 다시 시도해주세요.');
            location.reload()
        } else {
            try{
                setDoc(doc(db, "past-disaster", dis_id, 'report', id), {
                    id: id,
                    location: [lat, lon],
                    felt: clicked
                });
                alert('성공적으로 제출되었습니다. 참여해주셔서 고맙습니다.')
                setTimeout(function () {
                    window.location.replace("http://" + window.location.hostname + ((location.port == "" || location.port == undefined) ? "" : ":" + location.port) + "/index.html");
                }, 1000);
            }catch(error){
                alert('오류가 발생했습니다. 다시 시도해주세요.')
            }
        }
    }
});
