// 同步引入代码分割
// import _ from 'lodash';
// console.log(_.join(['jack', 'rose'], '~'));


/*
// 异步引入代码分割
function component() {
  const element = document.createElement('div');
  // import('lodash'),es10的方法，可以动态导入js，一上来不加载，用的时候才会加载，返回值是一个promise对象
  // lodash这个库是默认暴露的,所以得{default: _}这样写
  return import('lodash').then(({default: _}) => {
    // 只要异步加载成功，就会在element里面塞个内容，并且把这个元素给返回出去
    element.innerText = _.join(['jack', 'rose'], '~');
    return element;
  })
}

// 一旦加载成功，promise就会变成成功的状态，就会触发这个.then的回调函数，就会将上面的element值写入body里面
component().then((element) => {
  document.body.appendChild(element);
});

// 因为import('lodash'),es10的方法，我们写的是es6，所以它不认识，这时候要用babel解析，引入一个插件@babel/plugin-syntax-dynamic-import
*/

import '../../less/test1.less';
import '../less/test2.less';


const div = document.createElement('div');
div.innerText = _.join(['点', '我'], '~');
/*div.onclick = function () {
  // webpackPrefetch: true 实现等浏览器空闲偷偷加载资源
  // webpackChunkName: "lodash" 给chunk命名
  import(/!* webpackChunkName: "lodash", webpackPrefetch: true *!/'lodash').then(({default: _}) => {
    // 只要异步加载成功，就会在element里面塞个内容，并且把这个元素给返回出去
    div.innerText = _.join(['jack', 'rose'], '~');
  })
};*/

document.body.appendChild(div);



if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}