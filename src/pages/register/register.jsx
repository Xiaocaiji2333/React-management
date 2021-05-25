import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  message,
  Radio,
} from 'antd';
import { 
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  MailOutlined
} from '@ant-design/icons';
import { reqRegister } from '../../api/index';
import logo from '../../assets/images/img.png';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';

import './register.less';

const Item = Form.Item;

export default class Register extends Component {
  formRef = React.createRef();

  validDate = (_, value) => {
    // if (value.length <= 4) {
    //   return Promise.reject('密码不能低于4位！')
    // } else {
      return Promise.resolve()
    // }
  }

  register = () => {
    // console.log(this.formRef.current)
    // const { username, password } = this.formRef.current.getFieldsValue();
    this.formRef.current.validateFields(['username', 'password', 'phone', 'email'])
      .then(value => {
      // console.log(value);
      const { username, password, phone, email } = value;
      reqRegister({ username, password, phone, email })
        .then(response => {
          if (response.status === 0) {
            message.success('注册成功！');
            this.props.history.replace('/login');
          } else {
            message.error(response.msg);
          }
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <div className='register'>
        <header className='register-header'>
          <img src={ logo } alt="logo"/>
          <h1>React项目：网上花店管理系统</h1>
        </header>
        <section className='register-content'>
          <h3>用户注册</h3>
          <Form ref={ this.formRef } onSubmitCapture={ this.register } className='register-form'>
            <Item name='username' rules={ [{ required: true, message: '用户名不能为空！' },
              { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是字母，数字或下划线组成！' }] }>
              <Input prefix={ <UserOutlined style={ { color: 'rgba(0,0,0,.25)' } }/> }
                type='text' placeholder='用户名'></Input>
            </Item>

            <Item name='password' rules={ [{ required: true, message: '密码不能为空！' },
              { pattern: /^[a-zA-Z0-9]+$/, message: '密码必须是字母或数字组成！' },
              { max: 16, message: '密码不能高于16位！' },
              { validator: this.validDate }
              ] }>
              <Input prefix={ <LockOutlined style={ { color: 'rgba(0,0,0,.25)' } }/> }
                type='password' placeholder='密码'></Input>
            </Item>

            <Item name='phone' rules={ [
              { pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, message: '手机格式不正确！' },
              ] }>
              <Input prefix={ <MobileOutlined style={ { color: 'rgba(0,0,0,.25)' } }/> }
                type='tel' placeholder='手机号'></Input>
            </Item>

            <Item name='email' rules={ [
              { pattern: /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/, message: '邮箱格式不正确！' },
              ] }>
              <Input prefix={ <MailOutlined style={ { color: 'rgba(0,0,0,.25)' } }/> }
                type='email' placeholder='邮箱'></Input>
            </Item>

            <Button type='primary' htmlType='submit' className='register-form-button'>注册</Button>
            <div style={{ textAlign: 'center', marginTop: '16px' }}><Link to='/login'>登录</Link></div>
          </Form>
        </section>
      </div>
    );
  }
}
