/*
 * @Author       : topfivegao
 * @Date         : 2023-01-05 14:12:16
 * @FilePath     : /backend/src/components/ImageUpload.tsx
 * @LastEditTime : 2023-01-07 23:03:35
 * @Description  : 有空一起吃个饭啊!	微信联系 treeshaking666
 * 
 * Copyright (c) 2023 by topfivegao, All Rights Reserved. 
 */
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { RcFile } from 'antd/es/upload/interface';
import React, { useState } from 'react';

import LeanCloudSDK from '@/utils/init-leancloud-sdk.js'




const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只能上传JPG/PNG图片格式!');
  }
  const isLt10M = file.size / 1024 / 1024 < 10;
  if (!isLt10M) {
    message.error('图片大小需低于10MB!');
  }
  return isJpgOrPng && isLt10M;
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传图片</div>
    </div>
  );
  const createImgObj = (fn:string, file: any) => {
    const Img = LeanCloudSDK.Object.extend(fn);
    const img = new Img();
    img.set('title', fn);
    // attachments 是一个 Array 属性
    img.add('attachments', file);
    img.save();
    console.log(img);

  }

  const imageRequest = (info: any) => {
    getBase64(info.file, base64 => {
      const fn = info.file.name
      console.log('本地上传图片的名字：', fn);
      // 调用 sdk 构建文件
      const file = new LeanCloudSDK.File(fn, { base64 });
      // 保存文件
      file.save().then((file: any) => {
        const furl = file.attributes.url
        setLoading(false)
        setImageUrl(furl)
        createImgObj('active', file)
      }, (error: any) => {
        // 保存失败，可能是文件无法被读取，或者上传过程中出现问题
        console.log(`文件保存失败：${error}`);
      });
    })

  }

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      customRequest={imageRequest}
      showUploadList={false}
      beforeUpload={beforeUpload}
    >
      {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
    </Upload>
  );
};

export default App;