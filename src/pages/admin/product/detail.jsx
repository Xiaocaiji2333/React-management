import React, {Component} from 'react';
import {
  Card,
  Icon,
  List
} from 'antd';

import LinkButton from '../../../components/link-button';
import { BASE_IMG_URL } from '../../../utils/constants';

const Item = List.Item;


/*
Product的详情子路由组件
 */
export default class ProductDetail extends Component {

  render() {

    // 读取携带过来的state数据
    const { productname, desc, price, imgs } = this.props.location.state.product;

    const title = (
      <span>
        <LinkButton>
          <Icon
            type='arrow-left'
            style={{ marginRight: 10, fontSize: 20 }}
            onClick={ () => this.props.history.goBack() }
          />
        </LinkButton>

        <span>商品详情</span>
      </span>
    )
    return (
      <Card title={ title } className='product-detail'>
        <List>
          <Item>
            <span className="left">商品名称:</span>
            <span>{ productname }</span>
          </Item>
          <Item>
            <span className="left">商品描述:</span>
            <span>{ desc }</span>
          </Item>
          <Item>
            <span className="left">商品价格:</span>
            <span>{ price }元</span>
          </Item>
          <Item>
            <span className="left">商品图片:</span>
            <span>
              {
                imgs.map(img => (
                  <img
                    key={ img }
                    src={ img || BASE_IMG_URL + img }
                    className="product-img"
                    alt="loading"
                  />
                ))
              }
            </span>
          </Item>
        </List>
      </Card>
    )
  }
}