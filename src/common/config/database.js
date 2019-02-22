const mysql = require('think-model-mysql');

module.exports = {
  handle: mysql,
  database: 'nideshop',
  prefix: 'nideshop_',
  encoding: 'utf8mb4',
  host: '数据库地址',
  port: '3306',
  user: 'root',
  password: '数据库密码',
  dateStrings: true
};
