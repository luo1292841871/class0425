/*
  1. 连接mongodb服务器 - 数据库
  2. 创建集合
 */
// 引入mongoose
const mongoose = require('mongoose');
// 1. 连接mongodb服务器 - 数据库
const promise = new Promise((resolve, reject) => {
  mongoose.connect('mongodb://localhost:27017/mongoose_test', { useNewUrlParser: true, useCreateIndex: true});
  mongoose.connection.once('open', (err) => {
    if (err) reject(err);
    else {
      console.log('数据库连接成功');
      resolve();
    }
  });
});


promise
  .then(async () => {
    // 数据库连接成功了~
    // 2. 创建集合
    // 创建约束对象：约束集合中文档字段
    const usersSchema = new mongoose.Schema({
      // 约束条件
      username: {
        type: String,
        unique: true,
        require: true
      },
      password: {
        type: String,
        require: true
      },
      phone: String,
      hobby: [String],
      info: mongoose.Schema.Types.Mixed,
      createTime: {
        type: Date,
        default: Date.now
      }
    });
    // 创建集合
    const Users = mongoose.model('users', usersSchema);

    /*
      CRUD
        - C create
          Users.create(文档对象, 回调函数)
        - R read
          Users.find(查询条件, 投影, 回调函数)  返回值一定是数组
          Users.findOne(查询条件, 投影, 回调函数)  找到了是对象，没有找到是null
        - U update
          Users.updateOne(查询条件, 更新内容)
          Users.updateMany(查询条件, 更新内容)
        - D delete
          Users.deleteOne(查询条件)
          Users.deleteMany(查询条件)
        一般回调函数这个参数可以不传，不传返回值是一个promise对像，传返回值就是一个普通对象
     */

    /*
      // 这个方法就是在mongoDB数据库看数据
      Users.create({
      username: 'rose',
      password: '123456',
      hobby: ['羽毛球'],
      info: '练习2年',
      phone: '00000'
    }, (err) => {
      if (err) console.log(err);
      else console.log('数据创建成功');
    })*/

    // 这种方法可以直接在run运行看到数据
    /*const result = await Users.create({
      username: 'tom',
      password: '123456',
      hobby: ['奶酪'],
      info: '可爱',
    });*/

    // 查
    // const result = await Users.find({username: /^j/});
    // const result = await Users.findOne({username: {$in: ['jack','rose']}}, {password: 0, __v: 0, _id: 0});

    // const result = await Users.updateMany({username: /^t/}, {$set: {hobby: ['唱', '跳', 'rap', '篮球']}});

    const result = await Users.deleteOne({username: /^j/});

    console.log(result);
  })

  .catch((err) => {
    console.log(err);
  });
