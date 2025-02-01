import React from "react";
import { Component } from "react";

// import { useState } from "react";

//TODO remove
class TestComponent extends Component {

  //TODO throughout all the code use strong typing

  //TODO create a type to pass in the props

  value: any;

  // const[inputValue, setInputValue] = useState<string>("");


  //TODO don't use any
  constructor(props: any, value: any) {
    // const [inputValue, setInputValue] = useState(false);
    console.log("in constructor2")
    super(props);
    this.value = value
    this.state = { name: this.props.defaultName };
    // super(props);
    // this.reset();

  }

  handleInputChange(event) {
    // console.log("in handleInputChange")
    // console.log(event)
    // console.log(event.target.value)
    this.setState({ name: event.target.value });

    // setInputValue(event.target.value);
  }

  handleButtonClick() {
    console.log("in handleButtonClick")
    console.log(this.state.name);
  }

  render() {
    return (
      <div>
        <h1>Test Component2</h1>

        <table>
          <tr>
            {/* //TODO doesn't work */}
            {/* <td><input type="text" onChange={ this.handleInputChange} /></td> */}
            <td><input type="text" onChange={e => this.handleInputChange(e)} /></td>

            {/* value={this.value}  */}
          </tr>

          <tr>
            <td><button onClick={this.handleButtonClick}> MyButton</button></td>
          </tr>
        </table>
      </div>
    )
  }


  myFunction(m) {
    // alert("message=" + m);
  }




}

export default TestComponent;