const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: '3306',
  database: 'test'
});

connection.connect((err) => {
  if (err) console.log(err);
  else console.log('数据库连接成功了');
});

const sql = `insert into users (username, password, phone) values ('jack', '000', '19938477')`;



