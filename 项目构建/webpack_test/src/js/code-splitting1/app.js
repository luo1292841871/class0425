/*// math里面多个方法，暴露了两个，我实际只用了一个，但是还是会引入两个，术语的术摇就是把多余不用的代码删掉
import { add } from './math';*/


/*
  第一种方案：
    打包生成了一个文件 built.js (包含lodash、自己写的代码)
      比如自己写的：main.js  1mb
                  lodash.js 1mb
                  built.js 2mb
    页面加载时需要加载 2mb 的js。一旦页面逻辑变了
    重新构建生成 built.js
    页面重新加载2mb 的js。（过程中重复加载了1mb 的 lodash.js）
  第二种方案：
    打包生成两个文件
      main.js 1mb
      lodash.js 1mb
    页面加载两个 1mb 的js。
    一旦页面逻辑变了， 重新构建 生成 main.js
    页面重新加载1mb 的js  main.js
 */
// 引入lodash
// import _ from 'lodash';
import '../../less/test1.less';

// 使用lodash的方法
console.log(window._.join(['hello', 'webpack'],'~~~'));
console.log(window._.join(['hello', 'world'],'~~~'));