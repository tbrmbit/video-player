import PlayPause from "../js/video-player/play-pause";
import Poster from "../js/video-player/poster";
import { expect, jest, test } from "@jest/globals";

describe("Poster", () => {
  let poster;

  beforeEach(() => {
    document.body.innerHTML = "";
    poster = new Poster();
  });

  test("should initialize with the correct elements", () => {
    expect(poster.img).toBeInstanceOf(HTMLImageElement);
    expect(poster.pictureContainer).toBeInstanceOf(HTMLDivElement);
    expect(poster.picture).toBeInstanceOf(HTMLPictureElement);
    expect(poster.playPause).toBeInstanceOf(PlayPause);
  });

  test("should set image source", () => {
    const src = "test.jpg";
    poster.setSrc(src);
    expect(poster.img.getAttribute("src")).toBe(src);
  });

  test("should create poster element", () => {
    const result = poster.createPosterElement();
    expect(result).toBeInstanceOf(HTMLDivElement);
    expect(result.classList.contains("vdp-poster")).toBe(true);
    expect(result.contains(poster.img)).toBe(true);
    expect(result.contains(poster.playPause.createButtonElement())).toBe(true);
  });

  test("should close poster", () => {
    poster.closePoster();
    expect(poster.pictureContainer.classList.contains("vdp--invisible")).toBe(
      true
    );
  });

  test("should open poster", () => {
    poster.closePoster();
    poster.openPoster();
    expect(poster.pictureContainer.classList.contains("vdp--invisible")).toBe(
      false
    );
  });

  test("should return the poster container when adding poster", () => {
    jest.spyOn(poster, "createPosterElement");
    const result = poster.addPoster();
    expect(poster.createPosterElement).toHaveBeenCalled();
    expect(result).toBeInstanceOf(HTMLDivElement);
  });
});
