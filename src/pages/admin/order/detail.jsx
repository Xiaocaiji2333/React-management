import React, { Component } from 'react';
import {
  Card,
  List,
} from 'antd';

import { formatDate } from '../../../utils/dateUtils';

const { Item } = List;

export default class OrderDetail extends Component {
  render() {
    const { order } = this.props.location.state;

    return (
      <Card title={ `订单编号：${ order._id }` }>
        <List>
        <Item>
            <span>{ `订购者：${ order.order_name }` }</span>
          </Item>
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
    );
  }
}
