import React, { Component } from 'react';
import { Card } from 'antd';

const { Meta } = Card;

export default class componentName extends Component {
  state = { 
    searchs: [],
  }

  componentDidMount() {
    const { searchs } = this.props.location.state;
    this.setState({ ...this.state, searchs });
  }

  render() {
    const title = (
      <span>搜索结果</span>
    );

    return (
      <div>
        <Card title={ title }>
          <div style={{ display: 'flex' }}>
            {
              this.state.searchs.map((item) => (
                <Card
                  key={ item._id }
                  hoverable
                  style={{ width: 240, minHeight: 360, margin: '12px 24px' }}
                  cover={<img alt="loading" src={ item.flowername ? item.img : item.imgs[0] } />}
                  onClick={ () => this.props.history.replace({ pathname: '/customer/detail', state: item.flowername ? { flower: item } : { product: item } }) }
                >
                  <Meta title={ item.flower ? item.flowername : item.productname } description={ item.desc } />
                </Card>
              ))
            }
          </div>
        </Card>
      </div>
    );
  }
}
