import io from "socket.io-client";

export default  class SocketConnect {
  constructor(token) {
    if (SocketConnect.exists) {
      return SocketConnect.instance
    }
    SocketConnect.instance = this
    SocketConnect.exists = true
    this.socket = io(`http://localhost:3000?token=${token}`, { forceNew: true });
  }

  getSocket() {
    return this.socket;
  }
}
