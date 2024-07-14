import { getVideoType } from "../utils/str-videos.js";
import Controll from "./controll.js";
import Poster from "./poster.js";
import TitleBar from "./title-bar.js";

class Player {
  constructor(video_container, video_data) {
    this.video = document.createElement("video");
    this.video_container = video_container;
    this.video_data = video_data;
    this.poster = new Poster();
    this.titleBar = new TitleBar(this.video_data.title);
    this.controll = new Controll();
  }

  initPlayer() {
    this.poster.setSrc(this.video_data.poster);
    this.video_container.append(
      this.createVideoElement(),
      this.poster.createPosterElement(),
      this.titleBar.createTitleBarElement(),
      this.controll.createControllElement()
    );
    this.addListenerToVideoEvents();
    this.addListenerToPlayerEvents();
  }

  addListenerToPlayerEvents() {
    this.video_container.addEventListener("play", (e) => {
      e.preventDefault();
      this.updatePlayControll();
    });

    this.video_container.addEventListener("pause", (e) => {
      e.preventDefault();
      this.updatePauseControll();
    });

    this.video_container.addEventListener("slider_change", (e) => {
      e.preventDefault();
      this.video.volume = this.controll.volume.volume_value;
    });
  }

  updatePlayControll() {
    this.controll.updateControll("play");
    this.poster.closePoster();
    this.titleBar.closeTitleBar();
    this.video.play();
  }

  updatePauseControll() {
    this.controll.updateControll("pause");
    this.video.pause();
  }

  addListenerToVideoEvents() {
    this.video.addEventListener("ended", this.onEndedVideo.bind(this));
    this.video.addEventListener("error", this.onErrorVideo);
  }

  removeListenerToVideoEvents() {
    this.video.removeEventListener("ended", this.onEndedVideo.bind(this));
    this.video.removeEventListener("error", this.onErrorVideo);
  }

  onErrorVideo(e) {
    console.error("Error! Tivemos algum problema com o corregamento do vídeo");
  }

  onEndedVideo(e) {
    this.updatePauseControll();
  }

  createVideoElement() {
    let source = this.createSourceElement(this.video_data.src);
    this.video.appendChild(source);
    this.video.classList.add("vdp-player");
    return this.video;
  }

  createSourceElement(src_video) {
    let sourceTag = document.createElement("source");
    sourceTag.setAttribute("src", src_video);
    sourceTag.setAttribute("type", getVideoType(src_video));
    return sourceTag;
  }
}

export default Player;