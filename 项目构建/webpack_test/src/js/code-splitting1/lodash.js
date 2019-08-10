// 引入lodash的库
import _ from '项目构建/webpack_test/src/js/code-splitting1/lodash';

// 这样window上就多了一个属性_,后面就直接通过window._直接调用
window._ = _;