import React, { useState, useEffect, useMemo } from 'react';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const PicturesWall = props => {
  const {defaultImage} = props;
  const [state,setState] = useState ({
    previewVisible: false,
    previewImage: '',
    fileList: []
  });

useEffect(() =>{
  
  if(state.fileList.length === 0){
    setState({...state,fileList:[...state.fileList,{
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: defaultImage,
    },]})  
  }
  



},[defaultImage]);

  const handleCancel = () => setState({ previewVisible: false });

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  const handleChange = ({ fileList }) => {
    setState({ fileList });
    if(fileList.length > 0){
      if(fileList && fileList[0].response){
        props.setUrl(fileList[0].response.url);
      }

    }
   

  } 
  
  
    const { previewVisible, previewImage, fileList } = state;
  
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
      
        <Upload
          action="https://api.artfactoryedu.com/useradmin/toyupload"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }


export default PicturesWall;
