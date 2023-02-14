/*
 * @Author       : topfivegao
 * @Date         : 2023-02-13 12:52:46
 * @FilePath     : /backend/src/pages/register/index.tsx
 * @LastEditTime : 2023-02-15 02:45:44
 * @Description  : 有空一起吃个饭啊!	微信联系 treeshaking666
 * 
 * Copyright (c) 2023 by topfivegao, All Rights Reserved. 
 */
import { userRegister } from '@/api/user';
import { Button, Form, Input, Row, Col, Card, Spin, message } from 'antd';
import React from 'react';
import { useModel, history, useRequest } from 'umi'

const Register: React.FC = () => {

    const [form] = Form.useForm()
    const { loading, run } = useRequest((values: any) => {
        const user: User = {
            username: values.username,
            password: values.password,
            email: values.email
        }
        return userRegister(user)
    }, {
        manual: true,
        onSuccess(res, params) {
            res.json().then((r: any) => {
                console.log(r);
                const { code, error } = r
                if (code) {
                    message.error(`注册失败！ ${error}`)
                    return
                }
                console.log('新用户注册成功', r)
                message.success('注册成功！请及时激活账号！')
                history.push({
                    pathname: '/login',
                    query: r
                })
            })
        },
        onError(e, params) {
            console.log('注册失败: ', e, params[0])
            message.error('用户注册失败！')
        },
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
            <Col span={8}>
                <Card title="用户注册" >
                    <Spin spinning={loading}>
                        <Form
                            name="basic"
                            form={form}
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 19 }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="用户"
                                name="username"
                                hasFeedback
                                rules={[{ required: true, message: '请输入用户!' }]}
                            >
                                <Input onBlur={(e) => {
                                    form.setFieldValue('username', e.target.value.trim())
                                }} />
                            </Form.Item>

                            <Form.Item
                                label="密码"
                                name="password"
                                hasFeedback
                                rules={[{ required: true, message: '请输入密码!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                label="确认密码"
                                name="confirm"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    { required: true, message: '请核对密码!' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('两次输入的密码不匹配!'));
                                        },
                                    }),

                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                label="邮箱"
                                name="email"
                                hasFeedback
                                rules={[
                                    {
                                        type: 'string',
                                        message: '输入邮箱不正确!',
                                        pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
                                    },
                                    { required: true, message: '请输入邮箱!' },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 11, span: 13 }}>
                                <Button type="primary" htmlType="submit">
                                    确认
                                </Button>
                            </Form.Item>
                        </Form>
                    </Spin>
                </Card>
            </Col>
        </Row>
    );
};

export default Register;