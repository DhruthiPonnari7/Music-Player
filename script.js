  const audio = document.getElementById('audio');
  const playBtn = document.getElementById('play');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const title = document.getElementById('title');
  const artist = document.getElementById('artist');
  const progressContainer = document.getElementById('progress-container');
  const progress = document.getElementById('progress');
  const currentTimeEl = document.getElementById('current-time');
  const durationEl = document.getElementById('duration');
  const volumeSlider = document.getElementById('volume');
  const playlistContainer = document.getElementById('playlist');

  let isPlaying = false;
  let songIndex = 0;

  const songs = [
    {
      name: 'Pretty Little Baby',
      artist: 'Connie Francis',
      src: 'pretty_Little_Baby.mp3'
    },
    {
      name: 'Koyila',
      artist: 'Vijai Bulganin',
      src: 'Koyila.mp3'
    },
    {
      name: 'Wanna Be Yours',
      artist: 'Arctic Monkeys',
      src: 'wannabeyours.mp3'
    }
  ];

  function loadSong(song) {
    title.textContent = song.name;
    artist.textContent = song.artist;
    audio.src = song.src;
    updatePlaylistUI();
  }

  function playSong() {
    isPlaying = true;
    audio.play();
    playBtn.textContent = '⏸️';
  }

  function pauseSong() {
    isPlaying = false;
    audio.pause();
    playBtn.textContent = '▶️';
  }

  playBtn.addEventListener('click', () => {
    isPlaying ? pauseSong() : playSong();
  });

  prevBtn.addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
  });

  nextBtn.addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
  });

  audio.addEventListener('timeupdate', updateProgress);
  progressContainer.addEventListener('click', setProgress);
  audio.addEventListener('ended', () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
  });

  volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
  });

  function updateProgress() {
    const { duration, currentTime } = audio;
    const percent = (currentTime / duration) * 100;
    progress.style.width = `${percent}%`;

    currentTimeEl.textContent = formatTime(currentTime);
    durationEl.textContent = formatTime(duration);
  }

  function setProgress(e) {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
  }

  function formatTime(time) {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  function createPlaylist() {
    songs.forEach((song, index) => {
      const div = document.createElement('div');
      div.textContent = `${song.name} - ${song.artist}`;
      div.classList.add('playlist-item');
      div.addEventListener('click', () => {
        songIndex = index;
        loadSong(song);
        playSong();
      });
      playlistContainer.appendChild(div);
    });
  }

  function updatePlaylistUI() {
    const items = document.querySelectorAll('.playlist-item');
    items.forEach((item, i) => {
      item.classList.toggle('active', i === songIndex);
    });
  }

  // Initialize
  loadSong(songs[songIndex]);
  createPlaylist();
  volumeSlider.value = 1;
  audio.volume = 1;
