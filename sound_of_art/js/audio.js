
var _latestMusic;
var _soundInited = false;

var allAudio = [[], []];

var CONVERSION_NUMBER = 0.0001;


function initializeAudioSystem(sounds, music) {
    if (_soundInited == false) {
        _soundInited = true;
        if (sounds != null) {
            console.log("load sound started");
            for (let index = 0; index < sounds.length; index++) {
                const file = sounds[index];
                var sound = document.createElement('audio');
                sound.src = file;
                document.body.appendChild(sound);
                allAudio[0].push(sound);
            }

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

function playAudio(audioId, array, volume = 100, loop = false) {
    var audio = array[audioId];
    audio.currentTime = 0;
    audio.volume = volume * CONVERSION_NUMBER;
    audio.loop = loop;

    var promise = audio.play();
    if (promise !== undefined) {
        promise.then(_ => {
            // Autoplay started!
        }).catch(error => {
            // Autoplay was prevented.
            // Show a "Play" button so that user can start playback.
        });
    }
    return audio;
}

function stopAudio(audioId, array) {
    array[audioId].pause();
    array[audioId].currentTime = 0;
}

function stopSfx(audioId) {
    stopAudio(audioId, allAudio[0]);
}

function stopMusic() {
    if (_latestMusic != null) {
        _latestMusic.pause();
    }
}

function playSfx(audioId, volume = 10000, loop = false) {
    playAudio(audioId, allAudio[0], volume, loop);
}

function playMusic(musicId, volume = 10000) {
    if (_latestMusic != null) {
        _latestMusic.pause();
    }

    _latestMusic = playAudio(musicId, allAudio[1], volume);

}

function changeMusicVolume(musicId, volume) {
    allAudio[1][musicId].volume = volume * CONVERSION_NUMBER;
}

function isMusicPlaying() {
    return _latestMusic != null && (!_latestMusic.paused && !_latestMusic.ended);
}