import AuthService from "../../../services/auth.service";
import * as actionTypes from './actions.types';
import store from 'store';

export const setIsFetching = (isFetching) => {
  return {
    type: actionTypes.IS_FETCHING,
    isFetching,
  };
};

export const isSignedInUser = (isLoggedIn) => {
  return {
    type: actionTypes.IS_LOGGED_IN,
    isLoggedIn,
  };
};

export function signIn(user) {
  return async (dispatch) => {
    await dispatch(setIsFetching(true));
    await AuthService.loginUser(user)
      .then( (response) => {
        const {token, isAdmin, nickNameColor, nickName} = response.data;
        store.set("token", token);
        store.set("userData", {isAdmin, nickName, nickNameColor});
        dispatch(setIsFetching(false));
        dispatch(isSignedInUser(true));
      })
      .catch((error) => {
        alert(error.response.data);
        dispatch(setIsFetching(false));
      });
  };
}
