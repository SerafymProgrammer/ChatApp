import React, { Component } from 'react'
import { Container } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Message from './message';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import moment from 'moment';

const ChatContainer = styled(Container)({
    background: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    height: 'inherit',
    maxHeight: 'inherit',
});




const MessageContainer = (props) => {
    const { messages, username } = props;
    return (
        <ChatContainer>
              {messages.map((item)=> (
                              <Message  timeMessage= {moment(item.timeMessage).calendar()} 
                                        authorMessage= {item.authorMessage} 
                                        textMessage= {item.textMessage}
                                        username = {username}
                                        colorNickName={item.colorAuthorName}
                                        />
              ) )}
        </ChatContainer>
    )
}

export default MessageContainer;