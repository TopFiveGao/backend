/*
 * @Author       : topfivegao
 * @Date         : 2023-02-17 20:55:06
 * @FilePath     : /backend/src/components/HeaderDropMenu.tsx
 * @LastEditTime : 2023-03-01 22:40:56
 * @Description  : 有空一起吃个饭啊!	微信联系 treeshaking666
 * 
 * Copyright (c) 2023 by topfivegao, All Rights Reserved. 
 */
import { USER_INFO } from '@/utils/consts';
import { LogoutOutlined, UserOutlined, RightOutlined, DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, message, Space, Button, Badge } from 'antd';
import React from 'react';
import { history, useModel, connect } from 'umi';


// 这里加 <any> 可以在组件上加属性
const App: React.FC<any> = (props: any) => {
    const { initialState, loading, refresh, setInitialState } = useModel('@@initialState');
    const items: MenuProps['items'] = [
        {
            label: '个人信息',
            icon: <UserOutlined />,
            key: '1',
        },
        {
            label: '相关设置',
            icon: <RightOutlined />,
            key: '2',
        },
        {
            label: '退出登录',
            icon: <LogoutOutlined />,
            key: '3',
        },
    ];

    const handleMenuClick: MenuProps['onClick'] = e => {
        const { key } = e
        if (key === '1') {
            message.info(`你好, ${props.username}！作者小高祝您使用愉快！`)
        } else if (key === '2') {

        } else {
            // 退出登录: 清楚本地登录状态
            setInitialState({
                ...initialState,
                isLogin: false,
                useInfo: null
            } as any).then(res => {
                console.log('退出登录');
                sessionStorage.removeItem(USER_INFO)
                localStorage.removeItem(USER_INFO)
                history.goBack()
            })
        }
    };

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return (
        <Space wrap style={{ marginRight: 20, marginTop: 5 }}>
            <Badge size={'small'} count={props.count}>
                <Dropdown menu={menuProps} >
                    <Button type='link'>
                        <Space>
                            {props.username}
                            <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>
            </Badge>
        </Space>
    )
}

interface DataType {
    key: string,
    name: string,
    desc: string,
    picture: string,
    readed: boolean
}

export default connect(({ message }: { message: DataType[] }) => ({
    count: message.filter(item => !item.readed).length
}))(App);