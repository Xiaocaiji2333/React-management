import React, { Component } from 'react';
import {
  Card,
  Button,
  Table,
  Modal,
  message,
  Input,
} from 'antd';
import { formatDate } from "../../../utils/dateUtils";
import { PAGE_SIZE } from "../../../utils/constants";
import memoryUilts from '../../../utils/memoryUtils';
import LinkButton from "../../../components/link-button";
import { reqDeleteUser, reqAdminor, reqSearchAdminor, reqAddOrUpdateUser } from "../../../api";
import AdminorForm from './adminor-form';

/*
管理员路由
 */
export default class Adminor extends Component {

  state = {
    adminors: [], // 所有管理员列表
    isShow: false, // 是否显示确认框
    searchName: '',
    loading: false
  }

  initColumns = () => {
    const { user: { type } } = memoryUilts;
    this.columns = [
      {
        title: '管理员名',
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
        dataIndex: 'address',
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: formatDate
      },
      {
        title: '操作',
        render: (adminor) => (
          <span>
            <LinkButton disabled={ type === 2 ? true : false } style={{ color: type === 2 ? 'gray' : '' }} onClick={ () => this.showUpdate(adminor) }>修改</LinkButton>
            <LinkButton disabled={ type === 2 ? true : false } style={{ color: type === 2 ? 'gray' : '' }} onClick={ () => this.deleteUser(adminor) }>删除</LinkButton>
          </span>
        )
      },
    ]
  }

  /*
  显示添加界面
   */
  showAdd = () => {
    this.adminor = null; // 去除前面保存的user
    this.setState({ 
      isShow: true 
    });
  }

  /*
  显示修改界面
   */
  showUpdate = (adminor) => {
    this.adminor = adminor; // 保存user
    this.setState({
      isShow: true
    });
  }

  /*
  删除指定管理员
   */
  deleteUser = (adminor) => {
    Modal.confirm({
      title: `确认删除${ adminor.username }吗?`,
      onOk: async () => {
        const result = await reqDeleteUser(adminor._id);
        if(result.status === 0) {
          message.success('删除管理员成功!');
          this.getAdminors();
        }
      }
    })
  }

  /*
  添加/更新管理员
   */
  addOrUpdateUser = (type) => {
    this.form.current.validateFields(['username', 'password', 'phone', 'email', 'address'])
      .then(async () => {
        // 1. 收集输入数据
        const adminor = this.form.current.getFieldsValue();
        adminor.type = type;
        // 如果是更新, 需要给user指定_id属性
        if (this.adminor) {
          adminor._id = this.adminor._id;
          adminor.type = this.adminor.type;
        }

        // 2. 提交添加的请求
        const result = await reqAddOrUpdateUser(adminor);
        // 3. 更新列表显示
        if(result.status === 0) {
          message.success(`${ this.adminor ? '修改' : '添加' }管理员成功`);
          this.getAdminors();
        }
        this.setState({ isShow: false });
        this.form.current.resetFields();
      })
      .catch((err) => console.log(err))
  }

  /*
  获取管理员列表
  */
  getAdminors = async () => {
    this.setState({ ...this.state, loading: true });
    const { searchName } = this.state;
    let result;
    if (searchName) {
      result = await reqSearchAdminor({ searchName })
    } else {
      result = await reqAdminor();
    }
    this.setState({ ...this.state, loading: false });
    if (result.status === 0) {
      const { adminors } = result.data;
      this.setState({
        ...this.state,
        adminors
      })
    }
  }

  componentWillMount () {
    this.initColumns();
  }

  componentDidMount () {
    this.getAdminors();
  }

  render() {
    const { user: { type } } = memoryUilts;
    const { adminors, isShow, searchName, loading } = this.state;
    const adminor = this.adminor || {};

    const title = (
      <span>
        <Input
          placeholder='管理员名称'
          style={{ width: 150, margin: '0 15px' }}
          value={ searchName }
          onChange={ event => this.setState({ ...this.state, searchName: event.target.value }) }
        />
        <Button type='primary' onClick={ () => this.getAdminors() }>搜索</Button>
      </span>
    )
    const extra = <Button disabled={ type === 2 ? true : false } style={{ color: type === 2 ? 'gray' : '' }} type='primary' onClick={ this.showAdd }>添加管理员</Button>

    return (
      <Card title={ title } extra={ extra }>
        <Table
          loading={ loading }
          bordered
          rowKey='_id'
          dataSource={ adminors }
          columns={ this.columns }
          pagination={{ defaultPageSize: PAGE_SIZE }}
        />

        <Modal
          title={ adminor._id ? '修改管理员' : '添加管理员' }
          visible={ isShow }
          onOk={ () => this.addOrUpdateUser(2) }
          onCancel={() => {
            // console.log(this.form);
            this.form.current.resetFields();
            this.setState({ isShow: false });
          }}
        >
          <AdminorForm
            setForm={ form => this.form = form }
            adminor={ adminor }
          />
        </Modal>

      </Card>
    )
  }
}
