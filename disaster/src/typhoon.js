var xhr = new XMLHttpRequest();
function getToday() {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + month + day;
}

function dir(typ_dir){
    var direc
    if (typ_dir == 'N') {
        direc = "북"
    } else if (typ_dir == 'NNE') {
        direc = "북북동"
    } else if (typ_dir == 'NE') {
        direc = "북동"
    } else if (typ_dir == 'ENE') {
        direc = "동북동"
    } else if (typ_dir == 'E') {
        direc = "동"
    } else if (typ_dir == "ESE") {
        direc = "동남동"
    } else if (typ_dir == "SE") {
        direc = "남동"
    } else if (typ_dir == "SSE") {
        direc = '남남동'
    } else if (typ_dir == 'S') {
        direc = '남'
    } else if (typ_dir == 'SSW') {
        direc = '남남서'
    } else if (typ_dir == 'SW') {
        direc = '남서'
    } else if (typ_dir == 'WSW') {
        direc = '서남서'
    } else if (typ_dir == 'W') {
        direc = '서'
    } else if (typ_dir == 'WNW') {
        direc = '서북서'
    } else if (typ_dir == 'NW') {
        direc = '북서'
    } else if (typ_dir == 'NNW') {
        direc = '북북서'
    } else {
        direc = '정의되지 않음'
    }
    return direc;
}
var now_url = 'https://apis.data.go.kr/1360000/TyphoonInfoService/getTyphoonInfo'; /*URL*/
var now_queryParams = '?' + encodeURIComponent('serviceKey') + '=' + '0hO9hpRaVBeHuTdSkSQ6hs8zwl5jvUqp4gV79zOFDdsNmmNfM5BNLORt9IwWv9YVODW9cWBK0hjzdlXzaqktUQ%3D%3D'; /*Service Key*/
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
// console.log(api_url)
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) { 
        var myObj
        try {
            myObj = JSON.parse(this.responseText);
        } catch (error) {

        }
        myObj = myObj.response.body.items.item
        // console.log(myObj)
        var data
        for(var i =0; i < myObj.length; i++){
            if(myObj[i].typSeq == 7){
                data = myObj[i]
                break;
            }
        }
        // console.log(data);
        document.getElementById('typhoon_img').src = data.img;
        document.getElementById('pressure').textContent = data.typPs;
        document.getElementById('max_wind').textContent = data.typWs;
        document.getElementById('explain').textContent = "제 " + data.typSeq + "호 태풍 '" + data.typName + "'은(는) " + data.typLoc + "에서 " + dir(data.typDir) + "쪽을 향해 " + data.typSp + "km/h의 속도로 이동중.";
    }
}
xmlhttp.open("GET", api_url, true);
xmlhttp.send();

var xhr = new XMLHttpRequest();
var url = 'http://apis.data.go.kr/1360000/WthrWrnInfoService/getPwnStatus'; /*URL*/
var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'cl5s8i4yp76CKdNIDbn0RZDOYdzjAgzPaTtbVMDqnKWHomjjBtq%2BmajQpYggkXVlfj4FY2x304%2FuTVIm1DilIw%3D%3D'; /*Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
xhr.open('GET', url + queryParams);
xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
        // console.log(url+queryParams)
        try {
            var issued = JSON.parse(this.responseText);
        }catch(error){

        }
        if(issued.response.header.resultCode == '00'){
            issued = issued.response.body.items.item[0]
            issued_date = issued.tmEf
            document.getElementById('issuing_date').textContent = `발효시각: ${issued_date.slice(4,6)}월 ${issued_date.slice(6,8)}일 ${issued_date.slice(8,10)}시 ${issued_date.slice(10,12)}분 이후`
            issued_content_bf = issued.t6
            var issued_content = ''
            for(i=1; i < issued_content_bf.length; i++){
                if(issued_content_bf[i] == 'o'){
                    issued_content += "\r" + issued_content_bf[i]
                }else{
                    issued_content += issued_content_bf[i]
                }
            }
            document.getElementById('issuing_area').textContent = 'o'+ issued_content;
            document.getElementById('now_issuing').src= `https://www.weather.go.kr/w/repositary/image/wrn/img/KTKO50_${issued.tmFc}_108_${issued.tmSeq}.png`
        }
    }
};xhr.send('');