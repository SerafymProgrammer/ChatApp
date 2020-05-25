const initialState = {
  isLoggedIn: false,
  allUsers: [],
  isConnected: false,
  isFetching: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "IS_LOGGED_IN":
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      };
    case "IS_FETCHING":
      return {
        ...state,
        isFetching: action.isFetching,
      };
    default:
      return state;
  }
}
