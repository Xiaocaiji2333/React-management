const menuList = [
  {
    title: '首页', // 菜单标题名称
    key: '/admin/home', // 对应的path
    icon: 'home', // 图标名称
  },

  {
    title: '产品管理',
    key: '/admin/products',
    icon: 'appstore',
    children: [ // 子菜单列表
      {
        title: '鲜花管理',
        key: '/admin/flower',
        icon: 'bars'
      },
      {
        title: '成品管理',
        key: '/admin/product',
        icon: 'tool'
      },
    ]
  },

  {
    title: '用户管理',
    key: '/admin/user',
    icon: 'user'
  },

  {
    title: '管理员管理',
    key: '/admin/adminor',
    icon: 'safety',
  },

  {
    title: '订单管理',
    key: '/admin/order',
    icon: 'windows',
  },

  {
    title: '评论管理',
    key: '/admin/comment',
    icon: 'windows',
  },

  {
    title: '商家信息管理',
    key: '/admin/factor',
    icon: 'windos',
  },
];

export default menuList;