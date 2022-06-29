let player = null;
let playlist_id = [];
let arrayNum = 0;
function play() {
    onYouTubeIframeAPIReady();
    function onYouTubeIframeAPIReady() {
        if (playlist_id[arrayNum]) {
            player = new YT.Player('player_view', {
                height: '100%',
                width: '100%',
                videoId: playlist_id[arrayNum],
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            })
        } else {
            alert("곡이 없습니다.")
        }
    }
}
function onPlayerReady(event) {
    event.target.playVideo();
}
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        nextVideo();
    }
}
function playerDestroy() {
    if (player != null) {
        player.stopVideo();
        player.destroy();
        player = null;
    }
}
function nextVideo() {
    arrayNum++;
    playerDestroy();
    play();
    if (arrayNum >= playlist_id.length) arrayNum--;
}
function prevVideo() {
    arrayNum--;
    playerDestroy();
    play();
    if (arrayNum < 0) arrayNum++;
}
function clearPlaylist() {
    playerDestroy();
    playlist_id = [];
    arrayNum = 0;
    $('#main tr:not(:first)').remove();
    order_number = 0;
}

function deleteList(i) {
    document.querySelector("#main").deleteRow(i);
    for (let s = i; s < order_number; s++) {
        let v = $("#main").find("tr:eq(" + (s) + ")");
        $(v).find("td:eq(0)").text(s);
        // 태그 내 온클릭 속성 변경
        $(v).find(".delete_img").attr("onclick", "deleteList(" + s + ")");
    }
    order_number--;
    playlist_id[i - 1] = null;
    playlist_id = playlist_id.filter((item) => {
        return item != null;
    })
    if (player !== null && i <= arrayNum) {
        arrayNum--;
    }
}
