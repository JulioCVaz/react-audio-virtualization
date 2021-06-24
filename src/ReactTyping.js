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
    const { inputText } = this.state;
    console.log(`%c ${inputText}`, "color: #FFF; background: #039dfc;");
    return (
      <>
        <h1>Crazy Textarea</h1>
        <div className="container shake-opacity shake-constant shake-freeze">
          <textarea
            className="textarea"
            type="text"
            value={inputText}
            onKeyUp={this.updateInputText}
          />
        </div>
      </>
    );
  }
}
