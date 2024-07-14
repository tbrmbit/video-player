import "@testing-library/jest-dom";
import Player from "../js/video-player/player";
import Controll from "../js/video-player/controll";
import Poster from "../js/video-player/poster";
import TitleBar from "../js/video-player/title-bar";

jest.mock("../js/video-player/controll");
jest.mock("../js/video-player/poster");
jest.mock("../js/video-player/title-bar");

describe("Player", () => {
  let videoContainer;
  let videoData;
  let player;
  let mockPlay;
  let mockPause;

  beforeEach(() => {
    videoContainer = document.createElement("div");
    videoContainer.setAttribute("id", "tmf_video");
    document.body.appendChild(videoContainer);

    videoData = {
      src: "http://meu-video.com/video-source.mp4",
      poster: "video-poster.jpg",
      title: "Sample Video",
    };

    mockPlay = jest.fn();
    mockPause = jest.fn();
    HTMLMediaElement.prototype.play = mockPlay;
    HTMLMediaElement.prototype.pause = mockPause;

    player = new Player(videoContainer, videoData);
  });

  afterEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = "";
  });

  test("should initialize Player with video data", () => {
    expect(player.video).toBeInstanceOf(HTMLVideoElement);
    expect(player.video_container).toBe(videoContainer);
    expect(player.video_data).toEqual(videoData);
    expect(player.poster).toBeInstanceOf(Poster);
    expect(player.titleBar).toBeInstanceOf(TitleBar);
    expect(player.controll).toBeInstanceOf(Controll);
  });

  test("should set src and create video element", () => {
    player.createVideoElement(videoData.src);
    const sourceElement = player.video.querySelector("source");
    expect(sourceElement.getAttribute("src")).toBe(videoData.src);
    expect(sourceElement.getAttribute("type")).toBe("video/mp4");
    expect(player.video).toHaveClass("vdp-player");
  });

  test("should update controll on play event", () => {
    player.updatePlayControll();
    expect(player.controll.updateControll).toHaveBeenCalledWith("play");
    expect(player.poster.closePoster).toHaveBeenCalled();
    expect(player.titleBar.closeTitleBar).toHaveBeenCalled();
    expect(mockPlay).toHaveBeenCalled(); 
  });

  test("should update controll on pause event", () => {
    player.updatePauseControll();
    expect(player.controll.updateControll).toHaveBeenCalledWith("pause");
    expect(mockPause).toHaveBeenCalled();
  });

  test("should add and remove event listeners", () => {
    const addSpy = jest.spyOn(player.video, "addEventListener");
    const removeSpy = jest.spyOn(player.video, "removeEventListener");

    player.addListenerToVideoEvents();
    expect(addSpy).toHaveBeenCalledWith("ended", expect.any(Function));
    expect(addSpy).toHaveBeenCalledWith("error", expect.any(Function));

    player.removeListenerToVideoEvents();
    expect(removeSpy).toHaveBeenCalledWith("ended", expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith("error", expect.any(Function));
  });

  test("should handle error event", () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    player.onErrorVideo();
    expect(consoleErrorSpy).toBeCalledWith(
      "Error! Tivemos algum problema com o corregamento do vídeo"
    );
  });

  test("should handle ended event", () => {
    const updatePauseSpy = jest.spyOn(player, "updatePauseControll");
    player.onEndedVideo();
    expect(updatePauseSpy).toHaveBeenCalled();
  });
});
