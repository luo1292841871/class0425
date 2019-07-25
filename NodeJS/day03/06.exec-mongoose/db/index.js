const mongoose = require('mongoose');

new Promise((resolve, reject) => {
  mongoose.connect('mongodb://localhost:27017/exec', { useNewUrlParser: true, useCreateIndex: true});
  // connection连接绑定事件
  mongoose.connection.once('open', (err) => {
    if (err) {
      reject(err);
    } else {
      console.log('数据库连接成功');
      resolve();
    }
  })
});