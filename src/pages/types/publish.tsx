/*
 * @Author       : topfivegao
 * @Date         : 2023-01-24 00:24:31
 * @FilePath     : /backend/src/pages/types/publish.tsx
 * @LastEditTime : 2023-01-24 16:33:47
 * @Description  : 有空一起吃个饭啊!	微信联系 treeshaking666
 * 
 * Copyright (c) 2023 by topfivegao, All Rights Reserved. 
 */
import React, { useEffect } from 'react';
import { Button, Form, Input, message, Spin } from 'antd';
import { addType, getTypeList } from '@/api';
import { useRequest, history } from 'umi';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const TypePublish: React.FC = () => {
    const [form] = Form.useForm();
    const typeList: string[] = []
    // 提交表单 产品发布
    const { data, loading, run } = useRequest((values) => {
        return addType(values)
    }, { manual: true })

    // 获取已经有的分类， 防止录入重名，此处需要对 typeList 监听，否则有bug
    useEffect(() => {
        getTypeList().then((res: any) => {
            for (let i = 0; i < res.results.length; i++) {
                typeList.push(res.results[i].item)
            }
        })
    }, [typeList])

    useEffect(() => {
        // 产品发布成功后，进行路由跳转
        if (data) {
            history.push({
                pathname: '/types/home'
            })
            message.success('添加分类成功！')
        }
    }, [data])

    const onFinish = (values: any) => {
        for (let i = 0; i < typeList.length; i++) {
            if (typeList[i] === values.item.trim()){
                message.info('该分类已经存在，请重新添加！')
                return
            }
        }
        run(values)
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <Spin spinning={loading}>
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} >
                <Form.Item name="item" label="分类名称" rules={[{ required: true }]}>
                    <Input placeholder='请输入分类名称'/>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        添加
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        重设
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    );
};

export default TypePublish;