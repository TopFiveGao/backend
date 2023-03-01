/*
* @Author       : topfivegao
* @Date         : 2023-03-01 13:13:49
 * @FilePath     : /backend/src/pages/system/index.tsx
 * @LastEditTime : 2023-03-01 22:25:07
* @Description  : 有空一起吃个饭啊!	微信联系 treeshaking666
* 
* Copyright (c) 2023 by topfivegao, All Rights Reserved. 
*/
import { getUser, userDelete, userLogin, userQuery } from '@/api/user';
import { Table, Button, Spin, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';
import { useRequest, useModel } from 'umi'

interface DataType {
    key: string;
    name: string;
    isActive: boolean,
    session: string
}


const App: React.FC = () => {
    const { initialState } = useModel('@@initialState');
    const columns: ColumnsType<DataType> = [
        {
            title: '用户ID',
            dataIndex: 'objectId',
            key: 'id',
            render: text => <b>{text}</b>,
        },
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'name',
        },
        {
            title: '用户组',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: '状态',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (_, { isActive }) => {
                const color = isActive ? 'green' : 'volcano';
                const status = isActive ? '已激活' : '未激活';
                return <Tag color={color} >
                    {status}
                </Tag>
            }
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => {
                if (record.key === initialState?.userInfo.objectId) {
                    return <Button danger disabled> 删除</Button >
                }
                return <Button danger onClick={() => {
                    if(record.session){
                        run(record)
                    }
                    console.log('删除用户按钮')
                }}> 删除</Button >
            },
        },
    ];
    const { data, loading, mutate } = useRequest(async () => {
        const results = await userQuery()
        const res = results.results.map((item: any) => {
            let [tempRole, tabRole] = [item.role, '默认用户']
            if (tempRole == 'admin') {
                tabRole = '普通管理员'
            } else if (item.role == 'root') {
                tabRole = '超级管理员'
            } else {
                tabRole = '普通用户'
            }
            return {
                objectId: item.objectId,
                username: item.username,
                role: tabRole,
                isActive: item.emailVerified,
                key: item.objectId
            }
        }) 
        return { data: res }
    })
    const sessionToken = initialState?.userInfo?.sessionToken
    const { run } = useRequest(async (record: DataType) => {
        console.log('run', record);
        await userDelete(record.key, sessionToken)
        return {
            data: `${record.key}删除成功`
        }
    }, {
        manual: true,
        onSuccess(_, params: DataType[]) {
            // 更新 ui
            mutate(data.filter((item: DataType) => item.key != params[0].key))
        },
        onError(e, params) {
            console.log(e, params);
        },
    })

    return <>
        <Spin spinning={loading}>
            <Table columns={columns} dataSource={data} />
        </Spin>
    </>
}
export default App;