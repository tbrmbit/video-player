class TitleBar {
  constructor(title) {
    this.title = title;
    this.bar = document.createElement("div");
  }

  createTitleBarElement() {
    let paragraph = document.createElement("p");
    paragraph.innerText = this.title;
    this.bar.classList.add("vdp-title");
    this.bar.appendChild(paragraph);
    return this.bar;
  }

  closeTitleBar() {
    this.bar.classList.add("vdp--invisible");
  }

  openTitleBar() {
    this.bar.classList.remove("vdp--invisible");
  }
}

export default TitleBar;