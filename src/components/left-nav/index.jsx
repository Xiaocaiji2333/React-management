import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';

import logo from '../../assets/images/img.png';
import menuList from '../../config/menuConfig';
import './index.less';
import memoryUtils from '../../utils/memoryUtils';

const SubMenu = Menu.SubMenu;

/*
左侧导航的组件
 */
class LeftNav extends Component {

  /*
  根据menu的数据数组生成对应的标签数组
  */
  getMenuNodes = (menuList) => {
    // 得到当前请求的路由路径
    const path = this.props.location.pathname;

    return menuList.reduce((pre, item) => {
        // 向pre添加<Menu.Item>
        if(!item.children) {
          pre.push((
            <Menu.Item key={ item.key }>
              <Link to={ item.key }>
                <Icon type={ item.icon }/>
                <span>{ item.title }</span>
              </Link>
            </Menu.Item>
          ))
        } else {

          // 查找一个与当前请求路径匹配的子Item
          const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0);
          // 如果存在, 说明当前item的子列表需要打开
          if (cItem) {
            this.openKey = item.key;
          }


          // 向pre添加<SubMenu>
          pre.push((
            <SubMenu
              key={item.key}
              title={
                <span>
              <Icon type={item.icon}/>
              <span>{item.title}</span>
            </span>
              }
            >
              { this.getMenuNodes(item.children) }
            </SubMenu>
          ))
        }
      return pre
    }, [])
  }

  /*
  准备数据
   */
  componentWillMount () {
    this.menuNodes = this.getMenuNodes(menuList);
  }

  render() {
    const { username } = memoryUtils.user;
    const path = this.props.location.pathname;
    const openKey = this.openKey; // 得到需要打开菜单项的key

    return (
      <div className="left-nav">
        <Link to='/admin/home' className="left-nav-header">
          <img src={ logo } alt="logo"/>
          <h1>{ username }</h1>
        </Link>

        <Menu
          mode="inline"
          theme="light"
          selectedKeys={ [path] }
          defaultOpenKeys={ [openKey] }
        >
          {
            this.menuNodes
          }

        </Menu>
      </div>
    )
  }
}

export default withRouter(LeftNav);
