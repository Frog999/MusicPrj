let player;
let playlist_id = [];
let arrayNum = 0;
function play() {
        onYouTubeIframeAPIReady();
        function onYouTubeIframeAPIReady(){
            if (playlist_id[arrayNum]){
                player = new YT.Player('player_view', {
                    height: '100%',
                    width: '100%',
                    videoId: playlist_id[arrayNum],
                    events: {
                        'onReady': onPlayerReady,
                        'onStateChange': onPlayerStateChange
                    }
                })
            }else {
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
            player.stopVideo();
            player.destroy();
            player = null;
    }
    function nextVideo() {
        arrayNum++;
        playerDestroy();
        play();
    }
    function prevVideo(){
        arrayNum--;
        playerDestroy();
        play();
    }
    function clearPlaylist(event) {
        if(player != null){
            playerDestroy();
        }
        playlist_id = [];
        arrayNum = 0;
        for (let m = 0; m < order_number; m++) {
            document.getElementById("main").deleteRow(-1);
        }
        order_number = 0;
    }
    
    let b = document.querySelectorAll(".delete_img");
    b.forEach((item, n) => {item.addEventListener('click', () => deleteList(n))});
    function deleteList() {

    }
