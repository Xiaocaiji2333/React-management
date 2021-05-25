import React, { Component } from 'react';
import {
  Card,
  List,
} from 'antd';

import { reqMyOrders } from '../../../api';
import memoryUtils from '../../../utils/memoryUtils';
import { formatDate } from '../../../utils/dateUtils';

const { Item } = List;
export default class componentName extends Component {
  state = {
    orders: [],
  }

  async componentDidMount() {
    const { user: { username } } = memoryUtils;
    const result = await reqMyOrders(username);
    if (result.status === 0) {
      const { orders } = result.data;
      this.setState({ ...this.state, orders });
    }
  }

  render() {
    // console.log(this.state.orders);
    return (
      <div style={{ padding: '0 200px' }}>
        {
          this.state.orders.map((order) => (
            <Card title={ `订单编号：${ order._id }` }>
              <List>
                <Item>
                  <span>{ `创建时间：${ formatDate(order.create_time) }` }</span>
                </Item>
                {
                  order.goods.map((goods) => (
                  <Item>
                    <span>{ `商品名称：${ goods.goods_name }` }&nbsp;&nbsp;&nbsp;{ `￥${ goods.price }` }</span>
                  </Item>
                  ))
                }
                <Item>
                  <span>{ `总价格：￥${ order.price }` }</span>
                </Item>
              </List>
            </Card>
          ))
        }
      </div>
    );
  }
}
