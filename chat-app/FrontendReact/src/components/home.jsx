import React, { Component } from 'react';
// The CSS can be viewed at https://github.com/sohamkamani/react-chat-example/blob/master/src/TextBar.css

import {AccountCircle, VpnKey} from '@material-ui/icons/AccountCircle';
import {Redirect} from 'react-router-dom';
class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
        userToken: null,
    }
  }

  async componentDidMount() {
    const userToken = await localStorage.getItem('userToken');
    if(userToken) {
        this.setState({userToken: userToken})
    } else {
        this.setState({userToken: 'none'})
    }

  }

 condRender() {
     
      if(this.state.userToken!=='none'){
          return <Redirect to={`/login`} />;
      } else { 
        return <Redirect to={`/login`} />;
      }
  }

  sendMessage () {

  }

  sendMessageIfEnter (e) {
    if (e.keyCode === 13) {
      this.sendMessage()
    }
  }
  render () {

    const sendMessage = this.sendMessage.bind(this)
    const sendMessageIfEnter = this.sendMessageIfEnter.bind(this)


    return this.state.userToken ? this.condRender() : null;
    
  }
}

export default Home;