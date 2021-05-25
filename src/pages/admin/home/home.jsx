import React, { Component } from 'react'
import {
  Card,
  Statistic,
  DatePicker,
  Timeline,
} from 'antd';
import { 
  QuestionCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  ReloadOutlined,
 } from '@ant-design/icons';
import moment from 'moment';

import Storage from './storage';
import Visit from './visit';
import Sale from './sale';

import './home.less';

const dateFormat = 'YYYY/MM/DD';
const { RangePicker } = DatePicker;

export default class Home extends Component {

  state = {
    isVisited: true
  }

  handleChange = (isVisited) => {
    return () => this.setState({ isVisited });
  }

  render() {
    const { isVisited } = this.state;

    return (
      <div className='home'>
        <div style={{ width: '90%', overflow: 'hidden' }}>
          <Card
            className="home-card"
            title="产品总量"
            extra={ <QuestionCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }}/> }
            headStyle={{ color: 'rgba(0,0,0,.45)' }}
          >
            <Statistic
              value={ 1128163 }
              suffix="个"
              style={{ fontWeight: 'bolder' }}
            />
            <Statistic
              value={ 15 }
              valueStyle={{ fontSize: 15 }}
              prefix={ '周同比' }
              suffix={ <div>%<ArrowDownOutlined style={{ color: 'red', marginLeft: 10 }}/></div> }
            />
            <Statistic
              value={ 10 }
              valueStyle={{ fontSize: 15 }}
              prefix={'日同比'}
              suffix={ <div>%<ArrowUpOutlined style={{ color: '#3f8600', marginLeft: 10 }}/></div> }
            />
          </Card>

          <Storage/>
        </div>

        <Card
          className="home-content"
          title={<div className="home-menu">
            <span className={ isVisited ? "home-menu-active home-menu-visited" : 'home-menu-visited' }
                  onClick={ this.handleChange(true) }>访问量</span>
            <span className={ isVisited ? "" : 'home-menu-active' } 
                  onClick={ this.handleChange(false) }>销售量</span>
          </div>}
          extra={ <RangePicker
            defaultValue={ [moment(moment(), dateFormat), moment(moment(), dateFormat)] }
            format={ dateFormat }
          /> }
        >
          <Card
            className="home-table-left"
            title={ isVisited ? '访问量统计' : '销售量统计' }
            bodyStyle={{ padding: 0, height: 275 }}
            extra={ <ReloadOutlined/> }
          >
            { isVisited ? <Visit/> : <Sale/> }
          </Card>
        </Card>
      </div>
    )
  }
}