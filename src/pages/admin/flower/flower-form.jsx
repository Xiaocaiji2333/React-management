import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Select,
  Input
} from 'antd';

import PicturesWall from '../../../components/pictures-wall/pictures-wall';

const { Item } = Form;
const { TextArea } = Input;

/*
添加/修改form组件
 */
export default class FlowerForm extends PureComponent {
  form = React.createRef();
  pw = React.createRef();

  static propTypes = {
    setFormAndPw: PropTypes.func.isRequired, // 用来传递form对象的函数
    flower: PropTypes.object
  }

  componentDidMount () {
    this.props.setFormAndPw(this.form, this.pw);
  }

  render() {
    const { flower } = this.props;
    console.log(flower);
    const imgs = flower.flowername ? [{ img: flower.img, flowername: flower.flowername }] : [];
    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: { span: 4 },  // 左侧label的宽度
      wrapperCol: { span: 15 }, // 右侧包裹的宽度
    }

    return (
      <Form { ...formItemLayout } ref={ this.form }>
        <Item label='鲜花名' name='flowername' initialValue={ flower.flowername ? flower.flowername : '' }
        rules={ [(flower._id ? { required: false } : { required: true, message: '鲜花名不能为空！' })] }>
          <Input placeholder='请输入鲜花名称'/>
        </Item>

        <Item label="鲜花描述" name='desc' initialValue={ flower.desc } rules={ [
            { required: true, message: '必须输入鲜花描述' }
          ] }>
            <TextArea placeholder="请输入鲜花描述" autosize={{ minRows: 2, maxRows: 6 }} />
          </Item>

        <Item label='数量' name='total' initialValue={ flower.total ? flower.total : '' }
        rules={ [
          { pattern: /^[1-9][0-9]*$/, message: '数量必须是大于0的数字！' },
          ] }>
          <Input type='number' placeholder='请输入数量'/>
        </Item>
        
        <Item label='价格' name='price' initialValue={ flower.price ? flower.price : '' }
        rules={ [flower._id ? { required: false } : { required: true, message: '价格不能为空！' },
          { pattern: /^[1-9][0-9]*$/, message: '价格必须是大于0的数字！' },
          ] }>
          <Input type='number' placeholder='请输入价格'/>
        </Item>

        <Item label='图片'>
          <PicturesWall ref={ this.pw } imgs={ imgs }/>
        </Item>
      </Form>
    )
  }
}
