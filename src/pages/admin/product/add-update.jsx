import React, { PureComponent } from 'react';
import {
  Card,
  Icon,
  Form,
  Input,
  Button,
  message
} from 'antd';

import PicturesWall from '../../../components/pictures-wall/pictures-wall';
import LinkButton from '../../../components/link-button';
import { reqAddOrUpdateProduct } from '../../../api';

const { Item } = Form;
const { TextArea } = Input;

/*
Product的添加和更新的子路由组件
 */
export default class ProductAddUpdate extends PureComponent {
  formRef = React.createRef();
  pw = React.createRef();

  /*
  验证价格的自定义验证函数
   */
  validatePrice = (rule, value, callback) => {
    // console.log(value, typeof value);
    if (value * 1 > 0) {
      callback();
    } else {
      callback('价格必须大于0');
    }
  }

  submit = () => {
    // console.log(this.formRef);
    // 进行表单验证, 如果通过了, 才发送请求
    this.formRef.current.validateFields(['productname', 'desc', 'price']).then(async (values) => {
      if (values) {
        // 1. 收集数据, 并封装成product对象
        const { productname, desc, price } = values;
        const imgs = this.pw.current.getImgs();
        // console.log(this.pw.current.getImgs());

        const product = { productname, desc, price, imgs };

        // 如果是更新, 需要添加_id
        if(this.isUpdate) {
          product._id = this.product._id;
        }

        // 2. 调用接口请求函数去添加/更新
        const result = await reqAddOrUpdateProduct(product);

        // 3. 根据结果提示
        if (result.status === 0) {
          message.success(`${ this.isUpdate ? '更新' : '添加' }商品成功!`);
          this.props.history.goBack();
        } else {
          message.error(`${ this.isUpdate ? '更新' : '添加' }商品失败!`);
        }
      }
    })
  }

  componentWillMount () {
    // 取出携带的state
    // console.log(this.props);
    const product = this.props.location.state;  // 如果是添加没值, 否则有值
    // 保存是否是更新的标识
    this.isUpdate = !!product;
    // 保存商品(如果没有, 保存{})
    this.product = product || {};
  }

  render() {
    const { isUpdate, product } = this;
    const { imgs } = product;

    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: { span: 2 },  // 左侧label的宽度
      wrapperCol: { span: 8 }, // 右侧包裹的宽度
    }

    // 头部左侧标题
    const title = (
      <span>
        <LinkButton onClick={ () => this.props.history.goBack() }>
          <Icon type='arrow-left' style={{ fontSize: 20 }}/>
        </LinkButton>
        <span>{ isUpdate ? '修改商品' : '添加商品' }</span>
      </span>
    )

    return (
      <Card title={ title }>
        <Form { ...formItemLayout } ref={ this.formRef }>
          <Item label="商品名称" name='productname' initialValue={ product.productname } rules={ [
            { required: true, message: '必须输入商品名称' }
          ] }>
            <Input placeholder='请输入商品名称'/>
          </Item>
          <Item label="商品描述" name='desc' initialValue={ product.desc } rules={ [
            { required: true, message: '必须输入商品描述' }
          ] }>
            <TextArea placeholder="请输入商品描述" autosize={{ minRows: 2, maxRows: 6 }} />
          </Item>
          <Item label="商品价格" name='price' initialValue={ product.price } rules={ [
            { required: true, message: '必须输入商品价格' },
            { validator: this.validatePrice }
          ] }>
            <Input type='number' placeholder='请输入商品价格' addonAfter='元'/> 
          </Item>
          <Item label="商品图片">
            <PicturesWall ref={ this.pw } imgs={ imgs }/>
          </Item>
          <Item>
            <Button type='primary' onClick={ this.submit }>提交</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}
