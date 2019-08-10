
// import '@babel/polyfill'; // 包含ES6的高级语法的转换,这个是生产运行时候要用的，是生产依赖，这个后来不用了是因为，它把所有的包都下载了，好多用不到，占内存
// 分别暴露的语法
import { add, count } from './module1';// 模块路径规则和commonjs一样
// 默认暴露的语法
import sum from './module2';

// 通过引入的方式，使webpack解析less资源。 当然webpack解析不了，所以报错。
// 需要借助loader来帮助webpack解析
import '../../less/test1.less';
import '../less/test2.less';
import '../less/iconfont.less';

const promise = new Promise((resolve) => {
  setTimeout(() => {
    resolve('hello webpack');
  }, 1000)
});

console.log(promise);
console.log(add(1, 2));
console.log(count(2, 5));
console.log(sum(1, 4, 5, 7));