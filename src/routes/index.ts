/*
 * @Author       : topfivegao
 * @Date         : 2022-12-11 00:58:09
 * @FilePath     : /backend/src/routes/index.ts
 * @LastEditTime : 2023-01-03 22:48:23
 * @Description  : 有空一起吃个饭啊!	微信联系 treeshaking666
 * 
 * Copyright (c) 2022 by topfivegao, All Rights Reserved. 
 */
export const routes = [
    {
        path: '/',
        component: '@/pages/index',
        name: '首页'
    },
    {
        path: '/members',
        name: '员工管理',
        routes: [
            {
                path: '/members/home',
                component: '@/pages/members',
                name: '员工信息'
            },
            {
                path: '/members/admin',
                component: '@/pages/members/admin',
                name: '信息录入'
            },
        ],
    },
    {
        path:'/activity',
        name:'活动管理',
        routes:[
            {
                path:'/activity/home',
                component:'@/pages/activity',
                name: '活动列表'
            },
            {
                path:'/activity/publish',
                component:'@/pages/activity/publish',
                name:'发布活动'
            }
        ]
    },
    {
        path: '/other',
        component: '@/pages/other',
        name: '其他'
    },
]