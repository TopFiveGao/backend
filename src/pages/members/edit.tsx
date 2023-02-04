import React from 'react';
import { Button, Form, Input, Select, Spin, message } from 'antd';
import { updateMember } from '@/api'
import useRequest from '@ahooksjs/use-request';
import { history } from 'umi';


const { Option } = Select;

const Admin: React.FC = (props: any) => {
    const params = props.location.query
    let id: string = params.id
    const oldValue = {
        ...params,
        salary: Number(params.salary),
        age: Number(params.age),
    }
    let { loading, run } = useRequest((values) => {
        console.log('id: ', id)
        return updateMember(id, values)
    }, {
        manual: true,
        onSuccess(data, params) {
            history.goBack()
        },
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
        if(id){
            run(member)
        }else{
            console.log('当前页面是非法的编辑页面！')
        }
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
                initialValues={oldValue}
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
                        确认修改
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    );
};

export default Admin;