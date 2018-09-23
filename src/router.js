import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Layout from './components/Layout';
import Login from "./routes/Login";
import cookie from "./utils/cookie";

function RouterConfig({ history }) {
  history.listen((location, action) => {
    if (!cookie.getCookie('hasLogin')) {
      if (location.pathname !== '/login') {
        history.push('/login')
      }
    }
  })
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Layout} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
