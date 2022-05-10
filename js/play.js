// 3. 이하 함수는 API 코드가 다운로드 된 후에, <iframe>을 생성한다.
// 높이 360px, 너비 640px로 iframe을 생성하고,
// videoId M7lc1UVf-VE인 영상이 나타나게 한다.
let player;
function exfunc() {
    for (let i = 0; i < playlist_id.length; i++) {
        // console.log(playlist_id[i]);

        player = new YT.Player('player_view', {
            height: '100%',
            width: '100%',
            videoId: playlist_id[i],
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

        // 4. IFrame API는 비디오 플레이어가 준비되었을 때, 이하 함수를 호출한다.

        function onPlayerReady(event) {
            event.target.playVideo();
        }

    }

    // 5. IFrame API는 비디오 플레이어의 상태가 변경되었을 때, 이하 함수를 호출한다.
    // 이하 함수는 영상이 재생 중인지 여부를 가리킨다.
    // 이하 함수의 값 6000은 이 플레이어가 6초 재생 후 자동으로 멈춰야 함을 의미한다.
    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.ENDED) {
            setTimeout(playerDestroy, 2000);
        }
    }
    function playerDestroy() {
        if (isEmpty(player) == false) 
        {
            player.stopVideo();
            player.destroy();
            player = null;
        }
    }

    function stopVideo() {
        player.stopVideo();
    }