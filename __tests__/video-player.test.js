import VideoPlayer from "../js/video-player/video-player";
import Player from "../js/video-player/player";
import { expect, jest, test } from "@jest/globals";

jest.mock("../js/video-player/player");
Player.mockImplementation(() => {
  return {
    initPlayer: jest.fn(),
  };
})

describe("VideoPlayer", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    container.id = "tmf_video";
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  test("should initialize VideoPlayer with custom ref_id_name and video_data", () => {
    const videoData = {
      src: "video-source.mp4",
      poster: "video-poster.jpg",
      title: "Sample Video",
    };
    const customContainer = document.createElement("div");
    customContainer.id = "custom_video";
    document.body.appendChild(customContainer);

    const videoPlayer = new VideoPlayer("custom_video", videoData);
    expect(videoPlayer.container).toBe(customContainer);
    expect(videoPlayer.video_data).toEqual(videoData);
    expect(Player).toHaveBeenCalledWith(customContainer, videoData);
    expect(videoPlayer.player.initPlayer).toHaveBeenCalled();
  });

  describe("VideoPlayer", () => {
    test("should log warning when container is not found", () => {
      const warnSpy = jest.spyOn(console, "warn").mockImplementation();
      const videoPlayer = new VideoPlayer("without_id");
      expect(warnSpy).toHaveBeenCalledWith(
        "Não foi possível encontrar referência: without_id"
      );
      expect(videoPlayer.container).toBeFalsy();
      expect(videoPlayer.player).toBeUndefined();
      warnSpy.mockRestore();
    });
  });

  test("should log warning when video_data is not an object", () => {
    const warnSpy = jest.spyOn(console, "warn").mockImplementation();
    const videoPlayer = new VideoPlayer("tmf_video", ["invalid_data"]);
    expect(warnSpy).toHaveBeenCalledWith(
      "Dados do video precisam ser um object: {src, poster, title}"
    );
    expect(videoPlayer.container).toBe(container);
    expect(videoPlayer.player).toBeUndefined();
    warnSpy.mockRestore();
  });
});
