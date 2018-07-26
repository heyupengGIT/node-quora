var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodexiangmu'
});
connection.connect();

showSignin = (req,res) => {
    res.render('signin.html');
};

handleSignin = (req,res) => {
    const  body = req.body;
    const sqlstr = 'SELECT * FROM users WHERE email =?';
    connection.query(sqlstr, body.email, (err, results) => {
        if (err) {
            return res.send ({
                code:500,
                message: err.message
            })
        }
        if (!results[0]) {
            return res.send ({
                code: 1,
                message: '邮箱不存在'
            })
        }

        if (results[0] !== body.password) {
            return res.send({
                code: 2,
                message: '密码不正确'
            })
        }
        res.send({
            code:200,
            message: '可以登录了'
        })

    })
}