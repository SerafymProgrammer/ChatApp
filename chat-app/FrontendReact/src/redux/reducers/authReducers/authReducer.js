import * as actionTypes from '../../actions/authActions/actions.types'

const initialState = {
  isLoggedIn: false,
  allUsers: [],
  isConnected: false,
  isFetching: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      };
    case actionTypes.IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    default:
      return state;
  }
}
