import SocketConnect from "../../../services/chat.service";
import * as actionTypes from './actions.types'

export function initWebSocketConnection(dispatch) {
  return async () => {
    let token = await localStorage.getItem("token");
    let socket = new SocketConnect(token).getSocket();

    if (socket) {
      dispatch(setSocket(socket));
    }
  };
}

export function setSocket(socket) {
  return {
    type: actionTypes.SET_SOCKET,
    socket,
  };
}

export function setFocusRoom(focusRoom) {
  return {
    type: actionTypes.FOCUS_ROOM,
    focusRoom,
  };
}

export function setRooms(rooms) {
  return {
    type: actionTypes.ROOMS,
    rooms,
  };
}

export function setUsers(users) {
  return {
    type: actionTypes.USERS,
    users,
  };
}

export function isConnected(isConnected) {
  return {
    type: actionTypes.IS_CONNECTED,
    isConnected,
  };
}

export function allMessages(messages) {
  return {
    type: actionTypes.ALL_MESSAGES,
    messages,
  };
}

