/*
 * @Author       : topfivegao
 * @Date         : 2022-12-11 00:58:09
 * @FilePath     : /backend/src/routes/index.ts
 * @LastEditTime : 2023-02-04 21:45:34
 * @Description  : 有空一起吃个饭啊!	微信联系 treeshaking666
 * 
 * Copyright (c) 2022 by topfivegao, All Rights Reserved. 
 */
export const routes = [
    {
        path: '/',
        component: '@/pages/index',
        name: '首页',
        icon: 'Home'
    },
    {
        path: '/members',
        name: '员工管理',
        icon: 'Team',
        routes: [
            {
                path: '/members/home',
                component: '@/pages/members',
                name: '员工信息',
            },
            {
                path: '/members/admin',
                component: '@/pages/members/admin',
                name: '信息录入',
            },
            {
                path: '/members/edit',
                component: '@/pages/members/edit',
                name: '信息编辑',
                hideInMenu: true,
            },
        ],
    },
    {
        path: '/types',
        name: '分类管理',
        icon: 'Inbox',
        routes: [
            {
                path: '/types/home',
                component: '@/pages/types',
                name: '分类列表',
            },
            {
                path: '/types/publish',
                component: '@/pages/types/publish',
                name: '分类发布',
            },
            {
                path: '/types/edit',
                component: '@/pages/types/edit',
                name: '分类修改',
                hideInMenu: true
            }
        ]
    },
    {
        path: '/activity',
        name: '活动管理',
        icon: 'Read',
        routes: [
            {
                path: '/activity/home',
                component: '@/pages/activity',
                name: '活动列表',
            },
            {
                path: '/activity/publish',
                component: '@/pages/activity/publish',
                name: '活动发布',
            },
            {
                path: '/activity/edit',
                component: '@/pages/activity/edit',
                name: '活动编辑',
                hideInMenu: true,
            }
        ]
    },
    {
        path: '/goods',
        name: '产品管理',
        icon: 'GooglePlus',
        routes: [
            {
                path: '/goods/home',
                component: '@/pages/goods',
                name: '产品列表',
            },
            {
                path: '/goods/publish',
                component: '@/pages/goods/publish',
                name: '产品发布',
            }
        ]
    },
    {
        path: '/other',
        component: '@/pages/other',
        name: '其他',
        icon: 'Tool',
    },
    {
        // icon: 'User'
        // icon: 'UserAdd'
        // icon: 'Profile',
        // icon: 'ToTop',
        // icon: 'SendOutlined',
    }
]