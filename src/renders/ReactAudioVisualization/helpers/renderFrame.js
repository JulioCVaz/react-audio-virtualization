export const renderFrame = (
  bar,
  analyser,
  dataArray,
  ctx,
  canvas,
  bufferLength,
  barHeight,
  barWidth
) => {
  //  A SACADA TA AQUI requestAnimationFrame(renderFrame);
  bar = 0;
  analyser.getByteFrequencyData(dataArray);
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < bufferLength; i++) {
    if (dataArray[i] === 244) console.log(dataArray);
    barHeight = dataArray[i] - 150;
    const r = barHeight + 25 * (i / bufferLength);
    ctx.fillStyle = `rgb(${r}, 100, 50)`;
    ctx.fillRect(bar, canvas.height - barHeight, barWidth, barHeight);
    bar += barWidth + 2;
  }
};
