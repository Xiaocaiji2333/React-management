import React, { Component } from 'react';
import {
  List,
} from 'antd';

import memoryUtils from '../../../utils/memoryUtils';
import { reqMyComments } from '../../../api';
import { formatDate } from '../../../utils/dateUtils';

const { Item } = List;

export default class Comment extends Component {
  state = {
    comments: [],
  }

  async componentDidMount() {
    const { user: { username } } = memoryUtils;
    const result = await reqMyComments(username);
    if (result.status === 0) {
      const { comments } = result.data;
      this.setState({ ...this.state, comments });
    }
  }

  render() {
    return (
      <List style={{ padding: '0 200px' }}>
        {
          this.state.comments.map((comment) => (
            <Item>
              <div>
                <span>评论时间：{ formatDate(comment.create_time) }</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>评论商品：{ comment.goods_name[0] }</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>评论内容：{ comment.content }</span>
              </div>
            </Item>
          ))
        }
      </List>
    );
  }
}
