let player = null;
let playlist_id = [];
let playlist_name = [];
let arrayNum = 0;
function play() {
    if(player != null){
        player.pauseVideo();
        $("#play_button").attr('src','img/play_button.png')
        if(player.getPlayerState() == 2){
            $("#play_button").attr('src','img/pause_button.png')
            player.playVideo();
        }
    }else {
        onYouTubeIframeAPIReady();
        function onYouTubeIframeAPIReady() {
            if (playlist_id[arrayNum]) {
                    $("#play_button").attr('src','img/pause_button.png')
                    player = new YT.Player('player_view', {
                        height: '100%',
                        width: '100%',
                        videoId: playlist_id[arrayNum],
                        events: {
                            'onReady': onPlayerReady,
                            'onStateChange': onPlayerStateChange
                        }
                    })
                    $("#play_info").html(playlist_name[arrayNum])
            } else {
                $("#play_info").text("")
                alert("곡이 없습니다.")
            }
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
    playlist_name = [];
    $("#play_info").text("")
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
    if (player != null && i <= arrayNum) {
        arrayNum--;
    }
}

function mute() {
    if(player.isMuted()) {
        player.unMute()
        $("#sound_button").attr('src', 'img/sound_button.png')
    }else {
        player.mute()
        $("#sound_button").attr('src', 'img/mute_button.png')
    }
}
