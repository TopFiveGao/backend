/*
 * @Author       : topfivegao
 * @Date         : 2023-02-06 15:23:24
 * @FilePath     : /backend/src/pages/login/index.tsx
 * @LastEditTime : 2023-02-09 00:51:34
 * @Description  : 有空一起吃个饭啊!	微信联系 treeshaking666
 * 
 * Copyright (c) 2023 by topfivegao, All Rights Reserved. 
 */

import { Button, Form, Input, Row, Col, Card } from 'antd';
import React from 'react';
import {useModel, history} from 'umi'

const Login: React.FC = () => {
    
    const { initialState, loading, error, refresh, setInitialState } = useModel('@@initialState');
    const defaultUser = {
        username: '西门庆',
        password: '12344321'
    }
    const onFinish = (values: any) => {
        setInitialState({...initialState,isLogin: true} as any).then(() => {
            console.log('setInitialState success')
            history.push('/')
        })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Row align={'middle'} justify={'center'} style={{ backgroundColor: 'ButtonFace', height: '100vh' }}>
            <Col span={6}>
                <Card title="用户登录" extra={<a href="#">去注册</a>} >
                    <Form
                        name="basic"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 19 }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        initialValues={defaultUser}
                    >
                        <Form.Item
                            label="用户"
                            name="username"
                            rules={[{ required: true, message: '请输入用户!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[{ required: true, message: '请输入密码!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 11, span: 13 }}>
                            <Button type="primary" htmlType="submit">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
};

export default Login;