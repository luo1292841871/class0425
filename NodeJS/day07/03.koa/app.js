const { createWriteStream } = require('fs');
const { resolve } = require('path');

const Koa = require('koa');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const morgan = require('koa-morgan');
const bodyparser = require('koa-bodyparser');
const serve = require('koa-static');

const app = new Koa();

// 向外暴露静态资源。 public文件夹下所有内容都向外暴露了
app.use(serve('C:\\Users\\LuoLuo\\Desktop\\class0720\\NodeJS\\day07\\03.koa\\public'));
// 使用中间件，解析body数据
app.use(bodyparser());

module.exports = app;