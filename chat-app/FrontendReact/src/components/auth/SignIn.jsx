import React, { Component } from 'react'
import PropTypes from "prop-types";
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import SignInForm from './form/SignInForm'
import * as actions from '../../redux/actions/authActions/auth.actions'
import BoxCenter from './UI/box/Center'
import AuthService from '../../services/auth.service';
import {
  useHistory,
  useLocation
} from "react-router-dom";
import randomColor from 'randomcolor';
import { getRandomInt } from '../../services/helpers';

const colorsHues = ['red', 'orange', 'yellow', 'purple', 'green']

class SignIn extends Component {

  constructor(props) {
    super(props)
    
  this.state = {
    isFetching: false,
    didInvalidate: false,
  }
  }


  login({id, username, password}) {
    this.setState((state) => ({
      isFetching: true,
      didInvalidate: false,
    }))
    

    this.props.signIn({id: null, nickName:username, password: password, nickNameColor: randomColor(
      {
        hue: colorsHues[getRandomInt(0, 5)]
      }
    )})
    .catch(ex => {
      console.log(ex)
    })
  }

  componentDidUpdate(prevProps) {
    if ((prevProps.isLoggedIn != this.props.isLoggedIn) && (this.props.isLoggedIn)) {
        this.props.history.push('/chat')
    }
  }

  render() {
    const { isFetching } = this.state

    return (
      <BoxCenter>
        <Avatar>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <SignInForm 
          handleSubmit={(data) => this.login(data)}
          isFetching={isFetching}
        />
        <p>Need an account? <Link to='/signup'>Sign up</Link></p>
      </BoxCenter>
    )
  }
}


function mapStateToProps(state) {
  return {
    isLoggedIn: state.authReducer.isLoggedIn,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signIn: (user) => dispatch(actions.signIn(user)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

