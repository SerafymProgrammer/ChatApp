import React, { Component } from 'react';
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
      if(this.state.userToken&&this.state.userToken!=='none'){
          return <Redirect to={`/chat`} />;
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
    return this.state.userToken ? this.condRender() : <div>Error loading page</div>; 
  }
}

export default Home;