/*
 * @Author       : topfivegao
 * @Date         : 2023-02-22 02:54:18
 * @FilePath     : /backend/src/pages/status/index.tsx
 * @LastEditTime : 2023-02-27 20:27:08
 * @Description  : 有空一起吃个饭啊!	微信联系 treeshaking666
 * 
 * Copyright (c) 2023 by topfivegao, All Rights Reserved. 
 */

import { Avatar, List, Skeleton, Button } from 'antd';
import React, { useState } from 'react';
import { connect } from 'umi';

interface DataType {
    name: string;
    picture: string;
    desc: string;
    readed: boolean;
}

const App: React.FC<{ loading: boolean, message: DataType[], dispatch: any }> = ({ message, dispatch, loading }: { message: DataType[], dispatch: any, loading: boolean, }) => {

    return (
        <>
            <Skeleton avatar title={false} active
                loading={loading}
                paragraph={{ rows: 3, width: '100vw' }}>
                <List
                    className="demo-loadmore-list"
                    // 学习用途，应注意实际使用场景
                    locale={{ emptyText: "暂无数据，不如去跳舞吧！" }}
                    itemLayout='horizontal'
                    dataSource={message}
                    renderItem={item => (
                        <List.Item
                            actions={[
                                item.readed
                                    ? <Button type='link' style={{ marginRight: '20px' }} onClick={() => {
                                        console.log('click', item)
                                    }}>已读</Button>
                                    : <Button type='link' style={{ marginRight: '20px' }} onClick={
                                        () => {
                                            console.log('click', item)
                                            if (!item.readed) {
                                                dispatch({
                                                    type: 'message/read',
                                                    item
                                                })
                                            }
                                        }
                                    }>未读</Button>]}
                        >
                            <Skeleton avatar title={false} active loading={false}>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.picture} />}
                                    title={item.name}
                                    description={item.desc}
                                />
                            </Skeleton>
                        </List.Item>
                    )}
                />
            </Skeleton>
        </>
    );
};

export default connect(({ message }: { message: DataType[] }) => {

    return { message }
})(App);