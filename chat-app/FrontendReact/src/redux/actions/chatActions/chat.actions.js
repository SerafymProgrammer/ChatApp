import SocketConnect from "../../../services/chat.service";
import io from "socket.io-client";


export function initWebSocketConnection(dispatch) {
  return async () => {
    let token = await localStorage.getItem("userToken");
    let socket = new SocketConnect(token).getSocket();
    
    if(socket) {

      dispatch(setSocket(socket));
    } 
  };
}
  
// export function getOneDay(dayNumber) {
//     return async (dispatch) => {
//       await SheduleService.getOneDay(dayNumber)
//         .then(response => {
//           return response.json();
//         })
//         .then(response => {
//           dispatch(selectedDay(response));
//         })
//         .catch(error => console.log(error));
//     };
//   }
  
//   export function addExerciseOfSelectedDay(dayNumber, exerciseList) {
//     return async (dispatch) => {
//       await SheduleService.updateExercisesOfSelectedDay(dayNumber, exerciseList)
//         .then(response => {
//           dispatch(getAllDays());
//           return;
//         })
//         .catch(error => console.log(error));
//     };
//   }
  
export function setSocket(socket) {
  return {
    type: 'SET_SOCKET',
    socket,
  };
}

  export function allOnlineUsers(onlineUsers) {
    return {
      type: 'ONLINE_USERS',
      onlineUsers,
    };
  }
  
  export function AllUsers(allUsers) {
    return {
      type: 'ALL_USERS',
      allUsers,
    };
  }

  export function isConnected(isConnected) {
    return {
      type: 'IS_CONNECTED',
      isConnected,
    };
  }

  export function allMessages(messages) {
    return {
      type: 'ALL_MESSAGES',
      messages,
    };
  }

  export function setIsMuteStatus(isMuted) {
    return {
      type: 'IS_MUTED',
      isMuted,
    };
  }