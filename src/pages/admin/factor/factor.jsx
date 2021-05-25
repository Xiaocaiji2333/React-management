import React, { Component } from 'react';
import { 
  List,
  Card,
} from 'antd';

import { reqFactory } from '../../../api';
import memoryUtils from '../../../utils/memoryUtils';
import { formatDate2 } from '../../../utils/dateUtils';

const { Item } = List;

export default class Factor extends Component {
  state = {
    factor: {}
  }

  async componentDidMount() {
    const { user: { belongTo } } = memoryUtils;
    const result = await reqFactory(belongTo);
    if (result.status === 0) {
      this.setState({ ...this.state, factor: result.data.factory });
    }
  }

  render() {
    const { factor } = this.state;
    
    return (
      <Card title='商家信息' className='product-detail' style={{ padding: '0 200px' }}>
        <List>
          <Item>
            <div>
              <span className="left">商家名称:</span>
              <span>{ factor.factory_name }</span>
            </div>
          </Item>
          <Item>
            <div>
              <span className="left">负责人:</span>
              {
                factor.main_name && factor.main_name.map((name, index) => (
                  <span key={ index } style={{ marginRight: 4 }}>{ name }</span>
                ))
              }
            </div>
          </Item>
          <Item>
            <div>
              <span className="left">描述:</span>
              <span>{ factor.desc }</span>
            </div>
          </Item>
          <Item>
            <div>
              <span className="left">地址:</span>
              <span>{ factor.address }</span>
            </div>
          </Item>
          <Item>
            <div>
              <span className="left">注册时间:</span>
              <span>{ formatDate2(factor.create_time) }</span>
            </div>
          </Item>
        </List>
      </Card>
    );
  }
}
