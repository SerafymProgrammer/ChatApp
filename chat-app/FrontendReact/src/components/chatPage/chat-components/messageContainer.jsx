import React, { useEffect, useRef, } from "react";
import { Container } from "@material-ui/core";
import Message from "./message";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  messagesContainer: {
    background: "inherit",
    display: "flex",
    flexDirection: "column",
    overflowY: "scroll",
    height: "inherit",
    maxHeight: "inherit",
    paddingBottom: 10,
  },
}));

const MessageContainer = (props) => {
  const { messages, username } = props;
  const myRef = useRef(null);
  const classes = useStyles();
  console.log(messages)

  useEffect(() => {
    myRef.current.scrollTop = myRef.current.scrollHeight;
  }, [messages, myRef]);

  return (
    <Container className={classes.messagesContainer} ref={myRef}>
      {messages.map((item, index) => (
        <Message
          key={`key-msg-${index}`}
          timeMessage={moment(item.timeMessage).calendar()}
          authorMessage={item.authorMessage}
          textMessage={item.textMessage}
          username={username}
          colorNickName={item.colorAuthorName}
        />
      ))}
    </Container>
  );
};

export default MessageContainer;
