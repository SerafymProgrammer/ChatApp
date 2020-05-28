import React, { Component } from "react";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import LockIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import SignInForm from "./form/SignInForm";
import * as actions from "../../redux/actions/authActions/auth.actions";
import BoxCenter from "./UI/box/Center";


class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  login({username, password}) {
    this.props
      .signIn({
        nickName: username,
        password: password,
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
      this.props.history.push("/chat");
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
    isFetching: state.authReducer.isFetching,
    isLoggedIn: state.authReducer.isLoggedIn,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    signIn: (user) => dispatch(actions.signIn(user)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
