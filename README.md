# umi3 project

## 前言

    后端数据是由 leancloud 服务提供的，所以需要 leancloud 的相关应用凭证，请提前准备好，否则会导致运行异常。

## 快速开始

安装依赖,

```bash
$ npm i
```

开始运行,

```bash
$ npm start
```

## 学习笔记

1. 学到 dva 对数据进行异步处理的时候，对于视频中异步处理的例子有新的想法，为啥不能直接调用

    setTimeout 函数，而要用 Promise 包裹，不懂折腾了一阵，所以来记住这种写法。熟悉下同步、非  

    同步（异步）和延时同步的概念。


```javascript
function delay(ms){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log('延时执行完毕！')
            resolve('哈哈')
        }, ms)
    })
}
call( delay, 3000 )
```

2. 在使用 antd 的 List 组件时，看它的例子用了一个 [...new Array(3)].map(xxx) 的写法, 于是百度 Array()  
   和 new Array() 有啥区别，大部分场景就没区别。然后发现既然是用数组调用 map，那为啥不直接  
   new Array(3).map(x)? 百度一阵后，好像发现了答案！

```javascript
// 4 种 JavaScript 实现数组填充默认值的方式
/** 1. Array.fill(initValue), 若填充元素为引用类型，则要注意产生 bug */
const arr1 = Array(3).fill(0)                // arr1 = [0, 0, 0]
const arr1_obj = Array(3).fill({ value: 1})  // arr1_obj = [ { value: 1}, { value: 1}, { value: 1} ]
arr1_obj[0].value = 2                        // arr1_obj = [ { value: 2}, { value: 2}, { value: 2} ]

/** 2. Array.from(array, mapperFunction) */
const arr = Array.from( Array(3), () => ({ value: 0 }) )  //arr = [ { value: 0}, { value: 0}, { value: 0} ]
arr[0].value = 1                                          //arr = [ { value: 1}, { value: 0}, { value: 0} ] 
/** 3. 使用展开操作符...加array.map() */
/**  
 new Array(arrayLength) 方式构造的数组是一个稀疏数组，里面是没有任何值的，只有长度。所以这个方式构造出来的数组是无法遍历的，也就无法用 map 遍历填充值了。

这里我们通过使用展开操作符可以展开一个数组，然后从展开的数组中再创建一个新的数组。使用这种方式，我们避免了使用 fill 方法，但是我们依旧使用了 map 方法。
*/
const arr3 = [...new Array(3)].map(()=>{ value: 1}) // [ { value: 1}, { value: 1}, { value: 1} ]

/** 4. 使用Array.apply()加array.map() apply,call什么的看到就麻烦，偏底层了，不需要了解了 */
```
