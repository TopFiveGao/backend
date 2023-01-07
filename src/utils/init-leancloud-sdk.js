/**
 * @Author       : topfivegao
 * @Date         : 2023-01-07 01:47:06
 * @FilePath     : /backend/src/utils/init-leancloud-sdk.js
 * @LastEditTime : 2023-01-07 19:24:56
 * @Description  : 有空一起吃个饭啊!	微信联系 treeshaking666
 * 
 * @Copyright (c) 2023 by topfivegao, All Rights Reserved. 
 */
import AV from 'leancloud-storage';
import { X_LC_Id, X_LC_Key, API_BASE_URL } from '../credentials'


AV.init({
    appId: X_LC_Id,
    appKey: X_LC_Key,
    serverURL: API_BASE_URL
});

console.log('init-leancloud-sdk');

export default AV