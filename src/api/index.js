import jsonp from 'jsonp';
import { message } from 'antd';
import ajax from './ajax';

// const BASE = 'http://localhost:9002';
const BASE = '';
// 登陆
export const reqLogin = (username, password) => ajax(BASE + '/login', { username, password }, 'POST');

// 注册
export const reqRegister = ({ username, password, phone, email, type = 0 }) => ajax(BASE + '/register', { username, password, phone, email, type }, 'POST');

// 获取鲜花列表
export const reqFlowers = () => ajax(BASE + '/manage/flower/list', {}, 'GET');

export const reqSearchFlowers = ({ searchName }) => ajax(BASE + '/manage/flower/search', { searchName }, 'GET');

// 添加/更新鲜花
export const reqAddOrUpdateFlower = (flower) => ajax(BASE + '/manage/flower/' + (flower._id ? 'update' : 'add'), flower, 'POST');

// 删除鲜花
export const reqDeleteFlower = (id) => ajax(BASE + '/manage/flower/delete', { id }, 'POST');

// 获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax(BASE + '/manage/product/list', { pageNum, pageSize }, 'GET');

// 获取所有商品列表
export const reqAllProducts = () => ajax(BASE + '/customer/product/all', {}, 'GET');

// 搜索指定商品
export const reqSearchGoods = (searchContent) => ajax(BASE + '/customer/goods/search', { searchContent }, 'GET');

// 更新商品的状态(上架/下架)
export const reqUpdateStatus = (productId, status) => ajax(BASE + '/manage/product/updateStatus', { productId, status }, 'POST');

/*
搜索商品列表 (根据商品名称/商品描述)
 */
export const reqSearchProducts = ({ pageNum, pageSize, searchName, searchType }) => ajax(BASE + '/manage/product/search', {
  pageNum,
  pageSize,
  [searchType]: searchName,
}, 'GET');

// 添加/修改商品
export const reqAddOrUpdateProduct = (product) => ajax(BASE + '/manage/product/' + ( product._id?'update':'add'), product, 'POST');

export const reqDeleteProduct = (id) => ajax(BASE + '/manage/product/delete', { id }, 'POST');

// 获取所有管理员的列表
export const reqAdminor = () => ajax(BASE + '/manage/adminor/list', {}, 'GET');

// 搜索管理员
export const reqSearchAdminor = ({ searchName }) => ajax(BASE + '/manage/adminor/search', { searchName }, 'GET');

// 获取所有用户的列表
export const reqUsers = () => ajax(BASE + '/manage/user/list', {}, "GET");

export const reqSearchUsers = ({ searchName }) => ajax(BASE + '/manage/user/search', { searchName }, "GET");

// 删除指定用户or管理员
export const reqDeleteUser = (userId) => ajax(BASE + '/manage/user/delete', { userId }, 'POST');

// 添加/更新用户or管理员
export const reqAddOrUpdateUser = (user) => ajax(BASE + '/manage/user/' + (user._id ? 'update' : 'add'), user, 'POST');

// 获取订单列表
export const reqOrders = () => ajax(BASE + '/manage/orders/list', {}, "GET");

// 获取我的订单列表
export const reqMyOrders = (order_name) => ajax(BASE + '/customer/orders/list', { order_name }, 'GET');

// 搜索订单
export const reqSearchOrders = ({ searchName }) => ajax(BASE + '/manage/orders/search', { searchName }, 'GET');

// 提交订单
export const reqSubmitOrder = (order) => ajax(BASE + '/customer/orders/submit', order, 'POST');

// 获取评论列表
export const reqComments = () => ajax(BASE + '/manage/comments/list', {}, "GET");

//获取我的评论列表
export const reqMyComments = (comment_name) => ajax(BASE + '/customer/comments/list', { comment_name }, 'GET');

// 获取单个商品的评论列表
export const reqSingleComments = (goods_name) => ajax(BASE + '/customer/comments/singleList', { goods_name }, "GET");

//添加评论
export const reqAddComment = ({ comment_name, goods_name, content }) => ajax(BASE + '/customer/comments/add', { comment_name, goods_name, content }, "POST");

// 删除评论
export const reqDeleteComment = ({ comment_name, create_time }) => ajax(BASE + '/manage/comments/delete', { comment_name, create_time }, "POST");

// 搜索评论
export const reqSearchComments = ({ searchName, searchType }) => ajax(BASE + '/manage/comments/search', { [searchType]: searchName }, 'GET');

// 获取管理商家信息
export const reqFactory = (belongTo) => ajax(BASE + '/manage/factory', { belongTo }, 'GET');

// 获取商品相应商家信息
export const reqSingleFactory = () => ajax(BASE + '/customer/factory', {}, 'GET');
