import React, { Component } from 'react';
import {
  Card,
  Select,
  Input,
  Button,
  Table,
  message
} from 'antd';

import LinkButton from '../../../components/link-button';
import { reqOrders, reqSearchOrders } from '../../../api';
import { PAGE_SIZE } from '../../../utils/constants';
import { formatDate } from '../../../utils/dateUtils';

const Option = Select.Option;

export default class OrderHome extends Component {

  state = {
    orders: [],
    loading: false,
    searchName: '',
  }

  /*
  初始化table的列的数组
   */
  initColumns = () => {
    this.columns = [
      {
        title: '购买者',
        dataIndex: 'order_name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: formatDate
      },
      {
        title: '总价',
        dataIndex: 'price',
        render: (price) => '¥' + price
      },
      {
        width: 100,
        title: '操作',
        render: (order) => {
          return (
            <span>
              <LinkButton onClick={ () => this.props.history.push('/admin/order/detail', { order }) }>详情</LinkButton>
            </span>
          )
        }
      },
    ];
  }

  /*
  获取指定搜素的列表数据显示
   */
  getOrders = async () => {
    this.setState({ ...this.state, loading: true });

    const { searchName } = this.state;
    let result;
    if (searchName) {
      result = await reqSearchOrders({ searchName })
    } else { // 一般请求
      result = await reqOrders();
    }

    this.setState({ ...this.state, loading: false });
    if (result.status === 0) {
      const { orders } = result.data;
      this.setState({
        ...this.state,
        orders
      })
    }
  }

  componentWillMount () {
    this.initColumns();
  }

  componentDidMount () {
    this.getOrders();
  }

  render() {

    // 取出状态数据
    const { orders, loading, searchName } = this.state;

    const title = (
      <span>
        <Input
          placeholder='购买者名称'
          style={{ width: 150, margin: '0 15px' }}
          value={ searchName }
          onChange={ event => this.setState({ ...this.state, searchName: event.target.value }) }
        />
        <Button type='primary' onClick={ () => this.getOrders() }>搜索</Button>
      </span>
    )

    return (
      <Card title={ title }>
        <Table
          bordered
          rowKey='_id'
          loading={ loading }
          dataSource={ orders }
          columns={ this.columns }
          pagination={{
            defaultPageSize: PAGE_SIZE,
          }}
        />
      </Card>
    )
  }
}