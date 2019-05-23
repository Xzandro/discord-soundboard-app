import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Layout from './pages/Layout';
import Buttons from './pages/Buttons';
import Settings from './pages/Settings';

ReactDOM.render(
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path="/" component={Buttons} />
        <Route exact path="/settings" component={Settings} />
        <Redirect to="/" />
      </Switch>
    </Layout>
  </BrowserRouter>,
  document.getElementById('app')
);
