import React from "react";
import { Provider } from "react-redux";
import store from './configure-store';
import { Router } from "react-router-dom";
import AppRouter from "./router";
import history from "./services/history";

const mainStore = store;
const App = () => {
  return (
  <Provider store={mainStore}>
    <Router history={history}>
      <AppRouter />
    </Router>
   </Provider>
  );
};

export default App;
