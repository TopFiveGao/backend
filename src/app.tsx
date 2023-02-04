/*
 * @Author       : topfivegao
 * @Date         : 2022-12-11 00:56:12
 * @FilePath     : /backend/src/app.tsx
 * @LastEditTime : 2023-02-04 21:58:41
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
            const o = (options as any)
            const [methodType, footUrl] = [o.method, o.url]

            console.log(methodType, 'API 接口地址：', API_BASE_URL + footUrl);

            // 因为 useRequest 封装了细节，它只认 {data:xxx} 格式的返回，才能提取到data， 所以要自己构造符合要求的 data 。
            // console.log('response响应数据：', response, options);

            // handle API: addMember
            if (response.url === API_BASE_URL + '/1.1/classes/members' && response.status === 201 && methodType.toUpperCase() === 'POST') {
                return { data: response }
            }

            // handle API: updateMember
            if (response.url === (API_BASE_URL + footUrl) && response.url.indexOf('/1.1/classes/members/') !== -1 && methodType.toUpperCase() === 'PUT') {
                return { data: response }
            }

            // handle API: addBanner
            if (response.url === API_BASE_URL + '/1.1/classes/banners' && response.status === 201 && methodType.toUpperCase() === 'POST') {
                return { data: response }
            }

            // handle API: updateBanner
            if (response.url === (API_BASE_URL + footUrl) && response.url.indexOf('/1.1/classes/banners/') !== -1 && methodType.toUpperCase() === 'PUT') {
                return { data: response }
            }

            // handle API: addType
            if (response.url === API_BASE_URL + '/1.1/classes/types' && response.status === 201 && methodType.toUpperCase() === 'POST') {
                return { data: response }
            }

            // handle API: updateType
            if (response.url === (API_BASE_URL + footUrl) && response.url.indexOf('/1.1/classes/types/') !== -1 && methodType.toUpperCase() === 'PUT') {
                return { data: response }
            }

            // 常规 API 请求， 不做处理 直接返回 请求结果
            return response
        }
    ],
};