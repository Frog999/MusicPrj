let order_number = 0;
function search() {
    $('#search_view').empty();
    let get_search = document.getElementById("search_bar").value;
    const order = "relevance";

    //최대 검색 결과 개수
    const maxResults = "5";

    //API키
    const key = "AIzaSyBuQao-t5oB8AMJ1y7K5pvj5CSRUIM-VtE";

    //검색 URL
    let targetUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&order=" + order
        + "&q=" + encodeURIComponent(get_search) + "&key=" + key + "&maxResults=" + maxResults;

    // 검색어 없이 검색 시 알림
    if (get_search == "") {
        alert("검색어를 입력하세요.");
    } else {
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
                    let a = document.querySelectorAll(".add_list");
                    a.forEach(
                        (item, i) => {
                            item.addEventListener('click', () => {
                                func4(i);
                            })
                        });
                    //행 및 곡 정보 추가
                    function func4(i) {
                        let table = document.getElementById("main");
                        let newRow = table.insertRow();
                        let order_cell = newRow.insertCell(0);
                        let music_title_cell = newRow.insertCell(1);
                        let del_btn_cell = newRow.insertCell(2);
                        order_number++;
                        order_cell.innerText = order_number;
                        $(music_title_cell).append(jdata.items[i].snippet.title);
                        $(del_btn_cell).append('<img src = "img/delete.png" class = "delete_img" onclick = "deleteList(' + order_number + ')">')

                        //플레이리스트 배열에 비디오ID 추가
                        playlist_id.push(jdata.items[i].id.videoId);
                        playlist_name.push(jdata.items[i].snippet.title);
                    }
                }
                )
            },
            //에러 처리
            error: () => {
                alert("다시 시도해 주세요.");
                return;
            }
        });
    }
}

