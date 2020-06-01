import io from "socket.io-client";
import {URL_API} from '../environment';

export default  class SocketConnect {
  constructor(token) {
    if (SocketConnect.exists) {
      return SocketConnect.instance
    }
    
    SocketConnect.instance = this
    SocketConnect.exists = true
    this.socket = io(`${URL_API}?token=${token}`, { forceNew: true });
  }

  getSocket() {
    return this.socket;
  }

  static changeExists() {
    SocketConnect.exists = false;
  }
}
