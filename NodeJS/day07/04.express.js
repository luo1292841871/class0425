const express = require('express');
const { resolve } = require('path');

const app = express();

app.use(express.static(resolve(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

// /test是路由
app.get('/test', (req, res) => {
  console.log(req.query);

  const data = {
    name: 'tom',
    age: 20
  };

  res.send(data);
});

app.post('/test', (req, res) => {
  console.log(req.body);

  const data = {
    name: 'jack',
    age: 18
  };

  res.send(data);
});

app.get('/jsonp', (req, res) => {
  const { callback } = req.query;

  const data = {
    name: 'jerry',
    age: 22
  };

  // 返回响应
  res.send(`${callback}(${JSON.stringify(data)})`);
  //  'getData({"name": "jerry", "age": 22})'
})
app.listen(3000, (err) => {

  if (err) console.log(err);
  else console.log('服务器启动成功了');

});


