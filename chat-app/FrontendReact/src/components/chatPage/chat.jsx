import React, { Component } from "react";
import InputMessageForm from "./chat-components/inputMessage";
import MessageContainer from "./chat-components/messageContainer";
import UsersList from "./chat-components/usersContainer";
import * as actions from "../../redux/actions/chatActions/chat.actions";
import * as authActions from "../../redux/actions/authActions/auth.actions";
import { connect } from "react-redux";
import { Container } from "@material-ui/core";
import Header from "./chat-components/chatHeader";
import { withStyles } from '@material-ui/core/styles';
import store from 'store';

const styles = theme => ({
  chatContainer: {
    background: "#6d81af",
    display: "flex",
    flexDirection: "row-reverse",
    margin: 0,
    padding: 0,
    height: 800,
    position: 'relative',
    maxHeight: 1000,
    [theme.breakpoints.down('xs')]: {
      height: 300,
      maxHeight: 600,
    },
    [theme.breakpoints.down('sm')]: {
      height: 600,
      maxHeight: 800,
    },
  },
});

class ChatPage extends Component {
  colorNickName = "white";
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      isAdmin: false,
      nickName: "",
      isMuted: false,
      showUsersContainer: true,
    };
  }

  componentWillUnmount() {
    this.props.isConnected(false);
  }

  async componentDidMount() {
    await this.props.initConnection();

    const {socket} = this.props;

    socket.on("users", (res) => {
      this.props.setUsers(res);
    });

    socket.on("previousMessages", (res) =>
      this.setState({
        messages: res,
      })
    );

    socket.on("error", (msg) =>{
      alert(msg);
      this.props.history.push('/login');
    });

    socket.on("initialMuteStatus", (IsMute) =>{
      this.setState({ isMuted: IsMute });
    });

    socket.on("mute", (IsMute) => {
      this.setState({ isMuted: IsMute });
    });

    socket.on("chat", (res) =>
      this.setState({
        messages: [...this.state.messages, res],
      })
    );

    socket.on("disconnect", (socket) => {
      store.clearAll();
      this.props.history.push('/login');
    });
    const {nickNameColor, isAdmin, nickName} = store.get('userData');
    this.colorNickName = nickNameColor;
    this.setState({
      isAdmin,
      nickName
    });

    this.props.isConnected(true);
  }

  setMuteStatus(user) {
    this.props.socket.emit("mute", user.id);
  }

  setBan(id) {
    this.props.socket.emit("ban", id);
  }

  sendMsg(message) {
    this.props.socket.emit("chat", message);
  }

  async logout() {
    store.clearAll();
    this.props.socket.disconnect(true);
    this.props.isSignedInUser(false);
    this.props.history.push('/login');
  }

  render() {

    const { isConnected, users, classes } = this.props;
    const { isAdmin, nickName, showUsersContainer, messages} = this.state;

    return isConnected && users.length>0 ? (
      <Container style={{ display: "flex", flexDirection: "column" }}>
        <Header
          username={nickName}
          colorNickName={this.colorNickName}
          showHideUsersList={() =>
            this.setState({
              showUsersContainer: !this.state.showUsersContainer,
            })
          }
          logout={() => this.logout()}
        />
        <Container className={classes.chatContainer}>
          <UsersList
            users={users}
            isAdmin={isAdmin}
            userName={nickName}
            setMuteStatus={(user) => this.setMuteStatus(user)}
            setBan={(user) => this.setBan(user)}
            showUsersContainer={showUsersContainer}
          />
          <MessageContainer
            messages={messages}
            username={nickName}
          />
        </Container>
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
    users: state.chatReducer.users,
    messages: state.chatReducer.messages,
    socket: state.chatReducer.socket,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    initConnection: () => dispatch(actions.initWebSocketConnection(dispatch)),
    setUsers: (users) => dispatch(actions.setUsers(users)),
    isConnected: (status) => dispatch(actions.isConnected(status)),
    isSignedInUser: (status) => dispatch(authActions.isSignedInUser(status)),
  };
}

export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChatPage));
