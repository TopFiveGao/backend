/*
 * @Author       : topfivegao
 * @Date         : 2023-02-19 02:43:47
 * @FilePath     : /backend/src/pages/other/option.tsx
 * @LastEditTime : 2023-02-19 15:30:56
 * @Description  : 有空一起吃个饭啊!	微信联系 treeshaking666
 * 
 * Copyright (c) 2023 by topfivegao, All Rights Reserved. 
 */

import React from 'react'
import { connect } from 'umi'
import { Divider, Button } from 'antd'

const Option: React.FC = (props: any) => {
    console.log(props)
    return (
        <>
            <Divider orientation={'left'}>页面 2</Divider>
            {props.num}
            <Button onClick={()=> {
                props.dispatch({
                    type:'test/increment',
                    param: 10
                })
            }}>更改</Button>
        </>
    )
}

export default connect(({ test }: { test: number }) => {
    console.log('page2: ', test);
    return { num: test }
})(Option)