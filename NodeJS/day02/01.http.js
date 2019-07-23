// 引入http模块
const http = require('http');
// 引入querystring模块: 用来解析查询字符串参数
const querystring = require('querystring');


// 创建服务
const server = http.createServer((request, reponse) => {
  /*
    request 请求对象： 包含B端发送过来的所有数据
    response 响应对象： 包含S端要返回响应的所有数据
   */
  // 处理请求
  console.log(request.url);

  const [url, query] = request.url.split('?');
  console.log(url);
  console.log(query);
  // 将query解析成对象
  const data = querystring.parse(query);
  console.log(data);

  // favicon.ico：title图标的意思
  if (url === './favicon.ico') {
    reponse.end();
    return;
  }

  if (url === '/a') {
    // 返回a资源
    // 设置响应头
    reponse.setHeader('Content-type', 'text/plain; charset = utf-8');
    // response.setHeader('Content-type', 'text/html;charset=utf-8');
    // response.setHeader('Content-type', 'text/javascript;charset=utf-8');
    // response.setHeader('Content-type', 'application/json;charset=utf-8');
    reponse.end('这是a数据');
    return;
  }

  if (url === '/b') {
    // 返回b资源
    reponse.end('bbb');
    return;
  }

  if (url === '/c') {
    // 返回c资源
    reponse.end('ccc');
    return;
  }
  // 以上条件都没有满足
  reponse.end('404');
});

// http://localhost:8081
// 通过服务监听端口号
server.listen(8081, (err) => {
  if (err) console.log(err);
  else console.log('服务器启动成功了 8081');
})