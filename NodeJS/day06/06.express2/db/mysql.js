const mysql = require('mysql');

const { MYSQL_CONFIG } = require('../config');

const connection = mysql.createConnection(MYSQL_CONFIG);

connection.connect((err) => {
  if (err) console.log(err);
  else console.log('mysql数据库连接成功');
});

// 封装函数把所有的东西封装在函数中，模块化，只向外暴露接口，这样更方便
function exec(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  })
}

module.exports = {
  exec,
  escape: mysql.escape // 防注入就是防止用户名注册不标准的符号
};