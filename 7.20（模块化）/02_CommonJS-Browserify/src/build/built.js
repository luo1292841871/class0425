(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// 第一个功能
function add(x, y) {
  return x + y;
}
function mul(x, y) {
  return x * y;
}

// 模块内部的内容是私有的，外面使用不了
// 外部要想使用模块内部的私有数据，需要暴露出去
exports.add = add;
exports.mul = mul;
},{}],2:[function(require,module,exports){
// 第三个功能
function count(x, y) {
  return x - y;
}

// 暴露出去
module.exports = count;
},{}],3:[function(require,module,exports){

// 负责引入其他模块，使用
// 引入模块，执行模块代码。将模块暴露的内容作为require函数返回值返回
const module1 = require('./module1.js1.js');
const module2 = require('./count.js');

console.log(module1);
console.log(module2);

console.log(module1.add(1, 2));

},{"./add.js":1,"./count.js":2}]},{},[3]);
