function search() {
    $('#search_view').empty();
    let get_search = document.getElementById("search_bar").value;
    let order = "relevance";

    //최대 검색 결과 개수
    let maxResults = "5";

    //API키
    let key = "AIzaSyBuQao-t5oB8AMJ1y7K5pvj5CSRUIM-VtE";

    //검색 URL
    let targetUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&order=" + order
        + "&q=" + encodeURIComponent(get_search) + "&key=" + key + "&maxResults=" + maxResults;

    // 검색어 없이 검색 시 알림
    if (get_search == "") {
        alert("검색어를 입력하세요.");
    }
    //검색 및 창 생성
    $.ajax({
        type: "POST",
        url: targetUrl,
        dataType: "jsonp",
        success: function (jdata) {
            $(jdata.items).each(function (i) {
                //검색결과 및 재생목록 버튼 추가
                $("#search_view").append('<p class="search_result"><a href="https://youtu.be/' + this.id.videoId + '" target = "_blank">' + this.snippet.title + '</p>');
                $("#search_view").append('<button type = "button" class = "add_list" >재생목록에 추가</button>');
                //버튼 EventListener 추가 및 function 연결
            }).promise().done(() => {
                const a = document.querySelectorAll(".add_list");
                a.forEach(
                    function (item, i) {
                        item.addEventListener('click', () => {
                            func4(i);
                        })
                    });
                //행 및 곡 정보 추가
                function func4(i) {
                    const table = document.getElementById("main");
                    const newRow = table.insertRow();
                    const order_cell = newRow.insertCell(0);
                    const music_title_cell = newRow.insertCell(1);
                    const del_btn_cell = newRow.insertCell(2);
                    order_number++;
                    $(del_btn_cell).append('<img src = "delete.png" id = "delete_img">')
                    order_cell.innerText = order_number;
                    music_title_cell.innerText = jdata.items[i].snippet.title;
                    //플레이리스트 배열에 비디오ID 추가
                    playlist_id.push(jdata.items[i].id.videoId);
                }
            }
            )
        },
        //에러 처리
        error: () => {
            alert("에러");
            return;
        }
    });
}
