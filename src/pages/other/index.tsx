/*
 * @Author       : topfivegao
 * @Date         : 2022-12-12 22:42:24
 * @FilePath     : /backend/src/pages/other/index.tsx
 * @LastEditTime : 2023-02-19 15:14:31
 * @Description  : 有空一起吃个饭啊!	微信联系 treeshaking666
 * 
 * Copyright (c) 2022 by topfivegao, All Rights Reserved. 
 */

import React from 'react'
import { connect } from 'umi'
import { Divider } from 'antd'

const Other: React.FC = (props: any) => {
  console.log(props)
  return (
    <>
      <Divider orientation={'left'}>页面 1</Divider>
      {props.state}
    </>
  )
}

export default connect(({ test }: { test: any }) => {
  console.log('page 1:', test);
  return { state: test }
})(Other)