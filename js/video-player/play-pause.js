class PlayPause {
  PLAY_EVENT = new CustomEvent("play", { bubbles: true });
  PAUSE_EVENT = new CustomEvent("pause", { bubbles: true });

  constructor(fn) {
    this.play = false;
    this.button = document.createElement("button");
    this.button.addEventListener("click", (e) => this.handlerPlay(e));
  }

  createButtonElement() {
    this.button.classList.add("vdp-play-pause", "vdp-play");
    return this.button;
  }

  handlerPlay(e) {
    if (this.play) {
      this.updatePlay();
      e.target.dispatchEvent(this.PAUSE_EVENT);
    } else {
      this.updatePause();
      e.target.dispatchEvent(this.PLAY_EVENT);
    }
  }

  updatePlay() {
    this.play = false;
    this.button.classList.remove("vdp-pause");
    this.button.classList.add("vdp-play");
  }

  updatePause() {
    this.play = true;
    this.button.classList.remove("vdp-play");
    this.button.classList.add("vdp-pause");
  }
}

export default PlayPause;