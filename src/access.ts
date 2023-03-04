/*
 * @Author       : topfivegao
 * @Date         : 2023-03-03 16:58:03
 * @FilePath     : /backend/src/access.ts
 * @LastEditTime : 2023-03-03 21:09:31
 * @Description  : 有空一起吃个饭啊!	微信联系 treeshaking666
 * 
 * Copyright (c) 2023 by topfivegao, All Rights Reserved. 
 */
export default function (initialState: { isLogin: boolean, userInfo: any }) {
    const { isLogin, userInfo } = initialState;
    console.log("access权限： ", initialState);
    let role: null = null
    if (isLogin) {
        role = userInfo.role
        console.log(role);

    }
    return {
        isRoot: role === 'root',
        isAdmin: true,
        // canDeleteFoo: foo => {
        //     return foo.ownerId === userId;
        // },
    };
}