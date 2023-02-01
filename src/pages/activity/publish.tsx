/*
 * @Author       : topfivegao
 * @Date         : 2023-01-03 19:55:51
 * @FilePath     : /backend/src/pages/activity/publish.tsx
 * @LastEditTime : 2023-01-22 16:42:09
 * @Description  : 有空一起吃个饭啊!	微信联系 treeshaking666
 * 
 * Copyright (c) 2023 by topfivegao, All Rights Reserved. 
 */
import React, { useEffect } from 'react';
import { Button, Form, Input, message, Spin } from 'antd';
import ImageUpload from '@/components/ImageUpload'
import { addBanner } from '@/api';
import { useRequest, history } from 'umi';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Publish: React.FC = () => {
  const [form] = Form.useForm();
  const { data, loading, run } = useRequest((values) => {
    console.log('form信息: ', values);
    return addBanner(values)
  }, { manual: true })

  useEffect(() => {
    // 发布活动成功后，进行路由跳转
    if (data) {
      history.push({
        pathname: '/activity/home'
      })
      message.success('发布成功！')
    }
  }, [data])

  const onFinish = (values: any) => {
    run(values)
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      title: 'Hello world!',
      link: 'male',
    });
  };
  // 当封面图片上传时，自动填充 活动链接 字段
  const handleForm = (changeValues: any, allValues: any) => {
    const url = changeValues.imgUrl
    if (url) {
      form.setFieldValue('link', url)
    }
  }
  return (
    <Spin spinning={loading}>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} onValuesChange={handleForm}>
        <Form.Item name="title" label="活动名称" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="link" label="活动链接" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="imgUrl" label="封面图片" rules={[{ required: true }]}>
          <ImageUpload />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            确认发布
          </Button>
          <Button htmlType="button" onClick={onReset}>
            重设
          </Button>
          <Button type="link" htmlType="button" onClick={onFill}>
            默认
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default Publish;