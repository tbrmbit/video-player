import TitleBar from "../js/video-player/title-bar";

describe("TitleBar", () => {
  let titleBar;
  const title = "Sample Title";

  beforeEach(() => {
    titleBar = new TitleBar(title);
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  test("should create title bar element with correct title", () => {
    const titleBarElement = titleBar.createTitleBarElement();
    expect(titleBarElement.classList.contains("vdp-title")).toBe(true);

    const paragraph = titleBarElement.querySelector("p");
    expect(paragraph).toBeTruthy();
    expect(paragraph.innerText).toBe(title);
  });

  test("should close title bar", () => {
    const titleBarElement = titleBar.createTitleBarElement();
    titleBar.closeTitleBar();
    expect(titleBarElement.classList.contains("vdp--invisible")).toBe(true);
  });

  test("should open title bar", () => {
    const titleBarElement = titleBar.createTitleBarElement();
    titleBar.closeTitleBar();
    titleBar.openTitleBar();

    expect(titleBarElement.classList.contains("vdp--invisible")).toBe(false);
  });
});
