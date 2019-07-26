const http = require('http');

const server = http.createServer((req, res) => {
  const method = req.method;
  const [url] = req.url.split("?");

  if (method === 'GET') {

    if (url === '/test1') {
      // 测试：设置cookie
      res.setHeader('set-cookie', `username=jack;max-age=${3600*24*7};httpOnly;path=/`);
      res.setHeader('Content-type', 'text/plain;charset=utf8');
      // 返回响应
      res.end('这是测试cookie返回的响应~');
    }

    if (url === '/test2') {
      // 获取cookie
      console.log(req.headers.cookie);// Webstorm-ef037c84=6dd4cb30-4200-4430-b5a8-a4ca17524f5d; username=jack

      // 将cookie解析成对象
      /*const cookies = {};
      req.headers.cookie.split(';').forEach((item) => {
        const [key, value] = item.trim().split('=');
        cookies[key] = value;
      });
      console.log(cookies);*/
      const cookies = req.headers.cookie.split(';').reduce((prev, curr) => {
        const [key, value] = curr.trim().split('=');
        prev[key] = value;
        return prev;
      }, {});
      console.log(cookies);

      res.end('这是解析cookie返回响应');
    }
  }
});

server.listen(4000, (err) => {
  if (err) console.log(err);
  else console.log('服务器启动成功了');
});