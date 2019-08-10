/*
  用来启动服务器
 */
const app = require('../app');

// 监听端口号
app.listen(3000, (err) => {
  if (err) console.log(err);
  else console.log('服务器启动成功');
});