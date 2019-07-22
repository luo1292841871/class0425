/*
  path是nodejs核心模块（nodejs自带的模块）:
    作用：解决文件路径问题
 */

// 引入模块
const path = require('path');

console.log(__dirname + '\\05.Buffer.js');

const filepath1 = path.resolve(__dirname, '../','05.Buffer.js');
console.log(filepath1);// 一定会返回一个绝对路径

const filepath2 = path.join('dir', '05.Buffer.js');
console.log(filepath2);
