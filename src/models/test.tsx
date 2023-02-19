/*
 * @Author       : topfivegao
 * @Date         : 2023-02-19 00:45:36
 * @FilePath     : /backend/src/models/test.tsx
 * @LastEditTime : 2023-02-19 15:28:06
 * @Description  : 有空一起吃个饭啊!	微信联系 treeshaking666
 * 
 * Copyright (c) 2023 by topfivegao, All Rights Reserved. 
 */
export default {
    state: 100,
    reducers: {
        increment(state : number, action: any){
            console.log(action);
            const {param} = action
            const p = param ? param : 1
            return state + p
        }
    }
};