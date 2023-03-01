/*
 * @Author       : topfivegao
 * @Date         : 2023-02-12 00:21:48
 * @FilePath     : /backend/src/api/user.tsx
 * @LastEditTime : 2023-03-01 15:43:37
 * @Description  : 有空一起吃个饭啊!	微信联系 treeshaking666
 * 
 * Copyright (c) 2023 by topfivegao, All Rights Reserved. 
 */
import { request } from 'umi'

export const userRegister = (user: User) => request('/1.1/users', {
    method: 'POST',
    data: user
})

export const userLogin = (user: User) => request('/1.1/login', {
    method: 'POST',
    data: user
})

export const userDelete = (id: string, session: string) => request(`/1.1/users/${id}`, {
    method: 'DELETE',
    params: {
        "X-LC-Session": session
    }
})

export const userQuery = () => request('/1.1/users')

export const getUser = (id: string) => request(`/1.1/users${id}`)

export const checkEmail = (email: { email: string }) => request('/1.1/requestEmailVerify', {
    method: 'POST',
    data: email
})

export const resetPassword = (email: { email: string }) => request('/1.1/requestPasswordReset', {
    method: 'POST',
    data: email
})


