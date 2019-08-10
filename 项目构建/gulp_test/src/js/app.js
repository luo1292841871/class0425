// 分别暴露的语法
import { add, count } from './module1';// 模块路径规则和commonjs一样
// 默认暴露的语法
import sum from './module2';

console.log(add(1, 2));
console.log(count(2, 5));
console.log(sum(1, 4, 5, 7));