import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import { Container } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Message from './message';
import Grid from "@material-ui/core/Grid";
import jwt from "jwt-decode";
import moment from 'moment';

const ChatContainer = styled(Container)({
    background: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'scroll',
    height: 'inherit',
    maxHeight: 'inherit',
    // height: window.innerHeight-((window.innerHeight*15/100)),
    // maxHeight: window.innerHeight-(window.innerHeight*15/100),
});




const MessageContainer = (props) => {
    const { messages, username, colorNickName } = props; 
    return (
        <ChatContainer>
              {messages.map((item)=> (
                              <Message  timeMessage= {moment(item.timeMessage).calendar()} 
                                        authorMessage= {item.authorMessage} 
                                        textMessage= {item.textMessage}
                                        username = {username}
                                        colorNickName={colorNickName}
                                        />
              ) )}
        </ChatContainer>
    )
}

export default MessageContainer;