import * as actionTypes from '../../actions/chatActions/actions.types'

const initialState = {
  users: [],
  isConnected: false,
  socket: null,
  messages: [],
};

export default function chatReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.USERS:
      return {
        ...state,
        users: action.users,
      };

    case actionTypes.IS_CONNECTED:
      return {
        ...state,
        isConnected: action.isConnected,
      };
    case actionTypes.SET_SOCKET:
      return {
        ...state,
        socket: action.socket,
      };
    case actionTypes.ALL_MESSAGES:
      return {
        ...state,
        messages: action.messages,
      };
    default:
      return state;
  }
}
