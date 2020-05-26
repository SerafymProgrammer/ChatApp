import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return <Redirect to={`/login`} />; 
  }
}

export default Home;