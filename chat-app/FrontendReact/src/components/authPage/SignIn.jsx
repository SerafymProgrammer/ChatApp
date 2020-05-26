import React, { Component } from "react";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import LockIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import SignInForm from "./form/SignInForm";
import * as actions from "../../redux/actions/authActions/auth.actions";
import BoxCenter from "./UI/box/Center";
import randomColor from "randomcolor";
import { getRandomInt } from "../../services/helpers";
import {colorsHues} from '../../constants'; 


class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    let token = await localStorage.getItem("userToken");
    if (token) {
      window.location.href = "/chat";
      return;
    }
  }

  login({ id, username, password }) {

    this.props
      .signIn({
        nickName: username,
        password: password,
        nickNameColor: randomColor({
          luminosity: "dark",
          hue: colorsHues[getRandomInt(0, 5)],
        }),
      })
      .catch((ex) => {
        alert(ex.message);
      });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.isLoggedIn !== this.props.isLoggedIn &&
      this.props.isLoggedIn
    ) {
      window.location.href = "/chat";
    }
  }

  render() {
    const { isFetching } = this.props;

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
      </BoxCenter>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.authReducer.isLoggedIn,
    isFetching: state.authReducer.isFetching,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    signIn: (user) => dispatch(actions.signIn(user)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
