
// try {
//     // $.getJSON('./test.json', function(data) {
//     $.getJSON('https://drsmain.github.io/news.json', function (data) {
//         var news_box = $(".news");

//         const title = data['title'];
//         const content = data['content'];
//         const importance = data['importance'];
//         var validTime = data['validtime'];
//         var now_time = new Date();
//         const date1 = new Date(validTime);
//         const date2 = new Date(now_time);

//         // 두 시간 간의 차이 계산 (밀리초 단위)
//         const timeDifference = date1.getTime() - date2.getTime();

//         switch (importance) {
//             case '1':
//                 news_box.css({
//                     backgroundColor: 'blue',
//                     color: 'white'
//                 });
//                 break;
//             case '2':
//                 news_box.css({
//                     backgroundColor: 'yellow',
//                     color: 'black'
//                 });
//                 break;
//             case '3':
//                 news_box.css({
//                     backgroundColor: 'red',
//                     color: 'white'
//                 });
//                 break;
//             case '4':
//                 news_box.css({
//                     backgroundColor: 'purple',
//                     color: 'white'
//                 });
//                 break;
//             case '5':
//                 news_box.css({
//                     backgroundColor: 'black',
//                     color: 'white'
//                 });
//                 break;
//             default:
//                 news_box.css({
//                     backgroundColor: 'white',
//                     color: 'black'
//                 });
//                 break;
//         }

//         if (timeDifference > 0) {
//             console.log('띄움');
//             document.getElementById('news_title').textContent = title;
//             document.getElementById('news_content').textContent = content;
//             document.getElementById('news').style= 'display: block'
//         } else {
//             console.log("안띄움");
//         }
//         console.log()
//     })
// } catch (error) {
//     console.log(`에러 발생:${error}`);
// }
// document.getElementById('news').addEventListener('click', function(){
//     this.style = 'display:none;'
// })