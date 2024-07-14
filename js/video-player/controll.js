import PlayPause from "./play-pause.js";
import VolumeBar from "./volume-bar.js";

class Controll {
  constructor() {
    this.controll = document.createElement('div');
    this.playPause = new PlayPause();
    this.volume = new VolumeBar();
  }

  createControllElement() {
    this.controll.append(
      this.playPause.createButtonElement(), 
      this.volume.createVolumeBarElement()
    );
    this.controll.classList.add('vdp-controll');
    return this.controll;
  }

  updateControll(event) {
    event === "play"
      ? this.playPause.updatePause()
      : this.playPause.updatePlay();
  }
}

export default Controll;