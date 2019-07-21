// 定义有依赖的模块,引入其他模块就加个数组就可以了
define(['module1'], function (m1) {
  //m1就是module1模块暴露的内容

  function showMsg() {
    console.log(m1);
  }

  // 暴露
  return showMsg;
});