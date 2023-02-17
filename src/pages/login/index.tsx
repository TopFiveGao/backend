/*
 * @Author       : topfivegao
 * @Date         : 2023-02-06 15:23:24
 * @FilePath     : /backend/src/pages/login/index.tsx
 * @LastEditTime : 2023-02-17 23:21:56
 * @Description  : 有空一起吃个饭啊!	微信联系 treeshaking666
 * 
 * Copyright (c) 2023 by topfivegao, All Rights Reserved. 
 */

import { userLogin } from '@/api/user';
import { USER_INFO } from '@/utils/consts';
import { Button, Form, Input, Row, Col, Card, Checkbox, Spin, message } from 'antd';
import React, { useState } from 'react';
import { useModel, useRequest, history } from 'umi'

const Login: React.FC = (props: any) => {

    const { initialState, loading, refresh, setInitialState } = useModel('@@initialState');
    // 函数式组件中如果要所用变量没有采用hooks，出了问题一定要首先检查这个变量
    const [remember, setRemember] = useState(false)
    const user: User = { username: '', password: '' }

    console.log(props)

    const query = props.location.query

    const { data, run } = useRequest((values) => {
        user.username = values.username
        user.password = values.password
        setRemember(values.remember)
        return userLogin(user)
    }, {
        manual: true,
        onSuccess(r, params) {

            r.json().then((res: any) => {
                console.log(res);
                const { code, error } = res
                if (code) {
                    message.error(`登录失败！ ${error}`)
                    return
                }

                if (res.sessionToken) {
                    // 登录成功, 更新 layout 消费数据
                    setInitialState({
                        ...initialState,
                        isLogin: true,
                        userInfo: res
                    } as any).then(() => {
                        console.log('setInitialState success:')
                        // 本地保存登录状态
                        let store = sessionStorage
                        if (remember) {
                            store = localStorage
                        }
                        store.setItem(USER_INFO, JSON.stringify(res))
                        history.push('/')
                    })
                }
            })
        },
        onError(e, params) {
            console.log('登录失败', e)
        },
        throwOnError: true
    })

    const onFinish = (values: any) => {
        console.log(values);
        run(values)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Row align={'middle'} justify={'center'} style={{ backgroundColor: 'ButtonFace', height: '100vh' }}>
            <Col span={6}>
                <Card title="用户登录" extra={<a href="/register">去注册</a>} >
                    <Spin spinning={loading}>
                        <Form
                            name="basic"
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 19 }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                            initialValues={{ remember }}
                        >
                            <Form.Item
                                label="用户"
                                name="username"
                                rules={[{ required: true, message: '请输入用户!' }]}
                            >
                                <Input placeholder={'默认用户名 admin'} />
                            </Form.Item>

                            <Form.Item
                                label="密码"
                                name="password"
                                rules={[{ required: true, message: '请输入密码!' }]}
                            >
                                <Input.Password placeholder={'默认密码 123456'} />
                            </Form.Item>

                            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 11, span: 13 }}>
                                <Checkbox>记住密码</Checkbox>
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 11, span: 13 }}>
                                <Button type="primary" htmlType="submit">
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </Spin>
                </Card>
            </Col>
        </Row>
    );
};

export default Login;