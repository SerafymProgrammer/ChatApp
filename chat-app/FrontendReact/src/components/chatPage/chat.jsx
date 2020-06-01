import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import InputMessageForm from "./chat-components/inputMessage";
import MessageContainer from "./chat-components/messageContainer";
import UsersList from "./chat-components/usersContainer";
import * as actions from "../../redux/actions/chatActions/chat.actions";
import * as authActions from "../../redux/actions/authActions/auth.actions";
import ChatService from "../../services/chat.service";
import { Container } from "@material-ui/core";
import Header from "./chat-components/chatHeader";
import store from 'store';

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
}));

const ChatPage = (props) => {
  const classes = useStyles();

  const {nickNameColor, isAdmin, nickName} = store.get('userData');
  let colorNickName = nickNameColor;

  const [messages, setMessages] = useState([]);
  const [isCurrentUserAdmin, setIsAdmin] = useState(false);
  const [currentUserNickName, setNickName] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [showUsersContainer, setShowUsersContainer] = useState(true);

  const dispatch = useDispatch();

  const isConnected = useSelector(state => state.chatReducer.isConnected, shallowEqual);
  const users = useSelector(state => state.chatReducer.users, shallowEqual);
  const socket = useSelector(state => state.chatReducer.socket, shallowEqual);

  const initConnection = useCallback(
    () => dispatch(actions.initWebSocketConnection(dispatch)),
    [dispatch]
  );
  const setUsers = useCallback(
    (user) => dispatch(actions.setUsers(user)),
    [dispatch]
  );
  const setIsConnected = useCallback(
    (status) => dispatch(actions.isConnected(status)),
    [dispatch]
  );
  const isSignedInUser = useCallback(
    (status) => dispatch(authActions.isSignedInUser(status)),
    [dispatch]
  );
  const  logout = useCallback(() =>{
    socket.disconnect(true);
    disconnnectAndLogout();
  });
  const disconnnectAndLogout = useCallback(() => {
    store.clearAll();
    isSignedInUser(false);
    ChatService.changeExists();
    props.history.push('/login');
  })

  const setMuteStatus = (user) => socket.emit("mute", user.id);
  const setBan = (id) => socket.emit("ban", id);
  const sendMsg = useCallback((message) => socket.emit("chat", message));

  useEffect(()=> {
    initConnection();
    if(socket) {
    socket.on("users", (res) => setUsers(res));
  
    socket.on("previousMessages", (res) => setMessages(res));

    socket.on("error", (msg) =>{
      alert(msg);
      props.history.push('/login');
    });

    socket.on("initialMuteStatus", (isMuted) =>setIsMuted(isMuted));

    socket.on("mute", (isMuted) =>setIsMuted(isMuted));

    socket.on("chat", (msg) => setMessages([...messages, msg]));

    socket.on("disconnect", (socket) => {
      disconnnectAndLogout();
    });
    setIsAdmin(isAdmin);
    setNickName(nickName);
    setIsConnected(true);
   }
   return ()=> setIsConnected(false);
  }, [users, socket, messages])



  return isConnected && users.length>0 ? (
    <Container style={{ display: "flex", flexDirection: "column" }}>
      <Header
        username={nickName}
        colorNickName={colorNickName}
        showHideUsersList={() => setShowUsersContainer(!showUsersContainer)}
        logout={() => logout()}
      />
      <Container className={classes.chatContainer}>
        <UsersList
          users={users}
          isAdmin={isCurrentUserAdmin}
          userName={currentUserNickName}
          setMuteStatus={(user) => setMuteStatus(user)}
          setBan={(user) => setBan(user)}
          showUsersContainer={showUsersContainer}
        />
        <MessageContainer
          messages={messages}
          username={nickName}
        />
      </Container>
      {!isMuted ? (
        <InputMessageForm handleSubmit={(message) => sendMsg(message)} />
      ) : null}
    </Container>
  ) : null;
}


export default ChatPage;
