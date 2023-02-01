/*
 * @Author       : topfivegao
 * @Date         : 2023-01-23 17:15:48
 * @FilePath     : /backend/src/pages/goods/publish.tsx
 * @LastEditTime : 2023-01-31 22:47:45
 * @Description  : 有空一起吃个饭啊!	微信联系 treeshaking666
 * 
 * Copyright (c) 2023 by topfivegao, All Rights Reserved. 
 */
import React, { useEffect, useState } from 'react';
import { Button, Form, Select, message, Spin } from 'antd';
import { addGoods, getTypeList } from '@/api';
import { useRequest, history } from 'umi';
import Editor from '@/components/CommonEditor'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const GoodsPublish: React.FC = () => {
  const [form] = Form.useForm();
  let [kindList, setKindList] = useState([])
  useEffect(() => {
    getTypeList().then((res: any) => {
      setKindList(res.results)
    })
  }, [])
  // 提交表单 产品发布
  const { data, loading, run } = useRequest((values) => {
    console.log('form信息: ', values);
    return addGoods(values)
  }, { manual: true })

  useEffect(() => {
    // 产品发布成功后，进行路由跳转
    if (data) {
      history.push({
        pathname: '/goods/home'
      })
      message.success('发布成功！')
    }
  }, [data])

  const onFinish = (values: any) => {
    console.log(values);
    // run(values)
  };

  const onReset = () => {
    form.resetFields();
  };

  return (

    <Spin spinning={loading}>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} >
        <Form.Item name="kindId" label="分类选择" rules={[{ required: true }]}>
          <Select placeholder={'点击选择'}>
            {
              kindList.map((item: any) => {
                return <Select.Option key={item.objectId} value={item.objectId}>{item.item}</Select.Option>
              })
            }
          </Select>
        </Form.Item>
        <Form.Item name="detail" label="产品详情" rules={[{ required: true }]}>
          <Editor />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button htmlType="button" onClick={onReset}>
            重设
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default GoodsPublish;