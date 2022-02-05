const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');



// Song titles

const songs = ['Angry', 
				'Culture Code',
				'Dstrion',
				'Galore',
				'Netrum',
				'Tinoma',
				'Cmon']; 

const artists = ['IanD.', 
				'Fairytale (feat. Amanda Collis)', 
				'Alibi (ft. Heleen)', 
				'Noah North', 
				'Colorblind (ft. Halvorsen) ', 
				' Find You ', 
				'Xavier Weeks'];

let songIndex = 0;

loadSong(songs[songIndex]);

function loadSong(song){
	title.innerText = song;
	artist.innerText = artists[songIndex];
	audio.src = `music/${song}.mp3`;
	cover.src = `images/${song}.jpg`;
}

// Play
function playSong(){
	musicContainer.classList.add('play');

	playBtn.querySelector('i.fas').classList.remove('fa-play');
	playBtn.querySelector('i.fas').classList.add('fa-pause');

	audio.play();
}


// Pause
function pauseSong(){
	musicContainer.classList.remove('play');

	playBtn.querySelector('i.fas').classList.add('fa-play');
	playBtn.querySelector('i.fas').classList.remove('fa-pause');

	audio.pause();
}

// Previous

function prevSong(){
	songIndex--;

	if (songIndex < 0) {
		songIndex = songs.length - 1;
	}

	loadSong(songs[songIndex]);

	playSong();
}

// Next

function nextSong(){
	songIndex++;

	if (songIndex > songs.length - 1) {
		songIndex = 0;
	}

	loadSong(songs[songIndex]);

	playSong();
}


// Update progress bar
function updateProgress(e){
	const {duration, currentTime} = e.srcElement;
	const progressPercent = (currentTime/ duration) *100;
	progress.style.width = `${progressPercent}%`;
	
}


// Set Progress 
function setProgress(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const duration = audio.duration;
  
	audio.currentTime = (clickX / width) * duration;
  }

let currentIndex = songIndex;

function clicked(clicked_id){
	songIndex = clicked_id;
	loadSong(songs[songIndex]);

	const isPlaying = musicContainer.classList.contains('play');

	if ((clicked_id == currentIndex) && isPlaying){
		pauseSong();
	} else {
		playSong();
	}

	currentIndex = clicked_id
}



// Event Listener

playBtn.addEventListener('click', () =>{
	const isPlaying = musicContainer.classList.contains('play');

	if (isPlaying){
		pauseSong();
	} else {
		playSong();
	}
})

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

//Time update
audio.addEventListener('timeupdate', updateProgress);


// Set progress
progressContainer.addEventListener('click', setProgress);

// Song ended
audio.addEventListener('ended', nextSong);
