(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _module = require("./module1");

var _module2 = require("./module2");

var _module3 = _interopRequireDefault(require("./module3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
  ES6模块化规范：
    1. 引入
      import
    2. 暴露
      export
        统一暴露：适用于暴露模块多项内容
        分别暴露：适用于暴露模块多项内容
        默认暴露：适用于暴露模块一个内容

     ES6模块化 默认 nodejs环境不识别 浏览器环境不识别。
     所以ES6模块化需要进行编译，才能运行。
     1. babel
      能将ES6模块化语法转换成commonjs模块化语法
      能将ES6以上语法转换ES5以及以下的语法（做js兼容性处理）
      - 切换目录
      - 定义配置文件   .babelrc
        {
          "presets": [
            "@babel/preset-env"  // 当Babel运行时会读取的配置文件，以@babel/preset-env环境去解析js代码
          ]
        }
      - 下载
        npm install --save-dev @babel/core @babel/cli @babel/preset-env
      - 运行
        npx babel ./src -d ./build

     2. browserify
      能将commonjs模块化语法转换成浏览器能识别的语法

      browserify ./build/app.js -o ./dist/app.js
 */
// 引入统一暴露/分别暴露的模块的内容
// 引入默认暴露的模块的内容
console.log(_module.add, _module.count);
console.log(_module2.name, _module2.age, _module2.sex, _module2.setName);
console.log(_module3["default"]);
},{"./module1":2,"./module2":3,"./module3":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;
exports.count = count;

function add(x, y) {
  return x + y;
}

function count(x, y) {
  return x * y;
}
},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setName = exports.sex = exports.age = exports.name = void 0;
// 分别暴露
var name = 'jack';
exports.name = name;
var age = 18;
exports.age = age;
var sex = '女';
exports.sex = sex;

var setName = function setName() {};

exports.setName = setName;
},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Person = function Person() {
  _classCallCheck(this, Person);
}; // 默认暴露


var _default = Person;
exports["default"] = _default;
},{}]},{},[1]);
