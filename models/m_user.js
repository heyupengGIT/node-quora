// 导入数据库配置中的模块
const connection = require('../tools/db_config');

// 函数用于向数据库发送请求
function checkEmail(email,callback) {
    const sqlstr = 'SELECT * FROM users WHERE email =?';
    connection.query(sqlstr, email, (err, results) => {
        if (err) {
            return callback(err)
        }

        callback(null,results);
    })
}


// 我们发现:
// 要在c_user.js控制器中使用checkEmail里面数据库查询的结果
// 要在c_user.js控制器中使用checkEmail里面异步操作的结果
// 要在checkEmail外部使用checkEmail里面异步操作的结果
// 在函数外部使用函数内部中异步操作的结果
// 只能使用回调函数去实现
// 在异步操作中 把结果传递给callback

exports.checkEmail = checkEmail;