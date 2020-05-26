import SocketConnect from "../../../services/chat.service";

export function initWebSocketConnection(dispatch) {
  return async () => {
    let token = await localStorage.getItem("userToken");
    let socket = new SocketConnect(token).getSocket();

    if (socket) {
      dispatch(setSocket(socket));
    }
  };
}

export function setSocket(socket) {
  return {
    type: "SET_SOCKET",
    socket,
  };
}

export function AllUsers(allUsers) {
  return {
    type: "ALL_USERS",
    allUsers,
  };
}

export function isConnected(isConnected) {
  return {
    type: "IS_CONNECTED",
    isConnected,
  };
}

export function allMessages(messages) {
  return {
    type: "ALL_MESSAGES",
    messages,
  };
}

