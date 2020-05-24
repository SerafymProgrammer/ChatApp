import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import CircularProgress from "@material-ui/core/CircularProgress";

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("moreThanThreeChar", (value) => {
      if (value.length < 3) {
        return false;
      }
      return true;
    });
    ValidatorForm.addValidationRule("notAllowedSpecialSymbols", (value) => {
      if (/[^A-zА-яЁё0-9)]/.test(value)) {
        return false;
      }
      return true;
    });
  }

  componentWillUnmount() {
    // remove rule when it is not needed
    ValidatorForm.removeValidationRule("moreThanThreeChar");
    ValidatorForm.removeValidationRule("notAllowedSpecialSymbols");
  }

  reset() {
    this.setState((state) => ({
      username: "",
      password: "",
    }));
  }

  handleChange = (event) => {
    const value = event.target.value;
    const field = event.target.name;
    this.setState({ [field]: value });
  };

  handleSubmit = () => {
    let data = Object.assign({ id: null }, this.state);
    this.reset()
    this.props.handleSubmit(data);
  };

  render() {
    const { username, password } = this.state;
    const { isFetching } = this.props;

    return (
      <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
        <TextValidator
          fullWidth
          label="Username"
          onChange={this.handleChange}
          name="username"
          value={username}
          validators={[
            "required",
            "moreThanThreeChar",
            "notAllowedSpecialSymbols",
          ]}
          errorMessages={[
            "this field is required",
            "3 characters minimum",
            "Not allowed special symbols",
          ]}
          margin="normal"
        />
        <TextValidator
          fullWidth
          label="Password"
          type="password"
          onChange={this.handleChange}
          name="password"
          value={password}
          validators={["required"]}
          errorMessages={["this field is required"]}
          margin="normal"
        />
        <Button
          variant="contained"
          fullWidth
          color="primary"
          type="submit"
          disabled={isFetching}
          margin="normal"
        >
          {isFetching && <CircularProgress size={20} />} Save
        </Button>
      </ValidatorForm>
    );
  }
}

export default SignInForm;
