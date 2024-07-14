import Controll from "../js/video-player/controll";
import PlayPause from "../js/video-player/play-pause";
import VolumeBar from "../js/video-player/volume-bar";

jest.mock("../js/video-player/play-pause");
jest.mock("../js/video-player/volume-bar");

PlayPause.mockImplementation(() => {
  return {
    createButtonElement: jest
      .fn()
      .mockReturnValue(document.createElement("button")),
    updatePause: jest.fn(),
    updatePlay: jest.fn(),
  };
});

VolumeBar.mockImplementation(() => {
  return {
    createVolumeBarElement: jest
      .fn()
      .mockReturnValue(document.createElement("div")),
  };
})

describe("Controll", () => {
  let controll;

  beforeEach(() => {
    controll = new Controll();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should create controll element with play button and volume bar", () => {
    const controllElement = controll.createControllElement();

    expect(controll.playPause.createButtonElement).toHaveBeenCalled();
    expect(controll.volume.createVolumeBarElement).toHaveBeenCalled();
    expect(controllElement.classList.contains("vdp-controll")).toBe(true);
    expect(controllElement.querySelector("button")).toBeTruthy();
    expect(controllElement.querySelector("div")).toBeTruthy();
  });

  test("should update controll to pause", () => {
    controll.updateControll("play");
    expect(controll.playPause.updatePause).toHaveBeenCalled();
  });

  test("should update controll to play", () => {
    controll.updateControll("pause");
    expect(controll.playPause.updatePlay).toHaveBeenCalled();
  });
});
