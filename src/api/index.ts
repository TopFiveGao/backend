/*
 * @Author       : topfivegao
 * @Date         : 2022-12-11 15:04:38
 * @FilePath     : /backend/src/api/index.ts
 * @LastEditTime : 2023-01-20 00:53:32
 * @Description  : 有空一起吃个饭啊!	微信联系 treeshaking666
 * 
 * Copyright (c) 2022 by topfivegao, All Rights Reserved. 
 */
import { request } from 'umi'

// 员工信息
export const getMemberList = () => request("/1.1/classes/members")

export const delMember = (objectId: string) => request(`/1.1/classes/members/${objectId}`, {
    method: 'DELETE'
})

export const addMember = (member: object) => request('/1.1/classes/members', {
    method: 'POST',
    data: member
})

// 活动信息
export const getBannarList = () => request("/1.1/classes/banners")

export const addBanner = (banner: object) => request('/1.1/classes/banners', {
    method: 'POST',
    data: banner
})

export const updateBanner = (objectId: string, value: object) => request(`/1.1/classes/banners/${objectId}`, {
    method: 'PUT',
    data: value
})

export const delBanner = (objectId: string) => request(`/1.1/classes/banners/${objectId}`, {
    method: 'DELETE',
})