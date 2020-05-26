import React, { useEffect, useRef } from "react";
import { Container } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import Message from "./message";
import moment from "moment";

const MessagesContainer = styled(Container)({
  background: "inherit",
  display: "flex",
  flexDirection: "column",
  overflowY: "scroll",
  height: "inherit",
  maxHeight: "inherit",
  paddingBottom: 10,
});

const MessageContainer = (props) => {
  const { messages, username } = props;
  const myRef = useRef(null);

  useEffect(() => {
    myRef.current.scrollTop = myRef.current.scrollHeight;
  }, [messages, myRef]);

  return (
    <MessagesContainer ref={myRef}>
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
    </MessagesContainer>
  );
};

export default MessageContainer;
