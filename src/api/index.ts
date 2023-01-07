/*
 * @Author       : topfivegao
 * @Date         : 2022-12-11 15:04:38
 * @FilePath     : /backend/src/api/index.ts
 * @LastEditTime : 2023-01-05 21:37:00
 * @Description  : 有空一起吃个饭啊!	微信联系 treeshaking666
 * 
 * Copyright (c) 2022 by topfivegao, All Rights Reserved. 
 */
import { request } from 'umi'
export const getMemberList = () => request("/1.1/classes/members")
export const delMember = (objectId: string) => request(`/1.1/classes/members/${objectId}`, {
    method: 'DELETE'
})
export const addMember = (member: object) => request('/1.1/classes/members', {
    method: 'POST',
    data: member
})

export const createFile = (file: object) => request('/1.1/files', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    data: file
})