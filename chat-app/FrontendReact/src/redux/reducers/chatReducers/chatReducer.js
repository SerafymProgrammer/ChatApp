const initialState = {
  allUsers: [],
  isConnected: false,
  socket: null,
  messages: [],
};

export default function chatReducer(state = initialState, action) {
  switch (action.type) {
    case "ALL_USERS":
      return {
        ...state,
        allUsers: action.allUsers,
      };

    case "IS_CONNECTED":
      return {
        ...state,
        isConnected: action.isConnected,
      };
    case "SET_SOCKET":
      return {
        ...state,
        socket: action.socket,
      };
    case "ALL_MESSAGES":
      return {
        ...state,
        messages: action.messages,
      };
    default:
      return state;
  }
}
