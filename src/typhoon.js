var xhr = new XMLHttpRequest();
function getToday() {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + month + day;
}
// var map = L.map('map').setView([30, 137], 4);
var ping = L.icon({
    iconUrl: 'https://s.yimg.jp/images/weather/typhoon/ico_typhoon-white.png',
    iconSize: [15, 15]
})
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/" target="_blank">OpenStreetMap</a>, <a href="https://www.weather.go.kr/" target="_blank">대한민국 기상청</a>',
    maxZoom: 10,
}).addTo(map);
function direction(dir) {
    if (dir == 'N') {
        dir = "북"
    } else if (dir == 'NNE') {
        dir = "북북동"
    } else if (dir == 'NE') {
        dir = "북동"
    } else if (dir == 'ENE') {
        dir = "동북동"
    } else if (dir == 'E') {
        dir = "동"
    } else if (dir == "ESE") {
        dir = "동남동"
    } else if (dir == "SE") {
        dir = "남동"
    } else if (dir == "SSE") {
        dir = '남남동'
    } else if (dir == 'S') {
        dir = '남'
    } else if (dir == 'SSW') {
        dir = '남남서'
    } else if (dir == 'SW') {
        dir = '남서'
    } else if (dir == 'WSW') {
        dir = '서남서'
    } else if (dir == 'W') {
        dir = '서'
    } else if (dir == 'WNW') {
        dir = '서북서'
    } else if (dir == 'NW') {
        dir = '북서'
    } else if (dir == 'NNW') {
        dir = '북북서'
    } else {
        dir = '정의되지 않음'
    }
    return dir
}
function typStrength(wind) {
    var strength
    if (wind >= 54) {
        strength = "초강력"
    } else if (wind >= 45) {
        strength = "매우강"
    } else if (wind >= 33) {
        strength = "강"
    } else if (wind >= 25) {
        strength = "중"
    } else {
        strength = "--"
    }
    return strength
}
function typSize(wind) {
    var size
    if (wind >= 800) {
        size = '초대형';
    } else if (wind >= 500) {
        size = '대형'
    } else if (wind >= 300) {
        size = '중형'
    } else if (wind < 300) {
        size = null
    }
    return size
}
function sizeColor(size) {
    var tag = document.getElementById('typhoon_size')
    if (size == '초대형') {
        tag.style = 'background-color:purple; color:white;border-color:purple'
    } else if (size == '대형') {
        tag.style = 'background-color:red; color:white;border-color:red'
    } else if (size == '중형') {
        tag.style = 'background-color:yellow; color:black; border-color:yellow'
    } else if (size == '소형') {
    }
}
function strengthColor(strength) {
    var tag = document.getElementById('typhoon_strength')
    if (strength == "초강력") {
        tag.style = 'background-color:purple; color:white;border-color:purple'
    } else if (strength == "매우강") {
        tag.style = 'background-color:red; color:white;border-color:red'
    } else if (strength == "강") {
        tag.style = 'background-color:orange; color:black; border-color:orange'
    } else if (strength == "중") {
        tag.style = 'background-color:yellow; color:black; border-color:yellow'
    }
}
var url = 'https://apis.data.go.kr/1360000/TyphoonInfoService/getTyphoonInfoList'; /*URL*/
var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'cl5s8i4yp76CKdNIDbn0RZDOYdzjAgzPaTtbVMDqnKWHomjjBtq%2BmajQpYggkXVlfj4FY2x304%2FuTVIm1DilIw%3D%3D'; /*Service Key*/
var latlon = []
var plz = []
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /*데이터 타입 - JSON*/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /*데이터 타입 - JSON*/
queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /*데이터 타입 - JSON*/
queryParams += '&' + encodeURIComponent('tmFc') + '=' + encodeURIComponent(getToday()); /*조회 끝 날짜 - 오늘*/
xhr.open('GET', url + queryParams);
console.log(url + queryParams)
xhr.open('GET', url + queryParams);
xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
        try {
            var data = JSON.parse(this.responseText);
        } catch (error) {

        }
        data = data.response.body.items.item
        // console.log(data)
        const uniqueTyphoonSeqSet = new Set();
        const num = [];
        const time = [];

        data.forEach(item => {
            if (!uniqueTyphoonSeqSet.has(item.typhoonSeq)) {
                uniqueTyphoonSeqSet.add(item.typhoonSeq);
                num.push(item.typhoonSeq);
                time.push(item.announceTime)
            }
        });
        // console.log(time)
        console.log(time.length)
        for (var i = 0; i < num.length; i++) {
            var line = [];
            var now_url = 'https://apis.data.go.kr/1360000/TyphoonInfoService/getTyphoonInfo'; /*URL*/
            var now_queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'cl5s8i4yp76CKdNIDbn0RZDOYdzjAgzPaTtbVMDqnKWHomjjBtq%2BmajQpYggkXVlfj4FY2x304%2FuTVIm1DilIw%3D%3D'; /*Service Key*/
            now_queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /*페이지 번호 조회*/
            now_queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('30'); /*행 수*/
            now_queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /*데이터 타입 - JSON*/
            var now = new Date();
            var twoago = new Date(now.setDate(now.getDate() - 3));
            // console.log(twoago)
            twoago = twoago.toString()
            twoago_month = twoago.slice(4, 7)
            if (twoago_month == 'Jan') {
                twoago_month = '01'
            } else if (twoago_month == 'Feb') {
                twoago_month = '02'
            } else if (twoago_month == 'Mar') {
                twoago_month = '03'
            } else if (twoago_month == 'Apr') {
                twoago_month = '04'
            } else if (twoago_month == 'May') {
                twoago_month = '05'
            } else if (twoago_month == 'Jun') {
                twoago_month = '06'
            } else if (twoago_month == 'Jul') {
                twoago_month = '07'
            } else if (twoago_month == 'Aug') {
                twoago_month = '08'
            } else if (twoago_month == 'Sep') {
                twoago_month = '09'
            } else if (twoago_month == 'Oct') {
                twoago_month = '10'
            } else if (twoago_month == 'Nov') {
                twoago_month = '11'
            } else if (twoago_month == 'Dec') {
                twoago_month = '12'
            }
            twoago_date = twoago.slice(8, 10)
            twoago_year = twoago.slice(11, 15)
            // console.log(twoago_month)
            // console.log(twoago_date)
            // console.log(twoago_year)
            now_queryParams += '&' + encodeURIComponent('fromTmFc') + '=' + encodeURIComponent(twoago_year + twoago_month + twoago_date); /*조회 시작 날짜 - 오늘*/
            now_queryParams += '&' + encodeURIComponent('toTmFc') + '=' + encodeURIComponent(getToday()); /*조회 끝 날짜 - 오늘*/
            xhr.open('GET', now_url + now_queryParams);
            var api_url = now_url + now_queryParams;
            console.log(api_url)
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    try {
                        myObj = JSON.parse(this.responseText);
                    } catch (error) {

                    }
                    console.log(i)
                    myObj = myObj.response.body.items.item[0]
                    console.log(myObj)
                    // console.log(myObj)
                    // 현재 폭풍반경
                    var line_b = [String(myObj.typLat), String(myObj.typLon)];
                    // line.push(line_b)
                    myObj.typTm = (myObj.typTm).toString()
                    L.circle([myObj.typLat, myObj.typLon], {
                        color: 'red',
                        fillColor: 'rgba(255, 0, 0, 0.5)',
                        fillOpacity: 0.5,
                        radius: (myObj.typ25) * 1000,
                        weight: 2
                    }).addTo(map);
                    //현재 강풍반경
                    var now = L.circle([myObj.typLat, myObj.typLon], {
                        color: 'yellow',
                        fillColor: 'rgba(255, 255, 0, 0.5)',
                        fillOpacity: 0.5,
                        radius: (myObj.typ15) * 1000,
                        weight: 2
                    }).addTo(map);
                    // now.on('mouseover', function (e) {
                    //     this.bindPopup(`${(myObj.typTm).slice(6, 8)}일 ${(myObj.typTm).slice(8, 10)}시 ${(myObj.typTm).slice(10, 12)}분 실황<br>중심기압: ${myObj.typPs}hPa<br>최대풍속: ${myObj.typWs}m/s<br>강도: ${typStrength(myObj.typWs)}<br>진행: ${direction(myObj.typDir)}, ${myObj.typSp}km/h`, {
                    //         offset: [0, 0]
                    //     })
                    //     this.openPopup()
                    // });
                    // now.on('mouseout', function (e) {
                    //     this.closePopup()
                    // });
                    L.marker([myObj.typLat, myObj.typLon], { icon: ping }).addTo(map)
                    var customIcon = L.divIcon({
                        className: 'custom-icon',
                        html: `<div class="text-label" style="width:200px">제 ${myObj.typSeq}호 태풍 '${myObj.typName}'</div>`
                    });
                    L.marker([myObj.typLat - 1, myObj.typLon + 1], { icon: customIcon }).addTo(map);

                    const container = document.getElementById('typhoon_box');
                    const divElement = document.createElement('div');
                    divElement.className = 'typhoon';

                    const typhoon_title = document.createElement('div');
                    typhoon_title.className = 'typhoon_title';

                    const title = document.createElement('p');
                    title.textContent = `태풍 제${myObj.typSeq}호 "${myObj.typName}"`;
                    title.className = 'typhoon_name';
                    typhoon_title.appendChild(title);
                    const time = document.createElement('p');
                    time.textContent = `${(myObj.tmFc).slice(4, 6)}월 ${(myObj.tmFc).slice(6, 8)}일 ${(myObj.tmFc).slice(8, 10)}시 ${(myObj.tmFc).slice(10, 12)}분 발표`;
                    time.className = 'typhoon_time'
                    typhoon_title.appendChild(time)
                    divElement.appendChild(typhoon_title);

                    const typhoon_info = document.createElement('div');
                    typhoon_info.className = 'typhoon_info';

                    const typhoon_str = document.createElement('div');
                    typhoon_str.className = 'typhoon_str';
                    //세기 크기
                    var nowSize = typSize(myObj.typ15);
                    var nowStr = typStrength(myObj.typWs);
                    if (nowSize != '소형') {
                        const typhoon_size = document.createElement('p');
                        typhoon_size.className = 'typhoon_size';
                        typhoon_size.setAttribute('id', 'typhoon_size')
                        typhoon_size.textContent = nowSize;
                        typhoon_str.appendChild(typhoon_size);
                    }
                    if (nowStr != null) {
                        const typhoon_strength = document.createElement('p');
                        typhoon_strength.className = 'typhoon_strength'
                        typhoon_strength.textContent = nowStr;
                        typhoon_strength.setAttribute('id', 'typhoon_strength')
                        typhoon_str.appendChild(typhoon_strength);
                    }
                    divElement.appendChild(typhoon_str);

                    const typhoon_sum = document.createElement('p');
                    typhoon_sum.className = 'typhoon_sum';
                    typhoon_sum.textContent = myObj.typLoc + "에서 " + direction(myObj.typDir) + "쪽을 향해 " + myObj.typSp + "km/h의 속도로 이동중.";
                    divElement.appendChild(typhoon_sum)

                    const typhoon_cell = document.createElement('div');
                    typhoon_cell.className = 'typhoon_cell';

                    const hpa = document.createElement('div');
                    hpa.className = 'typhpabox'
                    const hpa1 = document.createElement('p');
                    hpa1.textContent = '기압';
                    hpa.appendChild(hpa1);
                    const hpa2 = document.createElement('p');
                    hpa2.textContent = myObj.typPs + 'hPa'
                    hpa.appendChild(hpa2);


                    const wind = document.createElement('div');
                    wind.className = 'typhpabox'
                    const wind1 = document.createElement('p');
                    wind1.textContent = '최대풍속';
                    wind.appendChild(wind1);
                    const wind2 = document.createElement('p');
                    wind2.textContent = myObj.typWs + 'm/s'
                    wind.appendChild(wind2)

                    typhoon_cell.appendChild(hpa)
                    typhoon_cell.appendChild(wind)

                    divElement.appendChild(typhoon_cell)
                    container.append(divElement)
                    if (nowSize != '소형') {
                        sizeColor(nowSize);
                    }
                    if (nowStr != null) {
                        strengthColor(nowStr);
                    }
                }
            };

            xmlhttp.open("GET", api_url, true);
            xmlhttp.send();

            var info_xhr = new XMLHttpRequest();
            var info_url = 'https://apis.data.go.kr/1360000/TyphoonInfoService/getTyphoonFcst'; /*URL*/
            var info_queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'cl5s8i4yp76CKdNIDbn0RZDOYdzjAgzPaTtbVMDqnKWHomjjBtq%2BmajQpYggkXVlfj4FY2x304%2FuTVIm1DilIw%3D%3D'; /*Service Key*/
            info_queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /*데이터 타입 - JSON*/
            info_queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /*데이터 타입 - JSON*/
            info_queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /*데이터 타입 - JSON*/
            info_queryParams += '&' + encodeURIComponent('tmFc') + '=' + encodeURIComponent(time[i]); /*조회 끝 날짜 - 오늘*/
            info_queryParams += '&' + encodeURIComponent('typSeq') + '=' + encodeURIComponent(num[i]); /*조회 끝 날짜 - 오늘*/
            info_xhr.open('GET', info_url + info_queryParams);
            // console.log(info_url + info_queryParams)
            info_xhr.open('GET', info_url + info_queryParams);
            info_xhr.onreadystatechange = function () {
                if (this.readyState == 4) {
                    try {
                        var jsonData = JSON.parse(this.responseText);
                    } catch (error) {

                    }
                    // console.log(jsonData.response.body.items.item)
                    var asdf = jsonData.response.body.items.item;
                    asdf = asdf.slice().reverse();
                    // console.log(asdf)
                    asdf.forEach(asdf => {
                        if(asdf.rad25 != '0'){
                            var rad = Number(asdf.rad25) + Number(asdf.radPr)
                            const red_circle = L.circle([asdf.lat, asdf.lon], {
                                color: 'red',
                                fillOpacity: 0,
                                weight:1,
                                radius: rad* 1000 // 원의 반지름 설정 (단위: 미터)
                            }).addTo(map);
                        }
                    })
                    asdf.forEach(asdf => {
                        // 원 생성
                        const circle = L.circle([asdf.lat, asdf.lon], {
                            color: 'white',
                            fillOpacity: 0.2,
                            dashArray: '10, 10',
                            dashOffset: '0',
                            radius: asdf.radPr * 1000 // 원의 반지름 설정 (단위: 미터)
                        }).addTo(map);
                        L.marker([asdf.lat, asdf.lon], { icon: ping }).addTo(map);
                        // 마커 생성 (기본적으로 숨김 처리)
                        const marker = L.marker([asdf.lat, asdf.lon], {
                            opacity: 0,
                            title: '마커가 뜨는 위치' // 마커에 표시할 제목 설정
                        }).addTo(map);

                        // 마우스 이벤트 처리
                        // circle.on('mouseover', function () {
                        //     this.bindPopup(`${(asdf.tm).slice(6,8)}일 ${(asdf.tm).slice(8,10)}시 ${(asdf.tm).slice(10,12)}분 예상<br>중심기압: ${asdf.ps}hPa<br>최대풍속: ${asdf.ws}m/s<br>강도: ${typStrength(asdf.ws)}<br>진행: ${asdf.dir}, ${asdf.sp}km/h`, {
                        //         offset: [0, 0]
                        //     })
                        //     this.openPopup();
                        // });

                        // circle.on('mouseout', function () {
                        //     this.closePopup()
                        // });
                        var line_b = [asdf.lat, asdf.lon]
                        line.push(line_b)
                    });
                    // console.log(line)
                    const polyline = L.polyline(line, {
                        color: 'black',
                        weight: 2,
                        opacity: 0.7,
                        lineJoin: 'round'
                    }).addTo(map);
                }

            }
            info_xhr.send('');
        }
    }
}
xhr.send('');