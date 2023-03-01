/*
 * @Author       : topfivegao
 * @Date         : 2023-02-19 00:45:36
 * @FilePath     : /backend/src/models/message.tsx
 * @LastEditTime : 2023-03-01 22:50:00
 * @Description  : 有空一起吃个饭啊!	微信联系 treeshaking666
 * 
 * Copyright (c) 2023 by topfivegao, All Rights Reserved. 
 */
const avatar = 'https://randomuser.me/api/portraits/women/82.jpg'

export default {
    state: [
        {
            key: '1',
            name: "周某人",
            picture: 'https://mcake-oss.oss-cn-hangzhou.aliyuncs.com/file/d767bb3983ed9846/bebf7b9ae65fe361.jpg',
            desc: '忽然，我被一块蛋糕吸引了，它雪白雪白的，在整齐的橱窗中显得特别耀眼．绿色的草地上有一只小白兔打着花伞在兴致勃勃的采蘑菇，它那么高兴，那么快乐。',
            readed: true
        },
        {
            key: '2',
            name: "吴某人",
            picture: avatar,
            desc: '巴达木蛋糕坯，荡漾着朗姆酒芬芳的咖啡浆，乳酸黄油酱，充分融合的法国淡奶油与比利时纯脂巧克力，与会“跳舞”的巧克力黄油薄脆，带来更丰富的口感。',
            readed: false
        },
        {
            key: '3',
            name: "郑某人",
            picture: avatar,
            desc: '精选蓝莓的清爽可口/芝士的香浓/优质奶油的醇厚 起酥皮的香脆可口/内层轻乳芝士的松软 层层美味/回味无穷',
            readed: false
        },
        {
            key: '4',
            name: "王某人",
            picture: avatar,
            desc: '特殊时期，还能吃上送到家门口的新鲜奶油蛋糕，实在是太感动了啊啊啊啊！谢谢小哥，辛苦啦！试了几个不同口味，每个都好吃，信M闭眼入从不踩雷',
            readed: false
        },
        {
            key: '5',
            name: "赵某人",
            picture: avatar,
            desc: '香缇奶油如爱人的晚安吻，带来一场甜蜜的梦。榛子巧克力薄脆酱是梦中的漫天星光，撒在戚风蛋糕坯做的夜空里。巧克力榛子碎与黄油薄脆，柔滑中点缀着香醇，焦糖奶油融化，满口甜蜜爆发，激荡起绵绵的幸福感，男生也拥有爱甜的权利。',
            readed: false
        },
        {
            key: '6',
            name: "钱某人",
            picture: avatar,
            desc: '酸奶芝士坯搭配香草奶油，烘托起甜蜜的温柔，巧克力榛子薄脆的咀嚼感攻占舌尖，新鲜草莓熬制的夹心酱，以清爽的酸甜愉悦味蕾，卡仕达布丁裹着大块草莓粒，和巧克力奶油一起释放香甜。草莓成熟时的快乐，直白而简单。',
            readed: false
        },
    ],
    reducers: {
        read(preState: [
            {
                name: string;
                picture: string;
                desc: string;
                readed: boolean;
            }
        ], action: any) {
            const { item } = action
            for (const i of preState) {
                if (i == item) {
                    i.readed = true
                    break
                }
            }
            return [...preState]
        }
    }
};