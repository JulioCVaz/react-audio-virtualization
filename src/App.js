import React, { Component } from "react";
import music from "./assets/musics/home.mp3";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }
  render() {
    return (
      <>
        <audio id="player" controls>
          <source id="audio" src={music} type="audio/mpeg" />
        </audio>
        <canvas id="canvas" width={200} height={100} />
      </>
    );
  }
}

export default App;
