const mysql = require('mysql');

const connection = mysql.createConnection(3000);

connection.connect(3000, (err) => {
  if (err) console.log(err);
  else console.log('mysql数据库连接成功');
});

function exec(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    })
  })
}

module.exports = {
  exec,
  escape: mysql.escape
}