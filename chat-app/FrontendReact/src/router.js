

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SignIn from './components/auth/SignIn'
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



