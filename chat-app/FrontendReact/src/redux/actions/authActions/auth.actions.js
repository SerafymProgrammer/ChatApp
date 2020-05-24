import AuthService from '../../../services/auth.service';



// export const createUser = (user) => {
//   return {
//       type: types.AUTH_CREATE_USER,
//       user,
//   }
// }

export const isSignedInUser = (isLoggedIn) => {
  return {
      type: "IS_LOGGED_IN",
      isLoggedIn,
  }
}

export function signIn(user) {
    return async (dispatch) => {
          await AuthService.loginUser(user)
          .then(async (response) => {
            let a = await response.json();
            return  a;
          })
          .then((response)=>{
            localStorage.setItem('userToken', response.userToken);
            dispatch(isSignedInUser(true))
          })
          .catch(error => console.log(error));
      };
}

