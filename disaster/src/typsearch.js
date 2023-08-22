var data;
$.ajax({
    method: "GET",
    url: "https://dapi.kakao.com/v2/search/vclip",
    data: { query: "카눈", sort: "play_count" },
    headers: { Authorization: 'KakaoAK dafddc4c6dac9924f6ceb7eb6a41edd9' }
})
    .done(function (msg) {
        // alert("Data Saved: " + msg);
        // console.log(msg.documents)
        data = msg.documents;
        for (var i = 0; i < data.length; i++) {

            var currentData = data[i];
            if (currentData.author == '소박사TV') {
                // console.log(currentData);
            } else {
                const container = document.getElementById('news_content');
                const divElement = document.createElement('a');
                divElement.href = currentData.url
                divElement.className = 'news_info';
                divElement.setAttribute('target', '_blank')

                const box = document.createElement('div');
                box.className = 'news_box'

                const thumbnail = document.createElement('img');
                thumbnail.className = 'news_img';
                thumbnail.src = currentData.thumbnail;
                box.appendChild(thumbnail);

                const news_content_box = document.createElement('div');
                const news_title = document.createElement('h4');
                news_title.textContent = currentData.title;
                news_content_box.appendChild(news_title);

                const sang = document.createElement('div');
                sang.className = 'author_date';

                const author = document.createElement('p');
                author.className = 'author';
                author.textContent = currentData.author;
                sang.appendChild(author);

                var update = currentData.datetime
                var upload = `${update.slice(0, 4)}년 ${update.slice(5, 7)}월 ${update.slice(8, 10)}일 ${update.slice(11, 13)}시 ${update.slice(14, 16)}분`
                const date = document.createElement('p');
                date.className = 'news_date';
                date.textContent = upload;
                sang.appendChild(date)
                news_content_box.appendChild(sang)
                box.appendChild(news_content_box)


                divElement.appendChild(box)

                container.append(divElement)
            }
        }
    });
