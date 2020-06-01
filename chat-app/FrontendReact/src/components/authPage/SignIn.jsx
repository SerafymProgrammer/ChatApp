import React, { useEffect, useCallback,  } from "react";
import Avatar from "@material-ui/core/Avatar";
import LockIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import SignInForm from "./form/SignInForm";
import * as actions from "../../redux/actions/authActions/auth.actions";
import BoxCenter from "./UI/box/Center";
import { useDispatch, useSelector } from 'react-redux';


const SignIn = (props) => {
  const dispatch = useDispatch();

  const signIn = useCallback(
    (user) => dispatch(actions.signIn(user)),
    [dispatch]
  );

  const isFetching = useSelector(state => state.authReducer.isFetching);

  const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);

  useEffect(()=> {
   if(isLoggedIn)
   props.history.push("/chat");
  }, [isLoggedIn])

  const login = ({username, password}) => {
  
      signIn({
        nickName: username,
        password: password,
      })
      .catch((ex) => {
        alert(ex.message);
      });
  }

  return (
    <BoxCenter>
      <Avatar>
        <LockIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <SignInForm
        handleSubmit={(data) => login(data)}
        isFetching={isFetching}
      />
    </BoxCenter>
  );


}

export default SignIn;
