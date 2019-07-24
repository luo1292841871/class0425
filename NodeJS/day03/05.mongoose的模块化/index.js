/*
  主模块
 */
// 引入其他模块
const db = require('./db');
const Users = require('./models/users');


db
  .then(async () => {
    // 进行数据库操作
    const result = await Users.create({
      username: 'xiaozhu',
      password: '6666666',
      hobby:['面', '街舞'],
      info: '爱搞怪',
      age: 30
    });
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });