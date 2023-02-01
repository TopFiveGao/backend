/*
 * @Author       : topfivegao
 * @Date         : 2023-01-23 17:14:49
 * @FilePath     : /backend/src/pages/goods/index.tsx
 * @LastEditTime : 2023-01-23 23:06:57
 * @Description  : 有空一起吃个饭啊!	微信联系 treeshaking666
 * 
 * Copyright (c) 2023 by topfivegao, All Rights Reserved. 
 */


/*
 * @Author       : topfivegao
 * @Date         : 2023-01-03 20:47:45
 * @FilePath     : /backend/src/pages/members/index.tsx
 * @LastEditTime : 2023-01-03 21:02:09
 * @Description  : 有空一起吃个饭啊!	微信联系 treeshaking666
 * 
 * Copyright (c) 2023 by topfivegao, All Rights Reserved. 
 */

import { Space, Table, Button, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { delMember, getMemberList } from '@/api';
import { useRequest } from 'umi'

interface Members {
  key: string;
  name: string;
  age: number;
  address: string;
  salary: number;
}

// 使用useRequest实现业务
const MemberList: React.FC = () => {

  const columns: ColumnsType<Members> = [
    {
      title: '员工编码',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      render: text => <i>{text}</i>,
    },
    {
      title: '城市',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '工资',
      dataIndex: 'salary',
      key: 'salary',
    },
    {
      title: '管理',
      key: 'action',
      dataIndex: 'action',
      render: (_, record) => <Space size={'large'}>
        <Button type={'primary'} size={'small'} onClick={
          () => {
            console.log('编辑按钮 ', record);
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
  const { data, loading, mutate } = useRequest(async () => {
    const res = await getMemberList()
    return {
      data: res.results.map((item: any) => {
        let ret = {
          ...item,
          key: item.objectId
        }
        delete ret.objectId
        return ret
      })
    }
  })

  let { run } = useRequest((value: string) => {

    return delMember(value)
  }, {
    manual: true,
    onSuccess: (_: any, params: any) => {
      mutate(data.filter((item: any) => item.key != params[0]))
    }
  })

  return <Table columns={columns} dataSource={data} loading={loading} />
}



export default MemberList;