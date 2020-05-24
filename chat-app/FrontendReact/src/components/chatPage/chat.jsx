import React, { Component } from "react";
import ChatService from "../../services/chat.service";
import InputMessageForm from "./inputMessage";
import MessageContainer from "./messageContainer";
import UsersList from "./usersContainer";
import io from "socket.io-client";
import * as actions from "../../redux/actions/chatActions/chat.actions";
import * as authActions from "../../redux/actions/authActions/auth.actions";
import { connect } from "react-redux";
import moment from "moment";
import jwt from "jwt-decode";
import { Container } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import Header from "./chatHeader";
import Box from "@material-ui/core/Box";

const ChatContainer = styled(Container)({
  background: "#6d81af",
  display: "flex",
  flexDirection: "row-reverse",
  margin: 0,
  padding: 0,
  height: 815,
  position: 'relative',
  maxHeight: 1000,
  ["@media (max-height:900px)"]: {
    // eslint-disable-line no-useless-computed-key
    height: 715,
    maxHeight: 900,
  },
  ["@media (max-height:800px)"]: {
    // eslint-disable-line no-useless-computed-key
    height: 615,
    maxHeight: 800,
  },
  ["@media (max-height:700px)"]: {
    // eslint-disable-line no-useless-computed-key
    height: 515,
    maxHeight: 700,
  },
  ["@media (max-height:600px)"]: {
    // eslint-disable-line no-useless-computed-key
    height: 415,
    maxHeight: 600,
  },
  ["@media (max-height:500px)"]: {
    // eslint-disable-line no-useless-computed-key
    height: 315,
    maxHeight: 500,
  },
  ["@media (max-height:400px)"]: {
    // eslint-disable-line no-useless-computed-key
    height: 250,
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
  UNSAFE_componentWillMount() {
    debugger;
  }


  async componentDidMount() {
    let token = await localStorage.getItem("userToken");
    if (!token) {
      this.props.history.push("/login");
      return;
    }

    const handler = e => { this.setState({usersListMobile: e.matches}); if(e.matches) {
      this.setState({showUsersContainer: false});
    }};
    window.matchMedia("(max-width: 400px)").addListener(handler);
    await this.props.initConnection();
    // this.props.socket.on("users", (res) => dispatch(AllUsers(res)));
    this.props.socket.on("onlineUsers", (res) =>
      this.props.setOnlineUsers(res)
    );
    this.props.socket.on("users", (res) => {
      this.props.setOnlineUsers(res);
    });
    this.props.socket.on("previousMessages", (res) =>
      this.setState({
        messages: res,
      })
    );
    this.props.socket.on("initialMuteStatus", (IsMute) =>
      this.props.setIsMuteStatus(IsMute)
    );
    this.props.socket.on("mute", (IsMute) => {
      debugger;
      console.log(IsMute);
      this.props.setIsMuteStatus(IsMute);
      this.setState({ isMuted: IsMute });
    });
    this.props.socket.on("chat", (res) =>
      this.setState({
        messages: [...this.state.messages, res],
      })
    );

    this.props.socket.on("connection", (socket) => {
      this.props.socket.on("disconnect", (reason) => {
        localStorage.removeItem("userToken");
        this.props.history.push("/login");
      });
    });

    this.props.socket.on("disconnect", (socket) => {
      localStorage.removeItem("userToken");
      this.props.history.push("/login");
    });
    this.props.socket.on("disconnected", (reason) => {});
    const decodedUser = jwt(token);
    this.colorNickName = decodedUser.nickNameColor;
    this.setState({
      isAdmin: decodedUser.isAdmin,
      currentUser: decodedUser.nickName,
    });
    // this.props.socket.emit("onlineUsers", token);

    this.props.isConnected(true);
  }

  async setMuteStatus(user) {
    this.props.socket.emit("mute", user.id);
  }

  async setBan(user) {
    this.props.socket.emit("ban", user.id);
  }
  handleNewUserMessage = (newMessage) => {
    console.log(`New message incomig! ${newMessage}`);
    // Now send the message throught the backend API
  };

  async sendMsg(message) {
    this.setState({
      messages: [...this.state.messages, message],
    });
    this.props.socket.emit("chat", JSON.stringify(message));
  }

  async logout() {
    await localStorage.removeItem("userToken");
    this.props.socket.disconnect(true);
    this.props.history.push("/login");
  }

  render() {
    const { isConnected, onlineUsers } = this.props;

    const { isAdmin, currentUser, showUsersContainer, usersListMobile} = this.state;

    return (
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
            colorNickName={this.colorNickName}
          />
        </ChatContainer>
        {!this.state.isMuted ? (
          <InputMessageForm handleSubmit={(message) => this.sendMsg(message)} />
        ) : null}
      </Container>
    );
    // isConnected && onlineUsers.length > 0 ?

    //  : null;
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
