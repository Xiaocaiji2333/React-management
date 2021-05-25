import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Login from './pages/login/login';
import Register from './pages/register/register';
import Admin from './pages/admin';
import Customer from './pages/customer';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Redirect from='/' exact to='/login'/>
          <Route path='/login' component={ Login }/>
          <Route path='/register' component={ Register }/>
          <Route path='/admin' component={ Admin }/>
          <Route path='/customer' component={ Customer }/>
        </Switch>
      </BrowserRouter>
    );
  }
}
