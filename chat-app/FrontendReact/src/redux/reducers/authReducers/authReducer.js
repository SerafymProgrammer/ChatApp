

const initialState = {
  isLoggedIn: false,
  allUsers: [],
  isConnected: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {

    case "IS_LOGGED_IN":
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      };
    default:
      return state;
  }
}