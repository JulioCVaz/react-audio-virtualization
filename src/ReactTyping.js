import { Component } from "react";
import "./assets/styles/styles.css";
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
    return (
      <div className="container shake-opacity">
        <textarea
          className="textarea"
          type="text"
          value={this.state.inputText}
          onKeyUp={this.updateInputText}
        />
      </div>
    );
  }
}
