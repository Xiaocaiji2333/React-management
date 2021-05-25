import React, { Component } from 'react';
import {
  Card,
  List,
} from 'antd';

import { formatDate } from '../../../utils/dateUtils';
import { reqSingleFactory } from '../../../api';

const { Item } = List;

export default class Factory extends Component {
  state = {
    factory: {}
  }

  async componentDidMount() {
    const result = await reqSingleFactory();
    // console.log(result);
    if (result.status === 0) {
      const { factory } = result.data;
      this.setState({
        factory
      });
    }
  }

  render() {
    const { factory } = this.state;

    return (
      <Card title='商家信息' className='product-detail' style={{ padding: '0 200px' }}>
        <List>
          <Item>
            <div>
              <span className="left">商家名称:</span>
              <span>{ factory.factory_name }</span>
            </div>
          </Item>
          <Item>
            <div>
              <span className="left">负责人:</span>
              <span>{ factory.main_name }</span>
            </div>
          </Item>
          <Item>
            <div>
              <span className="left">描述:</span>
              <span>{ factory.desc }</span>
            </div>
          </Item>
          <Item>
            <div>
              <span className="left">地址:</span>
              <span>{ factory.address }</span>
            </div>
          </Item>
          <Item>
            <div>
              <span className="left">注册时间:</span>
              <span>{ formatDate(factory.create_time) }</span>
            </div>
          </Item>
        </List>
      </Card>
    );
  }
}
