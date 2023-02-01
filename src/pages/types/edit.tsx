/*
 * @Author       : topfivegao
 * @Date         : 2023-01-24 02:53:49
 * @FilePath     : /backend/src/pages/types/edit.tsx
 * @LastEditTime : 2023-01-25 02:20:06
 * @Description  : 有空一起吃个饭啊!	微信联系 treeshaking666
 * 
 * Copyright (c) 2023 by topfivegao, All Rights Reserved. 
 */
import React, { useEffect } from 'react';
import { Button, Form, Input, message, Spin } from 'antd';
import { updateType, getTypeList } from '@/api';
import { useRequest, history } from 'umi';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const TypesEdit: React.FC = (props: any) => {
    const [form] = Form.useForm();
    const typeList: string[] = []
    const TYPE_NAME = 'typeName'

    // 路由跳转时一定要注意页面返回的 bug，暂时想到可以用 sessionStorage 解决
    let kind: string = props.location.query.name

    if (!sessionStorage.getItem(TYPE_NAME)) {
        sessionStorage.setItem(TYPE_NAME, kind)
    } else {
        kind = sessionStorage.getItem(TYPE_NAME) || ''
    }
    

    // 提交表单 产品发布
    const { data, loading, run } = useRequest((values) => {
        console.log('form信息: ', values, props);
        return updateType(props.location.query.key, values)
    }, {
        manual: true
    })

    // 获取已经有的分类， 防止录入重名
    useEffect(() => {
        getTypeList().then((res: any) => {
            for (let i = 0; i < res.results.length; i++) {
                typeList.push(res.results[i].item)
            }
            console.log(typeList);
        })
    }, [typeList])

    useEffect(() => {
        // 分类名称修改成功后，进行路由跳转
        if (data) {
            sessionStorage.setItem(TYPE_NAME, kind)
            history.push({
                pathname: '/types/home'
            })
            message.success('分类修改成功！')
        }
        return () => {
            sessionStorage.removeItem(TYPE_NAME)
        }
    }, [data])

    const onFinish = (values: any) => {
        console.log(typeList);
        if (kind === values.item) {
            message.warning('分类名称并未改变！')
            return
        }
        for (let i = 0; i < typeList.length; i++) {
            if (typeList[i] === values.item) {
                message.info('该分类已经存在，请重新添加！')
                return
            }
        }
        // kind = values.item
        run(values)
    };

    const goBack = () => {
        // form.resetFields();
        history.goBack()
    };

    return (
        <Spin spinning={loading}>
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} >
                <Form.Item name="item" label="分类名称" rules={[{ required: true }]}>
                    <Input placeholder='请输入分类名称' />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        修改
                    </Button>
                    <Button htmlType="button" onClick={goBack}>
                        返回
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    );
};

export default TypesEdit;