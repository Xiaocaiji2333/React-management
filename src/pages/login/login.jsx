import React, { Component } from 'react';
import {
  Form,
  Input,
  Button
} from 'antd';
import { 
  UserOutlined,
  LockOutlined
} from '@ant-design/icons';
import logo from '../../assets/images/logo.png';
import './login.less';

const Item = Form.Item;

export default class Login extends Component {
  login = () => {
    
  }

  render() {
    return (
      <div className='login'>
        <header className='login-header'>
          <img src={ logo } alt="logo"/>
          <h1>React项目：后台管理系统</h1>
        </header>
        <section className='login-content'>
          <h3>用户登录</h3>
          <Form onSubmit={ this.login } className='login-form'>
            <Item>
              <Input prefix={ <UserOutlined style={ { color: 'rgba(0,0,0,.25)' } }/> }
                type='text' placeholder='用户名'></Input>
            </Item>
            <Item>
              <Input prefix={ <LockOutlined style={ { color: 'rgba(0,0,0,.25)' } }/> }
                type='password' placeholder='密码'></Input>
            </Item>
            <Button type='primary' htmlType='submit' className='login-form-button'>登录</Button>
          </Form>
        </section>
      </div>
    );
  }
}
