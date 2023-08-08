var map
var xhr = new XMLHttpRequest();
function getToday() {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + month + day;
}

var nowDate = new Date();
// console.log(nowDate)
function convertToDateTime(timestamp) {
    var year = timestamp.slice(0, 4);
    var month = timestamp.slice(4, 6);
    var day = timestamp.slice(6, 8);
    var hour = timestamp.slice(8, 10);
    var minute = timestamp.slice(10, 12);
    var second = timestamp.slice(12, 14);

    var dateTimeString = year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second;
    var dateTime = new Date(dateTimeString);

    return dateTime;
}
function getTime(time) {
    time = String(time);
    var year = time.slice(0, 4);
    var month = time.slice(4, 6);
    var date = time.slice(6, 8);
    var hour = time.slice(8, 10);
    var minute = time.slice(10, 12);
    var sec = time.slice(12, 14);

    return `${month}월 ${date}일 ${hour}시 ${minute}분 ${sec}초`
}
function getIntColor(color) {
    var style
    if (color == 'Ⅰ') {
        style = 'background-color:white; color:black;'
    } else if (color == 'Ⅱ') {
        style = 'background-color:#a0e6ff; color:black;';
    } else if (color == 'Ⅲ') {
        style = 'background-color:#92d050; color:black;';
    } else if (color == 'Ⅳ') {
        style = 'background-color:#ffff00; color:black;';
    } else if (color == 'Ⅴ') {
        style = 'background-color:#ffc000; color:black;';
    } else if (color == 'Ⅵ') {
        style = 'background-color:#ff0000; color:white;';
    } else if (color == 'Ⅶ') {
        style = 'background-color:#a32777; color:white;';
    } else if (color == 'Ⅷ') {
        style = 'background-color:#632523; color:white;';
    } else if (color == 'Ⅸ') {
        style = 'background-color:#4c2600; color:white';
    } else if (color == 'Ⅹ') {
        style = 'background-color:#000; color:white;';
    } else {
        style = 'background-color:#fff'
    }
    return style
}
var earthquake_json = {
    "response": {
        "header": {
            "resultCode": "00",
            "resultMsg": "NORMAL_SERVICE"
        },
        "body": {
            "dataType": "JSON",
            "items": {
                "item": [
                    // {
                    //     "cnt": 1,
                    //     "fcTp": 3,
                    //     "img": "http://www.weather.go.kr/w/repositary/image/eqk/img/eqk_img_3_20230729190759.png",
                    //     "inT": "최대진도 Ⅴ(전북),Ⅲ(경남,충남,충북),Ⅱ(경북,광주,대전,전남)",
                    //     "lat": 35.8,
                    //     "loc": "전북 장수군 북쪽 17km 지역",
                    //     "lon": 127.53,
                    //     "mt": 3.5,
                    //     "rem": "위의 정보는 2023년 7월 29일 19시 08분에 발표한 지진속보를 수동으로 분석한 상세정보임.\n향후, 여진 등에 대한 정보를 참고하시기 바람.\n지진 발생 인근 지역은 지진동을 느낄 수 있음. 안전에 유의하기 바람.",
                    //     "stnId": 108,
                    //     "tmEqk": 20230729190759,
                    //     "tmFc": 202307291913,
                    //     "tmSeq": 772,
                    //     "dep": 6
                    // },
                    {
                        "cnt": 1,
                        "fcTp": 14,
                        "img": "http://www.weather.go.kr/w/repositary/image/eqk/img/eqk_img_14_20230729190759.png",
                        "inT": "최대진도 Ⅴ(전북),Ⅳ(경남),Ⅲ(경북,대전,전남,충남,충북)",
                        "lat": 35.81,
                        "loc": "전북 장수군 북쪽 18km 지역",
                        "lon": 127.53,
                        "mt": 4.1,
                        "rem": "위 정보는 이동속도가 빠른 지진파(P파)만을 이용하여 자동 추정한 정보임.\n수동으로 분석한 정보는 지진정보로 추가 발표할 예정임",
                        "stnId": 108,
                        "tmEqk": 20230729233400,
                        "tmFc": 202307291908,
                        "tmSeq": 771,
                        "dep": 0
                    },
                    {
                        "cnt": 1,
                        "fcTp": 3,
                        "img": "http://www.weather.go.kr/w/repositary/image/eqk/img/eqk_img_3_20230728131643.png",
                        "inT": "최대진도 Ⅰ",
                        "lat": 41.31,
                        "loc": "북한 함경북도 길주 북북서쪽 40km 지역",
                        "lon": 129.23,
                        "mt": 2.0,
                        "rem": "자연지진으로 분석됨",
                        "stnId": 108,
                        "tmEqk": 20230728131643,
                        "tmFc": 202307281405,
                        "tmSeq": 768,
                        "dep": 17
                    },
                    {
                        "cnt": 1,
                        "fcTp": 2,
                        "img": "http://www.weather.go.kr/w/repositary/image/eqk/img/eqk_img_2_20230726214435.png",
                        "inT": "",
                        "lat": -14.76,
                        "loc": "바누아투 포트 올리 동북동쪽 95km 해역",
                        "lon": 167.91,
                        "mt": 6.4,
                        "rem": "국내영향없음. 위 자료는 미지질조사소(USGS) 분석결과임.",
                        "stnId": 108,
                        "tmEqk": 20230726214435,
                        "tmFc": 202307262201,
                        "tmSeq": 763,
                        "dep": 10
                    },
                    {
                        "cnt": 1,
                        "fcTp": 2,
                        "img": "http://www.weather.go.kr/w/repositary/image/eqk/img/eqk_img_2_20230726213700.png",
                        "inT": "",
                        "lat": 36.5,
                        "loc": "일본 시마네현(혼슈) 마쓰에 북북서쪽 119km 해역",
                        "lon": 132.7,
                        "mt": 4.5,
                        "rem": "국내 일부지역에서 지진동을 느낄수 있음.\n위 자료는 일본기상청(JMA) 분석결과임.",
                        "stnId": 108,
                        "tmEqk": 20230726213700,
                        "tmFc": 202307262148,
                        "tmSeq": 762,
                        "dep": 10
                    }
                ]
            },
            "pageNo": 1,
            "numOfRows": 10,
            "totalCount": 5
        }
    }
}
var epicenter = L.icon({
    iconUrl: './resource/epicenter.png',
    iconSize: [40, 40]
})
var url = 'https://apis.data.go.kr/1360000/EqkInfoService/getEqkMsg';
var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + '0hO9hpRaVBeHuTdSkSQ6hs8zwl5jvUqp4gV79zOFDdsNmmNfM5BNLORt9IwWv9YVODW9cWBK0hjzdlXzaqktUQ=='; /*Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
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
queryParams += '&' + encodeURIComponent('fromTmFc') + '=' + encodeURIComponent(twoago_year + twoago_month + twoago_date); /**/
queryParams += '&' + encodeURIComponent('toTmFc') + '=' + encodeURIComponent(getToday()); /**/
xhr.open('GET', url + queryParams);
function animateCircle(circle, speed, prevTimestamp) {
    function animate(timestamp) {
        var radius = circle.getRadius();
        radius += speed * (timestamp - prevTimestamp) / 1000; // 초당 speed km씩 증가

        circle.setRadius(radius);

        prevTimestamp = timestamp;
        requestAnimationFrame(animate);
    }

    requestAnimationFrame(function (timestamp) {
        animate(timestamp);
    });
}
xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
        // console.log(url + queryParams)
        try {
            var myObj = JSON.parse(this.responseText);
            // var myObj = earthquake_json;
        } catch (error) {
            document.getElementById('quake_title').textContent = "예상치 못한 오류가 발생했습니다."
        }
        if (myObj.response.header.resultCode == '00') {
            var earthquakes = []
            var json = myObj.response.body.items.item;
            const eew_container = document.getElementById('occuring_earthquake');
            const info_container = document.getElementById('recent_earthquake')
            for (i = 0; i < json.length; i++) {
                if (json[i].fcTp != 2) {
                    earthquakes.push(json[i])
                }
            }
            if (earthquakes.length == 0) {
                const divElement = document.createElement('div');
                const empty = document.createElement('p');
                empty.textContent = '지진정보가 없습니다.'
                empty.className = 'earthquake_empty'
                divElement.appendChild(empty)

                info_container.appendChild(divElement)
            } else {
                for (i = 0; i < earthquakes.length; i++) {
                    if (earthquakes[i].fcTp == 3 || earthquakes[i].fcTp == 5) {
                        //지진정보 || 지진정보 재통보
                        var epi_marker = L.marker([earthquakes[i].lat, earthquakes[i].lon], { icon: epicenter }).addTo(map);
                        var customIcon = L.divIcon({
                            className: 'custom-icon',
                            html: `<div class="text-label" style="width:200px">${earthquakes[i].loc}</div>`
                        });
                        L.marker([earthquakes[i].lat, earthquakes[i].lon + 0.02], { icon: customIcon }).addTo(map);
                        const divElement = document.createElement('div');
                        divElement.className = 'earthquake_info';

                        const title = document.createElement('h3');
                        title.textContent = '지진정보'
                        divElement.appendChild(title)

                        const time = document.createElement('p');
                        time.textContent = getTime(earthquakes[i].tmEqk)
                        time.className = 'earthquake_time';
                        divElement.appendChild(time)

                        const location = document.createElement('p');
                        location.textContent = earthquakes[i].loc
                        location.className = 'earthquake_location';
                        divElement.appendChild(location)

                        const magint = document.createElement('div');
                        const magnitude = document.createElement('h4');
                        magnitude.textContent = '규모 ' + earthquakes[i].mt;
                        magint.appendChild(magnitude)
                        const maxint = document.createElement('h4');
                        maxint.textContent = (earthquakes[i].inT).slice(0, 6);
                        maxint.style = getIntColor((earthquakes[i].inT).slice(5, 6))
                        magint.appendChild(maxint)
                        divElement.appendChild(magint)

                        const int = document.createElement('p')
                        int.textContent = earthquakes[i].inT
                        divElement.appendChild(int)

                        const rem = document.createElement('p')
                        rem.textContent = earthquakes[i].rem
                        divElement.appendChild(rem)

                        info_container.append(divElement)

                    } else if (earthquakes[i].fcTp == 11 || earthquakes[i].fcTp == 12) {
                        //지진조기경보 || 국외지진 조기경보
                        if (nowDate - convertToDateTime((earthquakes[i].tmEqk).toString()) < 240000) {
                            epi_marker = L.marker([earthquakes[i].lat, earthquakes[i].lon], { icon: epicenter }).addTo(map)
                            var p_circle = L.circle([earthquakes[i].lat, earthquakes[i].lon], {
                                color: 'blue',
                                fillOpacity: 0.1,
                                radius: (nowDate - convertToDateTime((earthquakes[i].tmEqk).toString())) * 6
                            }).addTo(map);
                            var s_circle = L.circle([earthquakes[i].lat, earthquakes[i].lon], {
                                color: 'red',
                                fillOpacity: 0.1,
                                radius: (nowDate - convertToDateTime((earthquakes[i].tmEqk).toString())) * 3
                            }).addTo(map);
                            animateCircle(p_circle, 6000, performance.now()); // 초당 6km 속도
                            animateCircle(s_circle, 3000, performance.now()); // 초당 3km 속도

                            const divElement = document.createElement('div');
                            divElement.className = 'earthquake_eew';
                            const title = document.createElement('h2');
                            title.textContent = `지진조기경보`;
                            title.className = 'earthquake_eew_title'
                            divElement.appendChild(title)

                            const time = document.createElement('p');
                            time.textContent = getTime(earthquakes[i].tmEqk)
                            time.className = 'earthquake_time';
                            divElement.appendChild(time)

                            const location = document.createElement('p');
                            location.textContent = earthquakes[i].loc
                            location.className = 'earthquake_location';
                            divElement.appendChild(location)

                            const magint = document.createElement('div');
                            const magnitude = document.createElement('h4');
                            magnitude.textContent = '규모 ' + earthquakes[i].mt;
                            magint.appendChild(magnitude)
                            const maxint = document.createElement('h4');
                            maxint.textContent = (earthquakes[i].inT).slice(0, 6);
                            maxint.style = getIntColor((earthquakes[i].inT).slice(5, 6))
                            magint.appendChild(maxint)
                            divElement.appendChild(magint)

                            const int = document.createElement('p')
                            int.textContent = earthquakes[i].inT
                            divElement.appendChild(int)

                            const rem = document.createElement('p')
                            rem.textContent = earthquakes[i].rem
                            divElement.appendChild(rem)

                            var text
                            if ((earthquakes[i].loc).includes('지역')) {
                                if (earthquakes[i].mt >= 6) {
                                    L.circle([earthquakes[i].lat, earthquakes[i].lon], {
                                        color: 'purple',
                                        fillOpacity: 0.1,
                                        radius: 500000
                                    }).addTo(map);
                                    text = '[위급] 전국 발송'
                                } else if (earthquakes[i].mt >= 4) {
                                    L.circle([earthquakes[i].lat, earthquakes[i].lon], {
                                        color: 'purple',
                                        fillOpacity: 0.1,
                                        radius: 500000
                                    }).addTo(map);
                                    text = '[긴급] 전국 발송'
                                } else if (earthquakes[i].mt >= 3.5) {
                                    L.circle([earthquakes[i].lat, earthquakes[i].lon], {
                                        color: 'purple',
                                        fillOpacity: 0.1,
                                        radius: 80000
                                    }).addTo(map);
                                    text = '[긴급] 발생위치로부터 80km'
                                } else if (earthquakes[i].mt >= 3.0) {
                                    L.circle([earthquakes[i].lat, earthquakes[i].lon], {
                                        color: 'purple',
                                        fillOpacity: 0.1,
                                        radius: 50000
                                    }).addTo(map);
                                    text = '[안전] 발생위치로부터 50km'
                                } else {
                                    text = ''
                                }
                            } else if ((earthquakes[i].loc).includes('해역')) {
                                if (earthquakes[i].mt >= 6) {
                                    L.circle([earthquakes[i].lat, earthquakes[i].lon], {
                                        color: 'purple',
                                        fillOpacity: 0.1,
                                        radius: 500000
                                    }).addTo(map);
                                    text = '[위급] 전국 발송'
                                } else if (earthquakes[i].mt >= 4.5) {
                                    L.circle([earthquakes[i].lat, earthquakes[i].lon], {
                                        color: 'purple',
                                        fillOpacity: 0.1,
                                        radius: 500000
                                    }).addTo(map);
                                    text = '[긴급] 전국 발송'
                                } else if (earthquakes[i].mt >= 4) {
                                    L.circle([earthquakes[i].lat, earthquakes[i].lon], {
                                        color: 'purple',
                                        fillOpacity: 0.1,
                                        radius: 80000
                                    }).addTo(map);
                                    text = '[긴급] 발생위치로부터 80km'
                                } else if (earthquakes[i].mt >= 3.5) {
                                    L.circle([earthquakes[i].lat, earthquakes[i].lon], {
                                        color: 'purple',
                                        fillOpacity: 0.1,
                                        radius: 50000
                                    }).addTo(map);
                                    text = '[안전] 발생위치로부터 50km'
                                } else {
                                    text = ''
                                }
                            }

                            const message = document.createElement('p')
                            message.textContent = '재난문자 발송 범위: ' + text;
                            divElement.appendChild(message)
                            eew_container.appendChild(divElement);
                        }
                    } else if (earthquakes[i].fcTp == 13) {
                        //조기경보 정밀분석
                        // ㅁ?ㄹ
                    } else if (earthquakes[i].fcTp == 14) {
                        //지진속보
                        if (nowDate - convertToDateTime((earthquakes[i].tmEqk).toString()) < 240000) {
                            epi_marker = L.marker([earthquakes[i].lat, earthquakes[i].lon], { icon: epicenter }).addTo(map)
                            var p_circle = L.circle([earthquakes[i].lat, earthquakes[i].lon], {
                                color: 'blue',
                                fillOpacity: 0.1,
                                radius: (nowDate - convertToDateTime((earthquakes[i].tmEqk).toString())) * 6
                            }).addTo(map);
                            var s_circle = L.circle([earthquakes[i].lat, earthquakes[i].lon], {
                                color: 'red',
                                fillOpacity: 0.1,
                                radius: (nowDate - convertToDateTime((earthquakes[i].tmEqk).toString())) * 3
                            }).addTo(map);
                            animateCircle(p_circle, 6000, performance.now()); // 초당 6km 속도
                            animateCircle(s_circle, 3000, performance.now()); // 초당 3km 속도

                            const divElement = document.createElement('div');
                            divElement.className = 'earthquake_sokbo';
                            const title = document.createElement('h2');
                            title.textContent = `지진속보`;
                            title.className = 'earthquake_sokbo_title'
                            divElement.appendChild(title)

                            const time = document.createElement('p');
                            time.textContent = getTime(earthquakes[i].tmEqk)
                            time.className = 'earthquake_time';
                            divElement.appendChild(time)

                            const location = document.createElement('p');
                            location.textContent = earthquakes[i].loc
                            location.className = 'earthquake_location';
                            divElement.appendChild(location)

                            const magint = document.createElement('div');
                            const magnitude = document.createElement('h4');
                            magnitude.textContent = '규모 ' + earthquakes[i].mt;
                            magint.appendChild(magnitude)
                            const maxint = document.createElement('h4');
                            maxint.textContent = (earthquakes[i].inT).slice(0, 6);
                            maxint.style = getIntColor((earthquakes[i].inT).slice(5, 6))
                            magint.appendChild(maxint)
                            divElement.appendChild(magint)

                            const int = document.createElement('p')
                            int.textContent = earthquakes[i].inT
                            divElement.appendChild(int)

                            const rem = document.createElement('p')
                            rem.textContent = earthquakes[i].rem
                            divElement.appendChild(rem)

                            var text
                            if ((earthquakes[i].loc).includes('지역')) {
                                if (earthquakes[i].mt >= 6) {
                                    L.circle([earthquakes[i].lat, earthquakes[i].lon], {
                                        color: 'purple',
                                        fillOpacity: 0.1,
                                        radius: 500000
                                    }).addTo(map);
                                    text = '[위급] 전국 발송'
                                } else if (earthquakes[i].mt >= 4) {
                                    L.circle([earthquakes[i].lat, earthquakes[i].lon], {
                                        color: 'purple',
                                        fillOpacity: 0.1,
                                        radius: 500000
                                    }).addTo(map);
                                    text = '[긴급] 전국 발송'
                                } else if (earthquakes[i].mt >= 3.5) {
                                    L.circle([earthquakes[i].lat, earthquakes[i].lon], {
                                        color: 'purple',
                                        fillOpacity: 0.1,
                                        radius: 80000
                                    }).addTo(map);
                                    text = '[긴급] 발생위치로부터 80km'
                                } else if (earthquakes[i].mt >= 3.0) {
                                    L.circle([earthquakes[i].lat, earthquakes[i].lon], {
                                        color: 'purple',
                                        fillOpacity: 0.1,
                                        radius: 50000
                                    }).addTo(map);
                                    text = '[안전] 발생위치로부터 50km'
                                } else {
                                    text = ''
                                }
                            } else if ((earthquakes[i].loc).includes('해역')) {
                                if (earthquakes[i].mt >= 6) {
                                    L.circle([earthquakes[i].lat, earthquakes[i].lon], {
                                        color: 'purple',
                                        fillOpacity: 0.1,
                                        radius: 500000
                                    }).addTo(map);
                                    text = '[위급] 전국 발송'
                                } else if (earthquakes[i].mt >= 4.5) {
                                    L.circle([earthquakes[i].lat, earthquakes[i].lon], {
                                        color: 'purple',
                                        fillOpacity: 0.1,
                                        radius: 500000
                                    }).addTo(map);
                                    text = '[긴급] 전국 발송'
                                } else if (earthquakes[i].mt >= 4) {
                                    L.circle([earthquakes[i].lat, earthquakes[i].lon], {
                                        color: 'purple',
                                        fillOpacity: 0.1,
                                        radius: 80000
                                    }).addTo(map);
                                    text = '[긴급] 발생위치로부터 80km'
                                } else if (earthquakes[i].mt >= 3.5) {
                                    L.circle([earthquakes[i].lat, earthquakes[i].lon], {
                                        color: 'purple',
                                        fillOpacity: 0.1,
                                        radius: 50000
                                    }).addTo(map);
                                    text = '[안전] 발생위치로부터 50km'
                                } else {
                                    text = ''
                                }
                            }

                            const message = document.createElement('p')
                            message.textContent = '재난문자 발송 범위: ' + text;
                            divElement.appendChild(message)
                            eew_container.appendChild(divElement);
                        }
                    }
                }
            }
        }
    }
}
xhr.send('');