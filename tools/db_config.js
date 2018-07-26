// 配置mysql包
// 处理mysql包
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',//服务器名称
    user: 'root', //数据库登录名
    password: 'root',//数据库登录密码
    database: 'nodexiangmu'//数据库名字
});
// 此行代码在connnection.query()执行时会自动连接数据库
// 所以可以省略不写
// connection.connect();

// 输出connection
module.exports = connection;


