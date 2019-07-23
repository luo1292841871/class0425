// 引入http模块
const http = require('http');

const server = http.createServer(() => {

});

server.listen(3000, () => {
  if (err) console.log(err);
  else console.log('服务器启动成功了~ 3000');
})