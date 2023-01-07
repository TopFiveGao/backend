/*
 * @Author       : topfivegao
 * @Date         : 2022-12-11 15:12:51
 * @FilePath     : /backend/mock/index.ts
 * @LastEditTime : 2022-12-19 11:28:24
 * @Description  : 有空一起吃个饭啊!	微信联系 treeshaking666
 * 
 * Copyright (c) 2022 by topfivegao, All Rights Reserved. 
 */
import { Request, Response } from 'umi'
import Mockjs from 'mockjs'

const db_table = Mockjs.mock({
  code: 200,
  msg: "数据获取成功",
  'data|400': [
    {
      'key|+1': 1,
      name: '@cname',
      age: '@integer(18, 60)',
      address: '@city',
      salaryCount: '@integer(20, 100)',
      salary: function () {
        return Number(this.salaryCount) * 100
      },
    }
  ]
})

export default {
  'GET /api/list': db_table,

  // 支持自定义函数，API 参考 express@4
  'DELETE /api/list': (req: Request, res: Response) => {
    // 特别注意，前端是不管类型的，只要从req中拿到的东西，基本都会变成string
    const { key } = req.query
    for (let i = 0; i < db_table.data.length; i++) {
      if (db_table.data[i].key === Number(key)) {
        // 删除逻辑
        db_table.data.splice(i, 1)
        res.send({
          msg: `${key}号员工删除成功`
        })
        return
      }
    }
    res.send({
      msg: `未找到${key}号员工！`
    })
  },
}