import React from 'react';
import PropTypes from 'prop-types';
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
// import { reqDeleteImg } from '../../../api';
import { BASE_IMG_URL } from "../../utils/constants";
/*
用于图片上传的组件
 */
export default class PicturesWall extends React.Component {

  static propTypes = {
    imgs: PropTypes.array
  }

  state = {
    previewVisible: false, // 标识是否显示大图预览Modal
    previewImage: '', // 大图的url
    fileList: [
      /*{
        uid: '-1', // 每个file都有自己唯一的id
        name: '', // 图片文件名
        status: 'done', // 图片状态: done-已上传, uploading: 正在上传中, removed: 已删除
        url: '', // 图片地址
      },*/
    ],
  }

  constructor (props) {
    super(props);

    let fileList = [];

    // 如果传入了imgs属性
    const { imgs } = this.props;
    console.log(imgs);
    if (imgs && imgs.length > 0) {
      fileList = imgs.map((img, index) => ({
        uid: -index, // 每个file都有自己唯一的id
        name: img.flowername, // 图片文件名
        status: 'done', // 图片状态: done-已上传, uploading: 正在上传中, removed: 已删除
        url: img.img
      }))
    }

    // 初始化状态
    this.state = {
      previewVisible: false, // 标识是否显示大图预览Modal
      previewImage: '', // 大图的url
      fileList // 所有已上传图片的数组
    }
  }

  /*
  获取所有已上传图片文件名的数组
   */
  getImgs  = () => {
    // return this.state.fileList.map(file => file.name);
    return this.state.fileList.map(file => file.thumbUrl);
  }

  /*
  隐藏Modal
   */
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    console.log('handlePreview()', file);
    // 显示指定file对应的大图
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  /*
  file: 当前操作的图片文件(上传/删除)
  fileList: 所有已上传图片文件对象的数组
   */
  handleChange = async ({ file, fileList }) => {
    // console.log(file, file.status, fileList.length, file === fileList[fileList.length-1]);

    // 一旦上传成功, 将当前上传的file的信息修正(name, url)
    if(file.status === 'done') {
      const result = file.response;  // {status: 0, data: {name: 'xxx.jpg', url: '图片地址'}}
      if(result.status === 0) {
        message.success('上传图片成功!');
        const { name, url } = result.data;
        file = fileList[fileList.length-1];
        file.name = name;
        file.url = url;
      } else {
        message.error('上传图片失败');
      }
    }

    // 在操作(上传/删除)过程中更新fileList状态
    this.setState({ fileList });
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined/>
        <div>Upload</div>
      </div>
    );
    console.log(fileList);
    return (
      <div>
        <Upload
          maxCount={ 1 }
          action='/manage/img/upload'
          accept='image/*'  /*只接收图片格式*/
          name='image' /*请求参数名*/
          listType="picture-card"  /*卡片样式*/
          fileList={ fileList[0] && fileList }  /*所有已上传图片文件对象的数组*/
          onPreview={ this.handlePreview }
          onChange={ this.handleChange }
        >
          { fileList.length >= 1 ? null : uploadButton }
        </Upload>

        <Modal visible={ previewVisible } footer={ null } onCancel={ this.handleCancel }>
          <img alt="example" style={{ width: '100%' }} src={ previewImage } />
        </Modal>
      </div>
    );
  }
}