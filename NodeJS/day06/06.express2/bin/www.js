/*
  用来启动服务器
 */
const app = require('../app');

// 这样以后端口号是多少都可以随意更改
const { SERVER_CONFIG } = require('../config');

// 监听端口号
app.listen(SERVER_CONFIG.port, (err) => {
  if (err) console.log(err);
  else console.log('服务器启动成功了' + SERVER_CONFIG);
});