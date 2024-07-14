import VolumeBar from "../js/video-player/volume-bar";
import { transformValueToAudioFormat } from "../js/utils/math-video";

describe("VolumeBar", () => {
  let volumeBar;

  beforeEach(() => {
    volumeBar = new VolumeBar();
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  test("should create volume bar element with slider", () => {
    const volumeBarElement = volumeBar.createVolumeBarElement();
    expect(volumeBarElement.classList.contains("vdp-volume-bar")).toBe(true);

    const slider = volumeBarElement.querySelector('input[type="range"]');
    expect(slider).toBeTruthy();
    expect(slider.getAttribute("min")).toBe("0");
    expect(slider.getAttribute("max")).toBe("100");
    expect(slider.getAttribute("value")).toBe("100");
  });

  test("should update volume value and dispatch slider change event on slider change", () => {
    const volumeBarElement = volumeBar.createVolumeBarElement();
    const slider = volumeBarElement.querySelector('input[type="range"]');
    const mockValue = "50";
    slider.value = mockValue;

    const dispatchEventSpy = jest.spyOn(slider, "dispatchEvent");
    slider.dispatchEvent(new Event("change"));
    expect(volumeBar.volume_value).toBe(transformValueToAudioFormat(mockValue));

    const sliderChangeEvent = new CustomEvent("slider_change", {
      bubbles: true,
    });
    expect(dispatchEventSpy).toHaveBeenCalledWith(sliderChangeEvent);

    dispatchEventSpy.mockRestore();
  });

});
