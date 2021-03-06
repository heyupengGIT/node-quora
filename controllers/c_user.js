
// 导入M_user模型
const M_user = require('../models/m_user.js');


// 渲染登录页
exports.showSignin = (req,res) => {
    res.render('signin.html');
};




// 处理登录表单的请求
exports.handleSignin = (req,res) => {

    const  body = req.body;

    M_user.checkEmail(body.email,(err,results) => {

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

        if (results[0].password !== body.password) {
            return res.send({
                code: 2,
                message: '密码不正确'
            })
        }

        console.log(results[0])
        req.session.user = results[0];
        

        res.send({
            code:200,
            message: '可以登录了'
        })
    })
}


exports.handleSignout = (req,res) => {
    //用delete方法 将session.user移除
    delete req.session.user;
    // 跳转到登录页
    res.redirect('/signin');


}