import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import OrderHome from './home';
import OrderDetail from './detail';

import './order.less';

/*
成品路由
 */
export default class Product extends Component {
  render() {
    return (
      <Switch>
        <Route path='/admin/order' component={ OrderHome } exact/>
        <Route path='/admin/order/detail' component={ OrderDetail }/>
        <Redirect to='/admin/order'/>
      </Switch>
    )
  }
}