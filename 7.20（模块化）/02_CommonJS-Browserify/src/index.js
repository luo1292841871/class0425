
// 负责引入其他模块，使用
// 引入模块，执行模块代码。将模块暴露的内容作为require函数返回值返回
const module1 = require('./add.js');
const module2 = require('./count.js');

console.log(module1);
console.log(module2);

console.log(module1.add(1, 2));
