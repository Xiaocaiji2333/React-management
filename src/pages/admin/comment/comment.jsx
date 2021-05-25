import React, { Component } from 'react';
import {
  Card,
  Select,
  Input,
  Button,
  Table,
  message,
  Modal,
} from 'antd';

import LinkButton from '../../../components/link-button';
import { reqComments, reqSearchComments, reqDeleteComment } from '../../../api';
import { PAGE_SIZE } from '../../../utils/constants';
import { formatDate } from '../../../utils/dateUtils';

const Option = Select.Option;

export default class Comment extends Component {

  state = {
    comments: [],
    loading: false,
    searchName: '',
    searchType: 'commentName',
  }

  /*
  初始化table的列的数组
   */
  initColumns = () => {
    this.columns = [
      {
        title: '评论者',
        dataIndex: 'comment_name',
      },
      {
        title: '评论商品',
        dataIndex: 'goods_name',
      },
      {
        title: '评论时间',
        dataIndex: 'create_time',
        render: formatDate,
      },
      {
        title: '评论内容',
        dataIndex: 'content',
      },
      {
        width: 100,
        title: '操作',
        render: (comment) => {
          return (
            <span>
              <LinkButton onClick={ () => this.deleteComment(comment) }>删除</LinkButton>
            </span>
          )
        }
      },
    ];
  }

  /*
  删除指定评论
  */
  deleteComment = (comment) => {
    Modal.confirm({
      title: `确认删除该评论吗?`,
      onOk: async () => {
        const result = await reqDeleteComment(comment);
        if(result.status === 0) {
          message.success('删除评论成功!');
          this.getComments();
        }
      }
    })
  }

  /*
  获取评论列表
  */
  getComments = async () => {
    this.setState({ loading: true });

    const { searchName, searchType } = this.state;
    let result;
    if (searchName) {
      result = await reqSearchComments({ searchName, searchType });
    } else { // 一般请求
      result = await reqComments();
    }

    this.setState({ loading: false });
    if (result.status === 0) {
      const { comments } = result.data;
      this.setState({
        comments
      })
    }
  }

  componentWillMount () {
    this.initColumns();
  }

  componentDidMount () {
    this.getComments();
  }

  render() {

    // 取出状态数据
    const { comments, loading, searchName, searchType } = this.state;

    const title = (
      <span>
        <Select
          value= { searchType }
          style={{ width: 150 }}
          onChange={ value => this.setState({ searchType: value }) }
        >
          <Option value='commentName'>按评论者搜索</Option>
          <Option value='productName'>按商品名搜索</Option>
        </Select>
        <Input
          placeholder='关键字'
          style={{ width: 150, margin: '0 15px' }}
          value={ searchName }
          onChange={ event => this.setState({ searchName: event.target.value }) }
        />
        <Button type='primary' onClick={ () => this.getComments() }>搜索</Button>
      </span>
    )

    return (
      <Card title={ title }>
        <Table
          bordered
          rowKey='_id'
          loading={ loading }
          dataSource={ comments }
          columns={ this.columns }
          pagination={{
            defaultPageSize: PAGE_SIZE,
          }}
        />
      </Card>
    )
  }
}