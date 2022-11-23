
var _latestMusic;
var _soundInited = false;

var allAudio = [[], []];


function initializeAudioSystem(sounds, music) {
    if (_soundInited == false) {
        _soundInited = true;
        if (sounds != null) {
            console.log("load sound started");
        }
        if (music != null) {
            for (let index = 0; index < music.length; index++) {
                const file = music[index];
                var sound = document.createElement('audio');
                sound.src = file;
                document.body.appendChild(sound);
                allAudio[1].push(sound);
            }
            console.log("loaded music");
        }
    }
}

function playAudio(audioId, array, volume = 100) {
    var audio = array[audioId];
    audio.currentTime = 0;
    audio.volume = volume * 0.01;
    audio.play();
    return audio;
}

function playMusic(musicId, volume = 100) {
    if (_latestMusic != null) {
        _latestMusic.pause();
    }

    _latestMusic = playAudio(musicId, allAudio[1], volume);

}

function changeMusicVolume(musicId, volume) {
    allAudio[1][musicId].volume = volume * 0.01;
}

function isMusicPlaying() {
    return _latestMusic != null && (!_latestMusic.paused && !_latestMusic.ended);
}