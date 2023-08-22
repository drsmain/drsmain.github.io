window.onload = function() {
    // bar라는 ID를 가진 div 요소 가져오기
    var barDiv = document.getElementById("bar");
    
    // div 요소의 현재 높이를 가져와서 출력
    var divHeight = barDiv.clientHeight;
    console.log("Div의 현재 높이: " + divHeight + "px");
    document.getElementById('share').style = `margin-top: ${divHeight}px;`
};
document.addEventListener('DOMContentLoaded', function () {
    var headerHeight = document.querySelector('.header').offsetHeight;
    var shortcutLinks = document.querySelectorAll('.shortcut-link');

    // 각 링크에 대한 클릭 이벤트 처리
    shortcutLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            var targetId = link.getAttribute('data-target');
            var targetSection = document.getElementById(targetId);

            if (targetSection) {
                var targetPosition = targetSection.offsetTop;

                window.scrollTo({
                    top: targetPosition - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
});
Kakao.init('d1c248bb1c6cf0538ce48c9f4b3e29f1'); // 사용하려는 앱의 JavaScript 키 입력
Kakao.Share.createDefaultButton({
    container: '#kakaotalk-sharing-btn',
    objectType: 'feed',
    content: {
        title: document.getElementById('title').textContent,
        description: '「일상을 지키는 일상의 대비.」태풍 관련 뉴스와 기상정보 및 주의점 등을 확인할 수 있습니다.',
        imageUrl:
            'https://drsmain.github.io/resource/fab.png',
        link: {
            // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
            mobileWebUrl: 'http://drsmain.github.io/disaster/typhoon/index.html',
            webUrl: 'http://drsmain.github.io/disaster/typhoon/index.html',
        },
    },
    buttons: [
        {
            title: '바로가기',
            link: {
                mobileWebUrl: 'http://drsmain.github.io/disaster/typhoon/index.html',
                webUrl: 'http://drsmain.github.io/disaster/typhoon/index.html',
            },
        }
    ],
});
document.getElementById('twit').addEventListener("click", function(){
    var sendText = document.getElementById('title').textContent + ' 확인하기\n\n'; // 전달할 텍스트
    var sendUrl = "drsmain.github.io/disaster/typhoon/index.html"; // 전달할 URL
    window.open("https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl);
})