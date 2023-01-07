/*
 * @Author       : topfivegao
 * @Date         : 2023-01-03 19:55:51
 * @FilePath     : /backend/src/pages/activity/publish.tsx
 * @LastEditTime : 2023-01-05 15:58:09
 * @Description  : 有空一起吃个饭啊!	微信联系 treeshaking666
 * 
 * Copyright (c) 2023 by topfivegao, All Rights Reserved. 
 */
import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import ImageUpload from '@/components/ImageUpload'

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Publish: React.FC = () => {
  const [form] = Form.useForm();
  
  const onFinish = (values: any) => {
    console.log(values);
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

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
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
  );
};

export default Publish;