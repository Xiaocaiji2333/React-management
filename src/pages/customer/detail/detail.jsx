import React, { Component, createRef } from 'react';
import {
  Card,
  List,
  Button,
  Input,
  message,
} from 'antd';
import { 
  PlusOutlined,
  MinusOutlined,
 } from '@ant-design/icons';

import memoryUtils from '../../../utils/memoryUtils';
import { formatDate } from '../../../utils/dateUtils';
import { reqSingleComments, reqAddComment } from '../../../api';

const { Item } = List;
const { TextArea } = Input;

export default class Detail extends Component {

  state = {
    comment: false,
    content: '',
    comments: [],
  }
  txt = createRef();

  // 获取单个商品评论
  getSinglecomment = async () => {
    const { flower, product } = this.props.location.state;
    const goods_name = flower ? flower.flowername : product.productname;
    const result = await reqSingleComments(goods_name);
    if (result.status === 0) {
      const { comments } = result.data;
      this.setState({
        ...this.state,
        comments
      })
    }
  }

  handleComment = async (comment) => {
    // console.log(comment);
    const result = await reqAddComment(comment);
    if (result.status === 0) {
      message.success(result.msg);
      this.setState({
        ...this.state,
        comment: false,
        content: ''
      })
      this.getSinglecomment();
    }
  }

  componentDidMount() {
    const { flower, product } = this.props.location.state;
    const goods_name = flower ? flower.flowername : product.productname;
    this.getSinglecomment();
    const array = memoryUtils.shoppingCart.filter((item) => (
      item.goods_name === goods_name
    ))
    if (array[0]) this.setState({ ... this.state, cartBtn: true });
  }

  componentDidUpdate() {
    // console.log(this.txt);
    if (this.state.comment && this.txt.current) this.txt.current.focus(); // 聚焦
  } 

  render() {
    const { flower, product } = this.props.location.state;
    const { user: { username } } = memoryUtils;
    const goods = flower || product;
    goods.goods_name = flower ? flower.flowername : product.productname;
    const judgeCart = () => {

    }
    const extra = (
      <div>
        <Button type='primary' onClick={ () => {
          const array = memoryUtils.shoppingCart.filter((item) => {
            return item.goods_name === goods.goods_name;
          });
          if (!array[0]) { 
            memoryUtils.shoppingCart.push(goods);
            message.success('成功加入购物车');
          } else message.info('已在购物车中');
          
        } }>
          <PlusOutlined/>
          加入购物车
        </Button>
        <Button style={{ marginLeft: 6 }} type='primary' onClick={ () => {
            this.setState({ ...this.state, comment: !this.state.comment }); 
          } }>
          <PlusOutlined/>
          评论
        </Button>
      </div>
    )
    return (
      <div>
        <Card title='商品详情' extra={ extra } className='product-detail'>
        <List>
          <Item>
            <div>
              <span className="left">商品名称:</span>
              <span>{ goods.goods_name }</span>
            </div>
          </Item>
          <Item>
          <div>
            <span className="left">商品描述:</span>
            <span>{ goods.desc }</span>
          </div>
          </Item>
          <Item>
            <div>
              <span className="left">商品价格:</span>
              <span>{ goods.price }元</span>
            </div>
          </Item>
          <Item>
            <div>
              <span className="left">商品图片:</span>
              <span>
                {
                  flower ?
                    <img
                      src={ flower.img }
                      className="product-img"
                      alt="loading"
                    /> :
                    <img
                      src={ product.imgs[0] }
                      className="product-img"
                      alt="loading"
                    />
                }
              </span>
            </div>
          </Item>
        </List>
      </Card>
        <Card title='评论'>
          {
            this.state.comment && <TextArea ref={ this.txt } placeholder='请输入您宝贵的建议' 
              onChange={ (target) => { this.setState({ ...this.state, content: target.target.innerHTML }) } }
              onPressEnter={ (target) => {
                this.handleComment({ 
                comment_name: username,
                goods_name: goods.goods_name,
                content: target.target.innerHTML,
              });
            } }/>
          }
          <List>
            {
              this.state.comments.map((comment) => (
                <Item>
                  <div>
                    <span style={{ marginRight: 8, fontSize: 16 }}>{ comment.comment_name }:</span>
                    <span>{ comment.content }</span>
                  </div>
                  <span>{ formatDate(comment.create_time) }</span>
                </Item>
              ))
            }
          </List>
        </Card>
      </div>
    );
  }
}
