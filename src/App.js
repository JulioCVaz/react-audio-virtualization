import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          <div className="button-container">
            <button
              className="decrement-button"
              onClick={() => this.setState({ counter: this.state.counter - 1 })}
            >
              -
            </button>
            <div className="counter-text">{this.state.counter}</div>
            <button
              className="increment-button"
              onClick={() => this.setState({ counter: this.state.counter + 1 })}
            >
              +
            </button>
          </div>
        </p>
      </div>
    );
  }
}

export default App;
