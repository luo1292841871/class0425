const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

// 创建app应用对象
const app = new Koa();
// 解析请求体参数的中间件
app.use(bodyParser());
// 设置中间件
app.use((context, next) => {
  // 获取请求参数 get请求query参数
  console.log(context, query);

  // 获取请求参数 post请求body参数
  console.log(context.request.body);
  // 获取cookie
  console.log(context.cookies.get('Webstorm-ef037c84'));

  // 返回响应
  context.body = '这是服务器返回响应';

});



app.listen(3000, (err) => {
  if (err) console.log(err);
  else console.log('服务器启动成功');
});