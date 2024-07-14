import PlayPause from "../js/video-player/play-pause";

describe("PlayPause", () => {
  let playPause;

  beforeEach(() => {
    playPause = new PlayPause();
    document.body.appendChild(playPause.createButtonElement());
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  test("should initialize with play state and play button class", () => {
    expect(playPause.play).toBe(false);
    expect(playPause.button).toHaveClass("vdp-play");
    expect(playPause.button).not.toHaveClass("vdp-pause");
  });

  test("should toggle to pause state on click and dispatch pause event", () => {
    const spyDispatchEvent = jest.spyOn(playPause.button, "dispatchEvent");
    playPause.button.click();

    expect(playPause.play).toBe(true);
    expect(playPause.button).toHaveClass("vdp-pause");
    expect(spyDispatchEvent).toHaveBeenCalledWith(playPause.PAUSE_EVENT);
    spyDispatchEvent.mockRestore();
  });

  test("should toggle to play state on second click and dispatch play event", () => {
    const spyDispatchEvent = jest.spyOn(playPause.button, "dispatchEvent");

    playPause.button.click();

    // Segundo clique para mudar para o estado de play
    playPause.button.click();

    expect(playPause.play).toBe(false);
    expect(playPause.button).toHaveClass("vdp-play");
    expect(spyDispatchEvent).toHaveBeenCalledWith(playPause.PLAY_EVENT);

    spyDispatchEvent.mockRestore();
  });
});
