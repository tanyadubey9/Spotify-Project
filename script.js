const playButton = document.getElementById('playButton')
const playBar = document.getElementById('playBar');
const seekBar = document.getElementById('seek-bar');
const currentTime = document.getElementById('current-time');
const duration = document.getElementById('duration');
const player = document.getElementById('player');
const playPause = document.getElementById('playpause');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const playList = document.getElementById('playList');
const songBox = document.getElementById('songBox');
let currentSongIndex = 0;

playPause.addEventListener('click', () => {
  if(player.paused){
    player.play();
    playPause.querySelector('.playIcon').style.display = 'none';
    playPause.querySelector('.pauseIcon').style.display = 'inline';
  } else {
    player.pause();
    playPause.querySelector('.pauseIcon').style.display = 'none';
    playPause.querySelector('.playIcon').style.display = 'inline';
  }
})

next.addEventListener('click', () => {
  currentSongIndex++;
  if (currentSongIndex >= playList.children.length) {
      currentSongIndex = 0;
  }
  playSong(currentSongIndex);
});

previous.addEventListener('click', () => {
  currentSongIndex--;
  if (currentSongIndex < 0) {
      currentSongIndex = playList.children.length - 1;
  }
  playSong(currentSongIndex);
});

playList.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
      const selectedIndex = Array.from(e.target.parentNode.children).indexOf(e.target);
      playSong(selectedIndex);
  }
});

function playSong(index) {
  const selectedSong = playList.children[index];
  const songImg = selectedSong.querySelector('img');
  const songTitle = selectedSong.querySelector('h5');
  songBox.innerHTML = `<img src="${songImg.src}" alt="${songImg.alt}"> <h5>${songTitle.textContent}</h5>`;
  const selectedAudio = selectedSong.querySelector('audio');
  player.src = selectedAudio.src;
  player.load();
  player.play();
  playPause.querySelector('.playIcon').style.display = 'none';
  playPause.querySelector('.pauseIcon').style.display = 'inline';
  currentSongIndex = index;
}

player.addEventListener('timeupdate', () =>{
  const currentTimeValue = player.currentTime;
  const durationValue = player.duration;
  currentTime.textContent = formatTime(currentTimeValue);
  if (!isNaN(durationValue)) {
    duration.textContent = formatTime(durationValue);
 }
  seekBar.value = ( currentTimeValue / durationValue ) * 100;
});

function formatTime(time){
  const minutes = Math.floor( time / 60 );
  const seconds = Math.floor( time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

seekBar.addEventListener('input', () => {
    const selectedTime = (seekBar.value / 100) * player.duration;
    player.currentTime = selectedTime;
});

document.querySelector('.hamburger').addEventListener('click', () => {
  document.querySelector('.left').style.left = "0";
});

document.querySelector('.cross').addEventListener('click', () => {
  document.querySelector('.left').style.left = "-320px";
});
