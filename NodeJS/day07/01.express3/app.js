const express = require('express');

const session = require('express-session');

//引入的时候调用，把session当参数传进去
const RedisStore = require('connect-redis')(session);

const { REDIS_CONFIG } = require('./config');

const userRouter = require('./routers/user');

const uiRouter = require('./routers/ui');

// express()是一个函数，因为它可以自调用
const app = express();

// 向外暴露静态资源。 public文件夹下所有内容都向外暴露了
app.use(express.static('public'));

// 使用中间件，解析body数据
app.use(express.urlencoded({extended: true}));

// 使用session
app.use(session({
  store: new RedisStore({
    // localhost:6379
    all: `${REDIS_CONFIG.host}:${REDIS_CONFIG.port}`,
    // session对象在redis中保存的时间
    ttl: 3600 * 24 * 7
  }),
  secret: 'Class0720 HTML',
  resave: false,
  cookie: {
    maxAge: 3600 * 24 * 7,
    httpOnly: true
  },
  saveUninitialized: true,
}));

// 使用user路由器
app.use(userRouter);
app.use(uiRouter);

module.exports = app;





