/*
 * @Author       : topfivegao
 * @Date         : 2023-01-24 00:23:49
 * @FilePath     : /backend/src/pages/types/index.tsx
 * @LastEditTime : 2023-01-24 16:36:05
 * @Description  : 有空一起吃个饭啊!	微信联系 treeshaking666
 * 
 * Copyright (c) 2023 by topfivegao, All Rights Reserved. 
 */
import { getTypeList, delType } from '@/api';
import { Space, Table, Button, Spin } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';
import { useRequest, history } from 'umi';

interface DataType {
    key: string;
    name: string;
}

const App: React.FC = () => {

    // 删除分类
    const { run } = useRequest((values) => {
        return delType(values)
    }, {
        manual: true,
        onSuccess: (_: any, parms: any[]) => {
            mutate(data.filter((item: any) => {
                return item.key !== parms[0]
            }))
        }
    })
    // 获取分类
    const { data, loading, mutate } = useRequest(async () => {
        const result = await getTypeList()
        return {
            data: result.results.map((item: any) => {
                return {
                    key: item.objectId,
                    name: item.item
                }
            })
        }
    })
    const columns: ColumnsType<DataType> = [
        {
            title: '分类名称',
            dataIndex: 'name',
            key: 'name',
            render: text => <b>{text}</b>,
        },
        {
            title: '操作',
            key: 'action',
            dataIndex: 'action',
            render: (_, record) => <Space size={'middle'}>
                <Button type={'primary'} size={'small'} onClick={
                    () => {
                        console.log('编辑按钮 ', record);
                        history.push({
                            pathname: '/types/edit',
                            query: record as any
                        })
                    }
                }>编辑</Button>
                <Space> </Space>
                <Button size={'small'} danger onClick={
                    () => {
                        // 发送 delete 请求给后端
                        run(record.key)
                    }
                }>删除</Button>
            </Space>,
        }
    ];
    return (
        <>
            <Spin spinning={loading}>
                <Table columns={columns} dataSource={data} />
            </Spin>;
        </>
    )
}

export default App;