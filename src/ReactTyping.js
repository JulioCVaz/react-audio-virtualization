import { Component } from "react";

export class ReactTyping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "",
    };
  }

  updateInputText = (e) => {
    this.setState({ inputText: e.target.value });
  };

  render() {
    console.log(this.state.inputText);
    return (
      <>
        <input
          type="text"
          value={this.state.inputText}
          onKeyUp={this.updateInputText}
        />
      </>
    );
  }
}
