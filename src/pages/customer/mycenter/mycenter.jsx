import React, { Component } from 'react';
import {
  Card,
  List,
} from 'antd';

import memoryUtils from '../../../utils/memoryUtils';
import { formatDate } from '../../../utils/dateUtils';

const { Item } = List;

export default class Mycenter extends Component {
  state = {
    user: {}
  }

  componentDidMount() {
    const { user } = memoryUtils;
    this.setState({
      user
    });
  }

  render() {
    const { user } = this.state;

    return (
      <Card title='详细信息' className='product-detail' style={{ padding: '0 200px' }}>
        <List>
          <Item>
            <div>
              <span className="left">用户名:</span>
              <span>{ user.username }</span>
            </div>
          </Item>
          <Item>
            <div>
              <span className="left">邮箱:</span>
              <span>{ user.email }</span>
            </div>
          </Item>
          <Item>
            <div>
              <span className="left">手机号:</span>
              <span>{ user.phone }</span>
            </div>
          </Item>
          <Item>
            <div>
              <span className="left">地址:</span>
              <span>{ user.address }</span>
            </div>
          </Item>
          <Item>
            <div>
              <span className="left">注册时间:</span>
              <span>{ formatDate(user.create_time) }</span>
            </div>
          </Item>
        </List>
      </Card>
    );
  }
}
