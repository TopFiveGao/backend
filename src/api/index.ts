/*
 * @Author       : topfivegao
 * @Date         : 2022-12-11 15:04:38
 * @FilePath     : /backend/src/api/index.ts
 * @LastEditTime : 2023-02-04 22:42:50
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

export const updateMember = (objectId: string, member: object) => request(`/1.1/classes/members/${objectId}`, {
    method: 'PUT',
    data: member
})

// 分类信息
export const addType = (kind: object) => request('/1.1/classes/types', {
    method: 'POST',
    data: kind
})

export const getTypeList = () => request("/1.1/classes/types")

export const delType = (objectId: string) => request(`/1.1/classes/types/${objectId}`, {
    method: 'DELETE'
})

export const updateType = (objectId: string, value: object) => request(`/1.1/classes/types/${objectId}`, {
    method: 'PUT',
    data: value
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

// 产品信息
export const addGoods = (goods: object) => request('/1.1/classes/goods', {
    method: 'POST',
    data: goods
})