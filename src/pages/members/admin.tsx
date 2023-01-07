/*
 * @Author       : topfivegao
 * @Date         : 2023-01-03 20:48:01
 * @FilePath     : /backend/src/pages/members/admin.tsx
 * @LastEditTime : 2023-01-03 20:48:03
 * @Description  : 有空一起吃个饭啊!	微信联系 treeshaking666
 * 
 * Copyright (c) 2023 by topfivegao, All Rights Reserved. 
 */
import React from 'react';
import { Button, Form, Input, Select, Spin, message } from 'antd';
import { addMember } from '@/api'
import useRequest from '@ahooksjs/use-request';


const { Option } = Select;

const Admin: React.FC = () => {
  let { loading, run } = useRequest((values) => {
    console.log('useRequest manual executing');
    message.success('录入成功！')
    return addMember(values)
    
  }, {
    manual: true
  })
  const onFinish = (values: any) => {
    const [age, salary] = [Number(values.age), Number(values.salary)]
    if (age.toString() == "NaN") {
      message.error("请重新输入！年龄应该为数字！")
      return 
    }
    if (salary.toString() == "NaN") {
      message.error("请重新输入！薪资应该为数字！")
      return
    }
    const member = {
      ...values,
      age,
      salary
    }
    console.log('form:', member);
    run(member)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <Spin spinning={loading}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="姓名"
          name="name"
          rules={[{ required: true, message: '请输入员工姓名!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="年龄"
          name="age"
          rules={[{ required: true, message: '请输入年龄!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='address'
          label="城市"
          rules={[{ required: true, message: '请选择工作城市!' }]}
        >
          <Select placeholder="选择城市">
            <Option value="成都">成都市</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="薪资"
          name="salary"
          rules={[{ required: true, message: '请输入员工薪资!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 12, span: 16 }}>
          <Button type="primary" htmlType="submit">
            确认录入
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default Admin;