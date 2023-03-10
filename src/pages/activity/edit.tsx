/*
 * @Author       : topfivegao
 * @Date         : 2023-01-15 23:40:01
 * @FilePath     : /backend/src/pages/activity/edit.tsx
 * @LastEditTime : 2023-01-22 16:42:01
 * @Description  : 有空一起吃个饭啊!	微信联系 treeshaking666
 * 
 * Copyright (c) 2023 by topfivegao, All Rights Reserved. 
 */

import React, { useEffect } from 'react';
import { Button, Form, Input, message, Spin } from 'antd';
import ImageUpload from '@/components/ImageUpload'
import { updateBanner } from '@/api';
import { useRequest, history } from 'umi';


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const EditActivity: React.FC = (props: any) => {
    const [form] = Form.useForm();

    const { data, loading, run } = useRequest((values) => {
        console.log('form信息: ', values);
        return updateBanner(props.location.query.key, values)
    }, { manual: true })

    let initData = {
        imgUrl: props.location.query.imgUrl
    }
    useEffect(() => {
        form.setFieldsValue(props.location.query)
    }, [])

    useEffect(() => {
        // 解析后端返回数据, 只做展示之用，熟悉 async 和 await 用法
        // const parseResponse = async () => {
        //     if (data) {
        //         const r = await data.json()
        //         console.log(r);
        //         return r
        //     }
        // }
        // parseResponse()

        // 后端有数据后，进行路由跳转
        if (data) {
            history.push({
                pathname: '/activity/home'
            })
            message.success('更新成功！')
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
            <Form {...layout} form={form} initialValues={initData} name="control-hooks" onFinish={onFinish} onValuesChange={handleForm}>
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
                        确认修改
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

export default EditActivity;