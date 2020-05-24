import React, { Component } from 'react';
// The CSS can be viewed at https://github.com/sohamkamani/react-chat-example/blob/master/src/TextBar.css
import TextInput from './textInput';
import {AccountCircle, VpnKey} from '@material-ui/icons/AccountCircle';
class Login extends Component {
  constructor (props) {
    super(props)

 
  }

  login () {
    
  }

  sendMessageIfEnter (e) {
    if (e.keyCode === 13) {
      this.sendMessage()
    }
  }
  render () {

    const sendMessage = this.sendMessage.bind(this)
    const sendMessageIfEnter = this.sendMessageIfEnter.bind(this)


    return (
      <div className='textbar'>
          <TextInput id='nick-name'  label='Enter your nick-name' type='text' />
          <TextInput id='password' label='Enter password' type='password' />
      </div>
    )
  }
}

export default Login;