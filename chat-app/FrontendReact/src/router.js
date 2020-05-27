import React from "react";
import {
  Switch,
  Route,
} from "react-router-dom";
import SignIn from './components/authPage/SignIn';
import ChatPage from './components/chatPage/chat';
import Home from './components/home';
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import {isAuthGuard} from './guards/isAuthGuard';
import Loading from './components/loading';
import NotFound from './components/error';

 const AppRouter = () => 
(
  <GuardProvider guards={[isAuthGuard]} loading={Loading} error={NotFound}>
        <Switch>
          <GuardedRoute path="/login" exact component={SignIn} meta={{ auth: true }}/>
          <GuardedRoute path="/" exact component={Home} meta={{ auth: true }} />
          <GuardedRoute path="/chat" exact component={ChatPage} meta={{ auth: true }} />
          <GuardedRoute path="*" component={NotFound} />
        </Switch>
  </GuardProvider>
);

export default AppRouter;



