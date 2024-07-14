import PlayPause from "./play-pause.js";

class Poster {
  constructor() {
    this.img = document.createElement("img");
    this.pictureContainer = document.createElement("div");
    this.picture = document.createElement("picture");
    this.playPause = new PlayPause();
  }

  addPoster() {
    return createPosterElement();
  }

  setSrc(src) {
    if (!src) return;
    this.img.setAttribute("src", src);
  }

  createPosterElement() {
    this.img.setAttribute("loading", "lazy");
    this.picture.appendChild(this.img);
    this.pictureContainer.append(
      this.picture,
      this.playPause.createButtonElement()
    );
    this.pictureContainer.classList.add("vdp-poster");
    return this.pictureContainer;
  }

  closePoster() {
    this.pictureContainer.classList.add("vdp--invisible");
  }

  openPoster() {
    this.pictureContainer.classList.remove("vdp--invisible");
  }
}

export default Poster;