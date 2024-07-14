import Player from './player.js';

class VideoPlayer {
  constructor(ref_id_name, video_data) {
    const REF_ID = ref_id_name || "tmf_video";
    this.container = document.getElementById(REF_ID);

    if (!this.container) {
      console.warn(`Não foi possível encontrar referência: ${REF_ID}`);
      return;
    }

    if (video_data && Array.isArray(video_data) || video_data && typeof video_data !== "object") {
      console.warn(`Dados do video precisam ser um object: {src, poster, title}`);
      return;
    }

    this.video_data = !video_data && this.getVideoData(this.container) || video_data && Object.keys(video_data).length === 0 && this.getVideoData(this.container) || video_data;
    this.player = new Player(this.container, this.video_data);
    this.init();
  }

  init() {
    this.container.classList.add('video-player');
    this.player.initPlayer();
  }

  getVideoData(ref_id) {
    return {
      src: ref_id.dataset.avSrc,
      poster: ref_id.dataset.avPoster,
      title: ref_id.dataset.avTitle,
    };
  }
}

export default VideoPlayer;