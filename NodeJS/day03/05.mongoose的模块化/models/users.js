/*
  用来创建集合
 */
// 引入mongoose
const mongoose = require('mongoose');
// 创建约束对象
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
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
const Users = mongoose.model('users', userSchema);
// 暴露出去,因为外部接受不到
module.exports = Users;
