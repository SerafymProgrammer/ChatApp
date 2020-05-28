import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";

class InputMessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      isMobileWindow: false,
    };
  }

  componentDidMount() {
    window.matchMedia("(max-width: 400px)").addListener((e) => {
      this.setState({ isMobileWindow: e.matches });
    });
    ValidatorForm.addValidationRule("maxSymbols", (value) => {
      if (value.length > 200) {
        return false;
      }
      return true;
    });
  }

  componentWillUnmount() {
    ValidatorForm.removeValidationRule("maxSymbols");
  }

  reset() {
    this.setState((state) => ({
      message: "",
    }));
  }

  handleChange = (event) => {
    const value = event.target.value;
    const field = event.target.name;
    this.setState({ [field]: value });
  };

  handleSubmit = () => {
    const newMsg = this.state.message;
    this.reset();
    this.props.handleSubmit(newMsg);
  };

  render() {
    const { message, isMobileWindow } = this.state;

    return (
      <ValidatorForm
        ref="form"
        onSubmit={this.handleSubmit}
        style={{
          display: "flex",
        }}
      >
        <TextValidator
          fullWidth
          label="Message"
          onChange={this.handleChange}
          name="message"
          value={message}
          validators={["required", "maxSymbols"]}
          errorMessages={["this field is required", "maximum 200 symbols"]}
          margin="normal"
          style={
            isMobileWindow
              ? {
                  width: "100%",
                }
              : {
                  width: "50%",
                }
          }
        />
        <IconButton aria-label="send" type="submit">
          <SendIcon />
        </IconButton>
      </ValidatorForm>
    );
  }
}

export default InputMessageForm;
