import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import moment from 'moment';
import jwt from "jwt-decode";
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import SendIcon from '@material-ui/icons/Send';

class InputMessageForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      message: '',
    }
  }
   
  componentDidMount() {
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
      message: '',
    }))
  }

  handleChange = (event) => {
    const value = event.target.value
    const field = event.target.name
    this.setState({ [field]: value })
  }

  handleSubmit = () => {
    let token = localStorage.getItem('userToken');
    const decodedUser = jwt(token);
    let newMsg = {id: null, textMessage: this.state.message, authorMessage: decodedUser.nickName};
    this.reset();
    this.props.handleSubmit(newMsg);
  }

  render() {
    const { message } = this.state;

    return (
      <ValidatorForm
        ref="form"
        onSubmit={this.handleSubmit}
        style={{
          display: 'flex'
        }}
      >
        <TextValidator
          fullWidth
          label="Message"
          onChange={this.handleChange}
          name="message"
          value={message}
          validators={['required', 'maxSymbols']}
          errorMessages={['this field is required', 'maximum 200 symbols']}
          margin="normal"
          style={{
            width: '50%',

          }}
        />
      <IconButton aria-label="send" type="submit">
        <SendIcon />
      </IconButton>

      </ValidatorForm>
    )
  }
}

export default InputMessageForm;