/*
 * @Author       : topfivegao
 * @Date         : 2022-12-11 00:56:12
 * @FilePath     : /backend/src/app.tsx
 * @LastEditTime : 2023-03-03 17:19:46
 * @Description  : 有空一起吃个饭啊!	微信联系 treeshaking666
 * 
 * Copyright (c) 2022 by topfivegao, All Rights Reserved. 
 */
import { Request, Response, history, RequestConfig } from 'umi';
// 引入 leancloud 服务
import { API_BASE_URL, X_LC_Id, X_LC_Key } from '@/credentials'
// 初始化 leancloud 服务的 SDK
import '@/utils/init-leancloud-sdk'
import { USER_INFO } from './utils/consts';
import HeaderDropMenu from '@/components/HeaderDropMenu'

import {
    Settings as LayoutSettings,
} from '@ant-design/pro-layout';

// 设置初始状态，可用于保存客户端登录状态
export async function getInitialState() {
    const userInfo = localStorage.getItem(USER_INFO) || sessionStorage.getItem(USER_INFO)
    let userStatus: { isLogin: boolean, userInfo: any } = {
        isLogin: false,
        userInfo
    }
    if (userInfo) {
        userStatus.userInfo = JSON.parse(userInfo)
        userStatus.isLogin = true
    }
    console.log('initialState: ', userStatus)
    return userStatus;
}

export const layout = ({ initialState }: { initialState: { settings?: LayoutSettings; isLogin: boolean, userInfo: any } }) => {
    return {
        // 比 onPageChange 先执行，不知道是不是耗费性能，官网文档已经找不到该配置项，但是运行时配置的代码里有
        rightContentRender: () => {
            const { userInfo } = initialState
            if (userInfo) {
                return <HeaderDropMenu username={userInfo.username} />
            }
            return <>未登录！！！</>
        },

        onPageChange: (loc: Location) => {
            const { isLogin } = initialState
            console.log('onPageChange: ', initialState)
            if (!isLogin && loc.pathname != '/register') {
                history.push('/login')
            }
        },
    }
}

export const request: RequestConfig = {
    // timeout: 2000,
    errorConfig: {},
    middlewares: [],
    requestInterceptors: [
        (url: string, options: Request.RequestInit): Request.RequestInterceptor => {
            url = API_BASE_URL + url
            // 删除用户请求头
            const session = options.params["X-LC-Session"]
            options.headers = {
                "X-LC-Id": X_LC_Id,
                "X-LC-Key": X_LC_Key,
                "Content-Type": "application/json"
            }
            if (session) {
                options.headers = {
                    "X-LC-Id": X_LC_Id,
                    "X-LC-Key": X_LC_Key,
                    "X-LC-Session": session,
                    "Content-Type": "application/json"
                }
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


            // handle API: getUser
            // if (response.url === API_BASE_URL + '/1.1/users') {
            //     return { data: response }
            // }
            // handle API: userRegister
            if (response.url === API_BASE_URL + '/1.1/users' && methodType.toUpperCase() === 'POST') {
                return { data: response }
            }

            // handle API: userDelete
            if (response.url === API_BASE_URL + '/1.1/users' && methodType.toUpperCase() === 'DELETE') {
                return { data: response }
            }

            // handle API: userLogin
            if (response.url === API_BASE_URL + '/1.1/login' && methodType.toUpperCase() === 'POST') {
                return { data: response }
            }

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