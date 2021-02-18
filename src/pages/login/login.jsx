import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  message
} from 'antd';
import { 
  UserOutlined,
  LockOutlined
} from '@ant-design/icons';
import { reqLogin } from '../../api/index';
import logo from '../../assets/images/logo.png';
import './login.less';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';

const Item = Form.Item;

export default class Login extends Component {
  formRef = React.createRef();

  validDate = (_, value) => {
    // if (value.length <= 4) {
    //   return Promise.reject('密码不能低于4位！')
    // } else {
      return Promise.resolve()
    // }
  }

  login = () => {
    // console.log(this.formRef.current)
    // const { username, password } = this.formRef.current.getFieldsValue();
    this.formRef.current.validateFields(['username', 'password']).then(value => {
      // console.log(value);
      const { username, password } = value;
      reqLogin(username, password).then(response => {
        if (response.status === 0) {
          // 保存user
          const user = response.data;
          memoryUtils.user = user; // 保存在内存中
          storageUtils.saveUser(user); // 保存到local中
          message.success('登录成功！');
          this.props.history.replace('/');
        } else {
          message.error(response.msg);
        }
      })
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    // 如果用户已经登陆, 自动跳转到管理界面
    const user = memoryUtils.user;
    if(user && user._id) {
      return <Redirect to='/'/>;
    }
    return (
      <div className='login'>
        <header className='login-header'>
          <img src={ logo } alt="logo"/>
          <h1>React项目：后台管理系统</h1>
        </header>
        <section className='login-content'>
          <h3>用户登录</h3>
          <Form ref={ this.formRef } onSubmitCapture={ this.login } className='login-form'>
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
            <Button type='primary' htmlType='submit' className='login-form-button'>登录</Button>
          </Form>
        </section>
      </div>
    );
  }
}
