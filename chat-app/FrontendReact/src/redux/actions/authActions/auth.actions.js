import AuthService from "../../../services/auth.service";

export const isSignedInUser = (isLoggedIn) => {
  return {
    type: "IS_LOGGED_IN",
    isLoggedIn,
  };
};

export const setIsFetching = (isFetching) => {
  return {
    type: "IS_FETCHING",
    isFetching,
  };
};

export function signIn(user) {
  return async (dispatch) => {
    await dispatch(setIsFetching(true));
    await AuthService.loginUser(user)
      .then(async (response) => {
        let a = await response.json();
        return a;
      })
      .then((response) => {
        if (response.status === 500) {
          dispatch(setIsFetching(false));
          alert(response.msg);
        } else if (response.userToken && response.status === 200) {
          localStorage.setItem("userToken", response.userToken);
          dispatch(isSignedInUser(true));
        } else {
          throw new Error("Unknown error");
        }
      })
      .catch((error) => {
        alert(error.message);
        dispatch(setIsFetching(false));
      });
  };
}
