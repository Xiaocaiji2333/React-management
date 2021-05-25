import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { 
  BackTop,
} from 'antd';

import memoryUtils from '../../utils/memoryUtils';
import Head from '../../components/head_customer/head';
import Home from './home/home';
import Order from './order/order';
import Comment from './comment/comment';
import Search from './search/search';
import Mycenter from './mycenter/mycenter';
import Factory from './factory/factory';
import NotFound from './not-found/not-found';
import Detail from './detail/detail';

import './index.less';

export default class Customer extends Component {

  render() {
    const { user } = memoryUtils;
    // 如果内存没有存储user => 当前没有登陆
    if(!user || !user._id) {
      // 自动跳转到登陆
      return <Redirect to='/login'/>;
    }
    return (
      <div>
        <BackTop style={{ right: '60px', bottom: '60px' }} visibilityHeight={ 40 }/>
        <Head user={ user } refresh={ () => { this.forceUpdate(); } }/>
        <div className='common_width'>
          <Switch>
            <Redirect from='/customer' exact to='/customer/home'/>
            <Route path='/customer/home' component={ Home }/>
            <Route path='/customer/order' component={ Order }/>
            <Route path='/customer/comment' component={ Comment }/>
            <Route path='/customer/search' component={ Search }/>
            <Route path='/customer/mycent' component={ Mycenter }/>
            <Route path='/customer/factory' component={ Factory }/>
            <Route path='/customer/detail' component={ Detail } />
            <Route component={ NotFound }/>
          </Switch>
        </div>
      </div>
    );
  }
}
