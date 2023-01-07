/*
 * @Author       : topfivegao
 * @Date         : 2022-12-11 00:56:12
 * @FilePath     : /backend/src/app.tsx
 * @LastEditTime : 2023-01-07 18:41:16
 * @Description  : 有空一起吃个饭啊!	微信联系 treeshaking666
 * 
 * Copyright (c) 2022 by topfivegao, All Rights Reserved. 
 */
import { Request, Response } from 'umi';
// 引入 leancloud 服务
import { API_BASE_URL, X_LC_Id, X_LC_Key } from '@/credentials'
// 初始化 leancloud 服务的 SDK
import '@/utils/init-leancloud-sdk'


export const request: Request.RequestConfig = {
    // timeout: 2000,
    errorConfig: {},
    middlewares: [],
    requestInterceptors: [
        (url: string, options: RequestInit): Request.RequestInterceptor => {
            url = API_BASE_URL + url
            options.headers = {
                "X-LC-Id": X_LC_Id,
                "X-LC-Key": X_LC_Key,
                "Content-Type": "application/json"
            }
            return {
                url,
                options
            }
        }

    ],
    responseInterceptors: [
        (response: Response, options: ResponseInit): Response => {
            const res = response
            // console.log('response响应数据：', res, options);
            return res
        }
    ],
};