class VolumeBar {
  SLIDER_CHANGE_EVENT = new CustomEvent('slider_change', { bubbles: true });

  constructor() {
    this.volume_bar = document.createElement("div");
    this.slider = document.createElement("input");
    this.slider.addEventListener("change", (e) => this.handlerChange(e));
    this.volume_value = 1;
  }

  createVolumeBarElement() {
    this.volume_bar.appendChild(this.slider);
    this.volume_bar.classList.add("vdp-volume-bar");
    this.slider.setAttribute("type", "range");
    this.slider.setAttribute("min", "0");
    this.slider.setAttribute("max", "100");
    this.slider.setAttribute("value", '100');
    return this.volume_bar;
  }

  handlerChange(e) {
    this.volume_value = this.transformValueToAudioFormat(e.target.value);
    e.target.dispatchEvent(this.SLIDER_CHANGE_EVENT);
  }

  transformValueToAudioFormat(value) {
    return ((value / 100) * 1);
  }
}

export default VolumeBar;