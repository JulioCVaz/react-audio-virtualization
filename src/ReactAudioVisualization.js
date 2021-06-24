import React, { Component, createRef } from "react";
import songFile from "./assets/musics/home.mp3";

// constants
let ctx;
const width = 500;
const height = 500;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 0,
    };
    this.audio = new Audio(songFile);
    this.canvas = createRef();
  }

  componentDidMount() {
    this.context = new (window.AudioContext || window.webkitAudioContext)();
    this.source = this.context.createMediaElementSource(this.audio);

    this.analyser = this.context.createAnalyser();
    ctx = this.canvas.current.getContext("2d");
    this.source.connect(this.analyser);
    this.analyser.connect(this.context.destination);
    this.arrayBufferLength = this.analyser.frequencyBinCount;
    this.arrayBuffer = new Uint8Array(this.arrayBufferLength);
    this.barWidth = (this.canvas.current.width / this.arrayBufferLength) * 2.5;
    this.barHeight = 0;
    this.bar = 0;
    this.canvas.current.width = width;
    this.canvas.current.height = height;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, this.canvas.current.width, this.canvas.current.height);
  }

  animationLooper() {
    console.log("animationLooper....");
    this.analyser.getByteFrequencyData(this.arrayBuffer);

    for (let i = 0; i < this.arrayBufferLength; i++) {
      // if (arrayBuffer[i] === 244) console.log(arrayBuffer);
      this.barHeight = this.arrayBuffer[i] - 150;
      console.log(this.arrayBuffer[i]);
      let r = this.barHeight + 25 * (i / this.bufferLength);
      ctx.fillStyle = `rgb(${r}, 100, 50)`;
      ctx.fillRect(
        this.bar,
        this.canvas.current.height - this.barHeight,
        this.barWidth,
        this.barHeight
      );
      this.bar += this.barWidth + 2;
      // if (this.state.test !== bar_height) {
      //   this.setState({ ...this.state, test: bar_height });
      // }
    }
  }

  tick = () => {
    this.animationLooper();
    this.rafId = requestAnimationFrame(this.tick);
  };

  togglePlay = () => {
    const { audio } = this;
    if (audio.paused) {
      audio.play();
      this.rafId = requestAnimationFrame(this.tick);
    } else {
      audio.pause();
      cancelAnimationFrame(this.rafId);
    }
  };

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId);
    this.analyser.disconnect();
    this.source.disconnect();
  }

  render() {
    return (
      <>
        <h1>{this.state.test}</h1>
        <button onClick={this.togglePlay}>Play/Pause</button>
        <canvas ref={this.canvas} />
      </>
    );
  }
}

export default App;
