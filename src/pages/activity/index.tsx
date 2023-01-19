/*
 * @Author       : topfivegao
 * @Date         : 2023-01-03 20:47:45
 * @FilePath     : /backend/src/pages/activity/index.tsx
 * @LastEditTime : 2023-01-16 01:12:56
 * @Description  : 有空一起吃个饭啊!	微信联系 treeshaking666
 * 
 * Copyright (c) 2023 by topfivegao, All Rights Reserved. 
 */

import { Space, Table, Button, Image } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { delBanner, getBannarList } from '@/api';
import { useRequest, history } from 'umi'

interface Activity {
  key: string;
  title: string;
  link: number;
  imgUrl: string;
}

const Activity: React.FC = () => {

  const columns: ColumnsType<Activity> = [
    {
      title: '活动ID',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: '活动名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '活动链接',
      dataIndex: 'link',
      key: 'link',
      render: text => <a href={text} target='_blank'>点击预览</a>,
    },
    {
      title: '活动封面',
      dataIndex: 'imgUrl',
      key: 'imgUrl',
      render: (url) => <Image src={url} width={100} height={140}></Image>
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
              pathname: '/activity/edit',
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
  const { data, loading, mutate } = useRequest(async () => {
    const res = await getBannarList()
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

    return delBanner(value)
  }, {
    manual: true,
    onSuccess: (_: any, params: any) => {
      mutate(data.filter((item: any) => item.key != params[0]))
    }
  })

  return <Table columns={columns} dataSource={data} loading={loading} />
}



export default Activity;