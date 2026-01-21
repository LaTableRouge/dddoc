const options = {
  plugins: {
    httpSourceSelector: {
      default: 'auto'
    }
  },
  html5: {
    vhs: {
      withCredentials: true
    },
    hls: {
      limitRenditionByPlayerDimensions: false,
      smoothQualityChange: true,
      bandwidth: 6194304,
      overrideNative: true
    }
  },
  smoothQualityChange: true,
  fluid: true,
  preload: 'auto'
};
const videos = document.querySelectorAll('.video-js');
if (videos.length) {
  videos.forEach(video => {
    const ratio = video.dataset.ratio;
    options.aspectRatio = ratio ? ratio : '1:1';

    const player = videojs(video, options);
    player.httpSourceSelector();
    player.qualityLevels();
  });
}


const playingVideo = document.querySelector('.my-video-selector')
// récupère l'instance de videojs avec l'id
const id = playingVideo.id;
const videoInstance = videojs.getPlayer(id);

// Récupère le temps restant de la vidéo
const remainingTime = videoInstance.remainingTime()

// récupère le temps de la video
const playTime = videoInstance.currentTime();
// set la video au temps récupéré
playTime && videoInstance.currentTime(playTime);

// set la video au début
videoInstance.currentTime(0);

// pause
videoInstance.pause();

// play
videoInstance.play();

// mute
videoInstance.muted(true);

// Poster
videoInstance.poster('https://via.placeholder.com/200x197');

// Set sources
videoInstance.src([
  {type: 'video/mp4', src: 'http://www.example.com/path/to/video.mp4'},
  {type: 'video/webm', src: 'http://www.example.com/path/to/video.webm'},
  {type: 'video/ogg', src: 'http://www.example.com/path/to/video.ogv'}
])

// Events
videoInstance.on('ready', function () {})
videoInstance.on('ended', function () {})
videoInstance.on('error', function () {})
videoInstance.on('useractive', function () {})
videoInstance.on('userinactive', function () {})
