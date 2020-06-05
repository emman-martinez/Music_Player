import './../css/componentes.css';  

const musicContainer = document.getElementById('music-container');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
// Song titles
const songs = ['hey', 'summer', 'ukulele'];
// Keep track of song
let songIndex = 1;
/* ****************************** UPDATE SONG DETAILS ****************************** */
const loadSong = (song) => {
    title.innerText = song;
    audio.src = `./assets/music/${song}.mp3`;
    cover.src = `./assets/img/${song}.jpg`;
};
/* ****************************** PLAY SONG ****************************** */
const playSong = () => {
    musicContainer.classList.add('play'); 
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
};
/* ****************************** PAUSE SONG ****************************** */
const pauseSong = () => {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    audio.pause();
};
/* ****************************** PREV SONG ****************************** */
const prevSong = () => {
    songIndex--;
    if(songIndex < 0) {
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
};
/* ****************************** NEXT SONG ****************************** */
const nextSong = () => {
    songIndex++;
    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
};
/* ****************************** UPDATE PROGRESS BAR ****************************** */
const updateProgress = (e) => {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime/duration) * 100;
    progress.style.width = `${progressPercent}%`;
};
/* ****************************** SET PROGRESS BAR ****************************** */
const setProgress = (e) => {
    const width = progressContainer.clientWidth; 
    const clickX = e.offsetX; 
    const duration = audio.duration;
    audio.currentTime = (clickX/width) * duration;
};

/* ************************************************************ */
const eventos = () => {
    console.log('Event Listeners');
    
    /* *** PLAY BUTTON *** */
    playBtn.addEventListener('click' , () => {
        const isPlaying = musicContainer.classList.contains('play');
        if(isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    });
    /* *** CHANGE SONG *** */
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    /* *** TIME/SONG UPDATE *** */
    audio.addEventListener('timeupdate', updateProgress);
    /* *** CLICK ON PROGRESS BAR *** */
    progressContainer.addEventListener('click', setProgress);
    /* *** SONG ENDS *** */
    audio.addEventListener('ended', nextSong);
};
/* ************************************************************ */
const init = () => {
    console.log('Music Player'); 
    eventos();
    // Initially load song details into DOM 
    loadSong(songs[songIndex]);
};
/* ************************************************************ */
export {
    init
} 