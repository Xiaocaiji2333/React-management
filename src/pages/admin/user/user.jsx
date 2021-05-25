import React, { Component } from 'react';
import {
  Card,
  Button,
  Table,
  Modal,
  message,
  Input
} from 'antd';
import { formatDate } from "../../../utils/dateUtils";
import { PAGE_SIZE } from "../../../utils/constants";
import LinkButton from "../../../components/link-button/index";
import { reqDeleteUser, reqUsers, reqSearchUsers, reqAddOrUpdateUser } from "../../../api/index";
import UserForm from './user-form';

/*
用户路由
 */
export default class User extends Component {

  state = {
    users: [], // 所有用户列表
    isShow: false, // 是否显示确认框
    searchName: '',
    loading: false
  }

  initColumns = () => {
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },

      {
        title: '电话',
        dataIndex: 'phone'
      },
      {
        title: '地址',
        dataIndex: 'address'
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: formatDate
      },
      {
        title: '操作',
        render: (user) => (
          <span>
            <LinkButton onClick={ () => this.showUpdate(user) }>修改</LinkButton>
            <LinkButton onClick={ () => this.deleteUser(user) }>删除</LinkButton>
          </span>
        )
      },
    ]
  }

  /*
  显示添加界面
   */
  showAdd = () => {
    this.user = null; // 去除前面保存的user
    this.setState({ 
      isShow: true 
    });
  }

  /*
  显示修改界面
   */
  showUpdate = (user) => {
    this.user = user; // 保存user
    this.setState({
      isShow: true
    });
  }

  /*
  删除指定用户
   */
  deleteUser = (user) => {
    Modal.confirm({
      title: `确认删除${ user.username }吗?`,
      onOk: async () => {
        const result = await reqDeleteUser(user._id);
        if(result.status === 0) {
          message.success('删除用户成功!');
          this.getUsers();
        }
      }
    })
  }

  /*
  添加/更新用户
   */
  addOrUpdateUser = (type) => {
    console.log(type);
    this.form.current.validateFields(['username', 'password', 'phone', 'email'])
      .then(async () => {
        // 1. 收集输入数据
        const user = this.form.current.getFieldsValue();
        user.type = type;
        // 如果是更新, 需要给user指定_id属性
        if (this.user) {
          user._id = this.user._id;
        }
        console.log(user);
        // 2. 提交添加的请求
        const result = await reqAddOrUpdateUser(user);
        // 3. 更新列表显示
        if(result.status === 0) {
          message.success(`${ this.user ? '修改' : '添加' }用户成功`);
          this.getUsers();
        }
        this.setState({ isShow: false });
        this.form.current.resetFields();
      })
      .catch((err) => console.log(err))
  }

  /*
  获取用户列表
  */
  getUsers = async () => {
    this.setState({ ...this.state, loading: true });
    const { searchName } = this.state;
    let result;
    if (searchName) {
      result = await reqSearchUsers({ searchName })
    } else {
      result = await reqUsers();
    }
    this.setState({ ...this.state, loading: false });
    if (result.status === 0) {
      const { users } = result.data;
      this.setState({
        ...this.state,
        users
      })
    }
  }

  componentWillMount () {
    this.initColumns();
  }

  componentDidMount () {
    this.getUsers();
  }

  render() {
    const { users, isShow, searchName, loading } = this.state;
    const user = this.user || {};
    const title = (
      <span>
        <Input
          placeholder='用户名称'
          style={{ width: 150, margin: '0 15px' }}
          value={ searchName }
          onChange={ event => this.setState({ ...this.state, searchName: event.target.value }) }
        />
        <Button type='primary' onClick={ () => this.getUsers() }>搜索</Button>
      </span>
    )
    const extra = <Button type='primary' onClick={ this.showAdd }>添加用户</Button>

    return (
      <Card title={ title } extra={ extra }>
        <Table
          loading={ loading }
          bordered
          rowKey='_id'
          dataSource={ users }
          columns={ this.columns }
          pagination={{ defaultPageSize: PAGE_SIZE }}
        />

        <Modal
          title={ user._id ? '修改用户' : '添加用户' }
          visible={ isShow }
          onOk={ () => this.addOrUpdateUser(0) }
          onCancel={() => {
            // console.log(this.form);
            this.form.current.resetFields();
            this.setState({ isShow: false });
          }}
        >
          <UserForm
            setForm={ form => this.form = form }
            user={ user }
          />
        </Modal>

      </Card>
    )
  }
}