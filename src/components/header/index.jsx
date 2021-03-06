import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import { Modal} from 'antd';

import LinkButton from '../link-button';
import menuList from '../../config/menuConfig';
import { formatDate } from '../../utils/dateUtils';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';

import './index.less';

/*
左侧导航的组件
 */
class Header extends Component {

  state = {
    currentTime: formatDate(Date.now()), // 当前时间字符串
    dayPictureUrl: '', // 天气图片url
    weather: '', // 天气的文本
  }

  getTime = () => {
    // 每隔1s获取当前时间, 并更新状态数据currentTime
    this.intervalId = setInterval(() => {
      const currentTime = formatDate(Date.now());
      this.setState({currentTime});
    }, 1000)
  }

  // getWeather = async () => {
  //   // 调用接口请求异步获取数据
  //   const res = await reqWeather('成都');
  //   const { dayPictureUrl, weather } = res;
  //   // 更新状态
  //   this.setState({ dayPictureUrl, weather })
  // }

  getTitle = () => {
    // 得到当前请求路径
    const path = this.props.location.pathname;
    let title = '';
    menuList.forEach(menu => {
      if (menu.key === path) { // 如果当前item对象的key与path一样,item的title就是需要显示的title
        title = menu.title;
      } else if (menu.children) {
        // 在所有子item中查找匹配的
        const cMenu = menu.children.find(cMenu => path.indexOf(cMenu.key) === 0);
        // 如果有值才说明有匹配的
        if(cMenu) {
          // 取出它的title
          title = cMenu.title;
        }
      }
    })
    return title;
  }

  /*
  退出登陆
   */
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

  componentDidMount () {
    // 获取当前的时间
    this.getTime();
    // 获取当前天气
    // this.getWeather();
  }

  componentWillUnmount () {
    // 清除定时器
    clearInterval(this.intervalId);
  }


  render() {

    const { currentTime } = this.state;

    const username = memoryUtils.user.username;

    // 得到当前需要显示的title
    const title = this.getTitle();
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎, { username }</span>
          <LinkButton onClick={ this.logout }>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{ title }</div>
          <div className="header-bottom-right">
            <span>{ currentTime }</span>
            {/*<img src={ dayPictureUrl } alt="weather"/>*/}
            {/*<span>{ weather }</span>*/}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header);
