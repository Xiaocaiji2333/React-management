import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';

import memoryUtils from '../../utils/memoryUtils';
import LeftNav from '../../components/left-nav';
import Header from '../../components/header';
import Home from './home/home';
import Flower from './flower/flower';
import Product from './product/product';
import Adminor from './adminor/adminor';
import User from './user/user';
import NotFound from './not-found/not-found';
import Order from './order/order';
import Comment from './comment/comment';
import Factor from './factor/factor';

const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {
  render() {
    const user = memoryUtils.user;
    // 如果内存没有存储user => 当前没有登陆
    if(!user || !user._id) {
      // 自动跳转到登陆
      return <Redirect to='/login'/>;
    }
    return (
      <Layout style={{minHeight: '100%'}}>
        <Sider theme='light'>
          <LeftNav/>
        </Sider>
        <Layout>
          <Header/>

          <Content style={{ margin: 20, backgroundColor: '#fff' }}>
            <Switch>
              <Redirect from='/admin' exact to='/admin/home'/>
              <Route path='/admin/home' component={ Home }/>
              <Route path='/admin/flower' component={ Flower }/>
              <Route path='/admin/product' component={ Product }/>
              <Route path='/admin/user' component={ User }/>
              <Route path='/admin/adminor' component={ Adminor }/>
              <Route path="/admin/order" component={ Order }/>
              <Route path="/admin/comment" component={ Comment }/>
              <Route path='/admin/factor' component={ Factor }/>
              <Route component={ NotFound }/>
            </Switch>
          </Content>

          <Footer style={{ textAlign: 'center', color: '#cccccc' }}>欢迎使用花店管理系统</Footer>
        </Layout>
      </Layout>
    );
  }
}
