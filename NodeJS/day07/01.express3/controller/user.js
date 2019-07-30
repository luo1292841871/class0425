/*
  用来操作数据库的模块
 */
  const { escape, exec } = require('../db/mysql');

  function login(username, password) {
    // username = escape(username);
    // password = escape(password);


    const sql = `select id from users where username=${username} and password=${password} limit 1`;

    return exec(sql);
  }

  function verifyUser(username) {
    // username = escape(username);

    const sql = `select username from users where username=${username} limit 1`;
    return exec(sql);
  }

  function register(username, password, phone) {
    // username = escape(username);
    // password = escape(password);
    // phone = escape(phone);

    const sql = `insert into users (username, password, phone) values (${username}, ${password}, ${phone})`;
    return exec(sql);
  }

  function withEscape(fn) {
    // ...args实参，是那些username，password等数据
    return (...args) => {
      const newArgs = args.map(arg => escape(arg)
      );
      return fn(...newArgs);
    }
  }

  module.exports = {
    login: withEscape(login),
    register: withEscape(register),
    verifyUser: withEscape(verifyUser)
  };
