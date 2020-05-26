import React, { Component } from "react";
import InputMessageForm from "./chat-components/inputMessage";
import MessageContainer from "./chat-components/messageContainer";
import UsersList from "./chat-components/usersContainer";
import * as actions from "../../redux/actions/chatActions/chat.actions";
import * as authActions from "../../redux/actions/authActions/auth.actions";
import { connect } from "react-redux";
import { Container } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import Header from "./chat-components/chatHeader";
import jwt from 'jwt-decode';

const ChatContainer = styled(Container)({
  background: "#6d81af",
  display: "flex",
  flexDirection: "row-reverse",
  margin: 0,
  padding: 0,
  height: 800,
  position: 'relative',
  maxHeight: 1000,
  "@media (max-height:900px)": {
    height: 700,
    maxHeight: 900,
  },
  "@media (max-height:800px)": {
    height: 600,
    maxHeight: 800,
  },
  "@media (max-height:700px)": {
    height: 500,
    maxHeight: 700,
  },
  "@media (max-height:600px)": {
    height: 400,
    maxHeight: 600,
  },
  "@media (max-height:500px)": {
    height: 300,
    maxHeight: 500,
  },
  "@media (max-height:400px)": {
    height: 200,
    maxHeight: 400,
  },
});

class ChatPage extends Component {
  colorNickName = "white";
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      isAdmin: false,
      currentUser: "",
      isMuted: false,
      showUsersContainer: true,
      usersListMobile: false
    };
  }

  componentWillUnmount() {
    this.props.isConnected(false);
  }

  async componentDidMount() {
    let token = await localStorage.getItem("userToken");
    if (!token) {
      window.location.href = '/login';
      return;
    }
    const decodedUser = jwt(token);
    window.matchMedia("(max-width: 400px)").addListener((e)=>{ this.setState({usersListMobile: e.matches}); });
    await this.props.initConnection();

    const {socket} = this.props;

    socket.on("users", (res) => {
      this.props.setOnlineUsers(res);
    });

    socket.on("previousMessages", (res) =>
      this.setState({
        messages: res,
      })
    );

    socket.on("error", (res) =>{
      alert(res.msg);
      window.location.href = '/login';
    });

    socket.on("initialMuteStatus", (IsMute) =>{
      this.setState({ isMuted: IsMute });
    });

    socket.on("mute", (IsMute) => {
      this.props.setIsMuteStatus(IsMute);
      this.setState({ isMuted: IsMute });
    });

    socket.on("chat", (res) =>
      this.setState({
        messages: [...this.state.messages, res],
      })
    );

    socket.on("disconnect", (socket) => {
      localStorage.removeItem("userToken");
      window.location.href = '/login';
    });
    
    this.colorNickName = decodedUser.nickNameColor;
    this.setState({
      isAdmin: decodedUser.isAdmin,
      currentUser: decodedUser.nickName,
    });

    this.props.isConnected(true);
  }

  setMuteStatus(user) {
    this.props.socket.emit("mute", user.id);
  }

  setBan(user) {
    this.props.socket.emit("ban", user.id);
  }

  sendMsg(message) {
    this.props.socket.emit("chat", JSON.stringify(message));
  }

  async logout() {
    await localStorage.removeItem("userToken");
    this.props.socket.disconnect(true);
    window.location.href = '/login';
  }

  render() {

    const { isConnected, onlineUsers } = this.props;
    const { isAdmin, currentUser, showUsersContainer, usersListMobile} = this.state;

    return isConnected && onlineUsers.length>0 ? (
      <Container style={{ display: "flex", flexDirection: "column" }}>
        <Header
          username={currentUser}
          colorNickName={this.colorNickName}
          showHideUsersList={() =>
            this.setState({
              showUsersContainer: !this.state.showUsersContainer,
            })
          }
          logout={() => this.logout()}
        />
        <ChatContainer>
          <UsersList
            users={onlineUsers}
            isAdmin={isAdmin}
            userName={currentUser}
            setMuteStatus={(user) => this.setMuteStatus(user)}
            setBan={(user) => this.setBan(user)}
            showUsersContainer={showUsersContainer}
            usersListMobile = {usersListMobile}
          />
          <MessageContainer
            messages={this.state.messages}
            username={this.state.currentUser}
          />
        </ChatContainer>
        {!this.state.isMuted ? (
          <InputMessageForm handleSubmit={(message) => this.sendMsg(message)} />
        ) : null}
      </Container>
    ) : null;
  }
}

function mapStateToProps(state) {
  return {
    isConnected: state.chatReducer.isConnected,
    onlineUsers: state.chatReducer.onlineUsers,
    messages: state.chatReducer.messages,
    socket: state.chatReducer.socket,
    isMuted: state.chatReducer.isMuted,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    initConnection: () => dispatch(actions.initWebSocketConnection(dispatch)),
    setOnlineUsers: (onlineUsers) =>
      dispatch(actions.allOnlineUsers(onlineUsers)),
    isConnected: (status) => dispatch(actions.isConnected(status)),
    setIsMuteStatus: (status) => dispatch(actions.setIsMuteStatus(status)),
    setIsLoggedIn: (status) => dispatch(authActions.isSignedInUser(status)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
