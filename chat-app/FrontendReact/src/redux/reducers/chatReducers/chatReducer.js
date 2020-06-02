import * as actionTypes from '../../actions/chatActions/actions.types'

const initialState = {
  users: [],
  isConnected: false,
  socket: null,
  messages: [],
  roomName: 'default',
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
    case actionTypes.FOCUS_ROOM:
      return {
        ...state,
        roomName: action.roomName,
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
