import React, { Component } from 'react';
import {
  Card,
  Button,
  Table,
  Modal,
  message,
  Input
} from 'antd';

import { PAGE_SIZE } from "../../../utils/constants";
import LinkButton from "../../../components/link-button/index";
import { reqDeleteFlower, reqFlowers, reqSearchFlowers, reqAddOrUpdateFlower } from "../../../api/index";
import FlowerForm from './flower-form';

/*
鲜花路由
 */
export default class Flower extends Component {

  state = {
    flowers: [], // 所有鲜花列表
    isShow: false, // 是否显示确认框
    searchName: '',
    loading: false
  }

  initColumns = () => {
    this.columns = [
      {
        title: '鲜花名',
        dataIndex: 'flowername'
      },
      {
        title: '描述',
        dataIndex: 'desc'
      },
      {
        title: '数量',
        dataIndex: 'total'
      },

      {
        title: '价格',
        dataIndex: 'price',
        render: (price) => '¥' + price
      },
      {
        width: 100,
        height: 100,
        title: '图片',
        dataIndex: 'img',
        render: (img) => (
          <img src={ img }/>
        )
      },
      {
        title: '操作',
        render: (flower) => (
          <span>
            <LinkButton onClick={ () => this.showUpdate(flower) }>修改</LinkButton>
            <LinkButton onClick={ () => this.deleteUser(flower) }>删除</LinkButton>
          </span>
        )
      },
    ]
  }

  /*
  显示添加界面
   */
  showAdd = () => {
    this.flower = null; // 去除前面保存的flower
    this.setState({
      ...this.state,
      isShow: true 
    });
  }

  /*
  显示修改界面
   */
  showUpdate = (flower) => {
    this.flower = flower; // 保存flower
    this.setState({
      ...this.state,
      isShow: true
    });
  }

  /*
  删除指定鲜花
   */
  deleteUser = (flower) => {
    Modal.confirm({
      title: `确认删除${ flower.username }吗?`,
      onOk: async () => {
        const result = await reqDeleteFlower(flower._id);
        if(result.status === 0) {
          message.success('删除鲜花成功!');
          this.getFlowers();
        }
      }
    })
  }

  /*
  添加/更新鲜花
   */
  addOrUpdateFlower = () => {
    this.form.current.validateFields(['flowername', 'desc', 'price', 'total'])
      .then(async (value) => {
        // 1. 收集输入数据
        const img = this.pw.current.getImgs();
        const flower = { ...value, img: img[0] };
        // 如果是更新, 需要给user指定_id属性
        if (this.flower) {
          flower._id = this.flower._id;
        }
        console.log(flower);
        // 2. 提交添加的请求
        const result = await reqAddOrUpdateFlower(flower);
        // 3. 更新列表显示
        if(result.status === 0) {
          message.success(`${ this.flower ? '修改' : '添加' }鲜花成功`);
          this.getFlowers();
        }
        this.setState({ isShow: false });
        this.form.current.resetFields();
      })
      .catch((err) => console.log(err))
  }

  /*
  获取鲜花列表
  */
  getFlowers = async () => {
    this.setState({ ...this.state, loading: true });
    const { searchName } = this.state;
    let result;
    if (searchName) {
      result = await reqSearchFlowers({ searchName })
    } else {
      result = await reqFlowers();
    }
    this.setState({ ...this.state, loading: false });
    if (result.status === 0) {
      const { flowers } = result.data;
      this.setState({
        ...this.state,
        flowers
      })
    }
  }

  componentWillMount () {
    this.initColumns();
  }

  componentDidMount () {
    this.getFlowers();
  }

  render() {
    const { flowers, isShow, searchName, loading } = this.state;
    const flower = this.flower || {};

    const title = (
      <span>
        <Input
          placeholder='鲜花名称'
          style={{ width: 150, margin: '0 15px' }}
          value={ searchName }
          onChange={ event => this.setState({ ...this.state, searchName: event.target.value }) }
        />
        <Button type='primary' onClick={ () => this.getFlowers() }>搜索</Button>
      </span>
    )
    const extra = <Button type='primary' onClick={ this.showAdd }>添加鲜花</Button>

    return (
      <Card title={ title } extra={ extra }>
        <Table
          loading={ loading }
          bordered
          rowKey='_id'
          dataSource={ flowers }
          columns={ this.columns }
          pagination={{ defaultPageSize: PAGE_SIZE }}
        />

        <Modal
          title={ flower._id ? '修改鲜花' : '添加鲜花' }
          visible={ isShow }
          onOk={ () => this.addOrUpdateFlower() }
          onCancel={() => {
            // console.log(this.form);
            this.form.current.resetFields();
            this.setState({ 
              ...this.state,
              isShow: false });
          }}
        >
          <FlowerForm
            setFormAndPw={ (form, pw) => { 
              this.form = form;
              this.pw = pw; 
            } }
            flower={ flower }
          />
        </Modal>

      </Card>
    )
  }
}