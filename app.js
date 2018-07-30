// 1. 导包express
const express = require('express');
const bodyParser = require('body-parser');
var session = require('express-session')
var MySQLStore = require('express-mysql-session')(session);
var options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'nodexiangmu'
};
var sessionStore = new MySQLStore(options);


const router = require('./router');


// 2. 实例化app
const app = express();


// 使用express-mysql-session
app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));



// 配置包
// 模板引擎
app.engine('html', require('express-art-template'));
app.use('/public', express.static('./public'));
app.use('/node_modules', express.static('./node_modules'));
app.use(bodyParser.urlencoded({ extended: false }));


// 3. 挂载路由
// 注意: 写在绑定端口的前面
app.use(router);


 



// 4. 绑定端口
app.listen(12345, () => {
    console.log('run it at 12345');

});