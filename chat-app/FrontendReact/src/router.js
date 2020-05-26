import React from "react";
import {
  Switch,
  Route,
} from "react-router-dom";
import SignIn from './components/authPage/SignIn'
import ChatPage from './components/chatPage/chat'
import Home from './components/home'

 const AppRouter = () => 
(
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route  path="/login" component={SignIn}/>
          <Route path="/chat" component={ChatPage}/>
        </Switch>
);

export default AppRouter;



