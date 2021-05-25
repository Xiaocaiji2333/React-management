import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Select,
  Input
} from 'antd';

const Item = Form.Item;
const Option = Select.Option;

/*
添加/修改用户的form组件
 */
export default class AdminorForm extends PureComponent {
  form = React.createRef();

  static propTypes = {
    setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
    adminor: PropTypes.object
  }

  componentDidMount () {
    this.props.setForm(this.form);
  }

  render() {
    const { adminor } = this.props;
    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: { span: 4 },  // 左侧label的宽度
      wrapperCol: { span: 15 }, // 右侧包裹的宽度
    }

    return (
      <Form { ...formItemLayout } ref={ this.form }>
        <Item label='管理员名' name='username' initialValue={ adminor.username ? adminor.username : '' }
        rules={ [(adminor._id ? { required: false } : { required: true, message: '用户名不能为空！' }),
        { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是字母，数字或下划线组成！' }] }>
          <Input placeholder='请输入管理员名称'/>
        </Item>

        <Item label='密码' name='password'
        rules={ [(adminor._id ? { required: false } : { required: true, message: '密码不能为空！' }),
          { pattern: /^[a-zA-Z0-9]+$/, message: '密码必须是字母或数字组成！' },
          { max: 16, message: '密码不能高于16位！' },
          ] }>
          <Input type='password' placeholder='请输入密码'/>
        </Item>
        
        <Item label='手机号' name='phone' initialValue={ adminor.phone ? adminor.phone : '' }
        rules={ [
          { pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, message: '手机格式不正确！' },
          ] }>
          <Input placeholder='请输入手机号'/>
        </Item>

        <Item label='邮箱' name='email' initialValue={ adminor.email ? adminor.email : '' }
        rules={ [
          { pattern: /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/, message: '邮箱格式不正确！' },
          ] }>
          <Input placeholder='请输入邮箱'/>
        </Item>

        <Item label='地址' name='address' initialValue={ adminor.address ? adminor.address : '' }>
          <Input placeholder='请输入地址'/>
        </Item>
      </Form>
    )
  }
}
