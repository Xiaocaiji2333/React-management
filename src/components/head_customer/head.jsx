import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Badge, 
  Button,
  Input,
  Modal,
  Card,
  List,
  message,
} from 'antd';
import { 
  SearchOutlined,
  ShoppingCartOutlined
 } from '@ant-design/icons';

 import storageUtils from '../../utils/storageUtils';
 import memoryUtils from '../../utils/memoryUtils';

import './head.less';
import { reqSubmitOrder, reqSearchGoods } from '../../api';

const { Search } = Input;

class Head extends Component {
  static propTypes = {
    user: PropTypes.object,
    refresh: PropTypes.func
  }

  state = {
    showShoppingCart: false,
    shoppingCart: []
  }

  // 退出登录
  logout = () => {
    // 显示确认框
    Modal.confirm({
      content: '确定退出吗?',
      onOk: () => {
        console.log('OK', this);
        // 删除保存的user数据
        storageUtils.removeUser();
        memoryUtils.user = {};

        // 跳转到login
        this.props.history.replace('/login');
      }
    })
  }

  // 搜索商品
  search = async (value) => {
    const result = await reqSearchGoods(value);
    if (result.status === 0) {
      this.props.history.replace({ pathname: '/customer/search', state: { searchs: result.data } });
    }
  }

  // 提交清单
  submitCart = async () => {
    const { user: { username: order_name } } = this.props;
    const goods = memoryUtils.shoppingCart;
    const price = memoryUtils.shoppingCart.reduce((pre, item) => pre + item.price, 0);
    const order = { order_name, goods, price };
    const result = await reqSubmitOrder(order);
    if (result.status === 0) {
      message.success(result.msg);
      memoryUtils.shoppingCart = [];
      this.setState({ ...this.state, showShoppingCart: false, shoppingCart: [] });
    }
  }

  render() {
    const { user } = this.props;
    return (
      <>
        <div className='dm_topMenu'>
          <Row className='common_width'>
            <Col span={ 6 }>
              <span>欢迎你，{ user.username }</span>
            </Col>
            <Col span={ 18 }>
              <span onClick={ () => this.props.history.replace('/customer/mycent') }>用户中心</span>
              <span onClick={ () => this.props.history.replace('/customer/factory') }>厂商信息</span>
              <span onClick={ this.logout }>退出登录</span>
            </Col>
          </Row>
        </div>
        
        <div className='dm_SearchArea'>
          <Row className='common_width'>
            <Col span={ 4 } className='logo' title='首页'></Col>
            <Col span={ 12 }>
              <Link to='/customer/home'>首&nbsp;页</Link>
              <Link to='/customer/order'>我的订单</Link>
              <Link to='/customer/comment'>我的评论</Link>
            </Col>
            <Col span={ 8 }>
              <div>
                <Row>
                  <Search placeholder="请输入关键字" enterButton  
                    onSearch={ (value) => this.search(value) }
                  />
                </Row>
              </div>
              <Button icon={ <ShoppingCartOutlined/> } type="primary" className='cart' onClick={ () => this.setState({ ...this.state, showShoppingCart: !this.state.showShoppingCart, shoppingCart: memoryUtils.shoppingCart }) }>我的购物车</Button>
              {
                this.state.showShoppingCart && 
                <Card style={{ position: 'absolute', right: 36, top: 40, zIndex: 1, backgroundColor: '#fefefe' }}
                bodyStyle={{ padding: 12, minHeight: 120, textAlign: 'center' }}
                >
                  <List
                    dataSource={ this.state.shoppingCart }
                    renderItem={ (item1) => (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ marginRight: 12 }}>{ item1.goods_name }</span>
                        <span style={{ marginRight: 12 }}>￥{ item1.price }</span>
                        <span style={{ cursor: 'pointer' }} onClick={ () => {
                          const newCart = memoryUtils.shoppingCart.filter((item2) => {
                            return item2.goods_name != item1.goods_name;
                          });
                          memoryUtils.shoppingCart = newCart;
                          this.setState({ ...this.state, shoppingCart: newCart });
                          this.props.refresh();
                        } }>×</span>
                      </div>
                    ) }
                  />
                  { memoryUtils.shoppingCart.length ? <a style={{ position: 'absolute', width: '100%',left: 0, bottom: 12 }} onClick={ () => this.submitCart() }>提交购物单</a> : null }
                </Card>
              }
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default withRouter(Head);
