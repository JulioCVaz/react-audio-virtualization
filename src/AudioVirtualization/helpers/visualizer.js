import { renderFrame } from "./renderFrame";

export const createVisualiser = (player, visualiser) => {
  const audioContext = new AudioContext();
  const context = audioContext.createMediaElementSource(player);
  const analyser = audioContext.createAnalyser();
  const canvas = visualiser;
  const ctx = canvas.getContext("2d");
  context.connect(analyser);
  analyser.connect(audioContext.destination);
  analyser.fftSize = 128;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  const barWidth = (canvas.width / bufferLength) * 2.5;
  let bar;
  let barHeight;

  renderFrame(
    bar,
    analyser,
    dataArray,
    ctx,
    canvas,
    bufferLength,
    barHeight,
    barWidth
  );
};
