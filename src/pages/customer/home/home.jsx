import React, { Component } from 'react';
import { Card } from 'antd';

import { reqFlowers, reqAllProducts } from '../../../api';

const { Meta } = Card;

export default class componentName extends Component {
  state = { 
    flowers: [],
    products: [],
  }

  async componentDidMount() {
    // 获取鲜花列表
    const result_flower = await reqFlowers();
    if (result_flower.status === 0) {
      const { flowers } = result_flower.data;
      // console.log(flowers);
      this.setState({
        ...this.state,
        flowers,
      });
    }

    // 获取成品列表
    const result_product = await reqAllProducts();
    // console.log(result_product);
    if (result_product.status === 0) {
      const { products } = result_product.data;
      // console.log(products);
      this.setState({
         ...this.state,
          products
      });
    }
  }

  render() {
    const { flowers, products } = this.state;

    const title1 = (
      <span>鲜花区</span>
    );
    const title2 = (
      <span>成品区</span>
    );

    return (
      <div>
        {/* 鲜花区 */}
        <Card title={ title1 }>
          <div style={{ display: 'flex' }}>
            {
              flowers && flowers.map((flower) => (
                <Card
                  key={ flower._id }
                  hoverable
                  style={{ width: 240, minHeight: 360, margin: '12px 24px' }}
                  cover={<img alt="loading" src={ flower.img } />}
                  onClick={ () => this.props.history.replace({ pathname: '/customer/detail', state: { flower } }) }
                >
                  <Meta title={ flower.flowername } description={ flower.desc } />
                </Card>
              ))
            }
          </div>
        </Card>
        {/* 成品区 */}
        <Card title={ title2 }>
          <div style={{ display: 'flex' }}>
            {
              products && products.map((product) => (
                <Card
                  key={ product._id }
                  hoverable
                  style={{ width: 240, minHeight: 360, margin: '12px 24px' }}
                  cover={<img alt="loading" src={ product.imgs[0] } />}
                  onClick={ () => this.props.history.replace({ pathname: '/customer/detail', state: { product } }) }
                >
                  <Meta title={ product.productname } description={ product.desc } />
                </Card>
              ))
            }
          </div>
        </Card>
      </div>
    );
  }
}
