//导入m_topic 话题模块
var M_topic = require('../models/m_topic');
// 导入moment包
const moment = require('moment');

// 渲染话题列表
exports.showIndex = (req,res) => {
    M_topic.findAllTopics((err,results) => {
        if (err) {
            return res.send ({
                code: 500,
                message: err.message
            })
        }

        res.render('index.html',{
            user: req.session.user,
            topics: results
        })
    })
};

// 渲染发布新话题页面
exports.showCreateTopic = (req,res) => {
    res.render('topic/create.html')
}

// 发布新话题的表单提交
exports.handleCreateTopic = (req,res) => {
    // 获取表单数据
    var body = req.body
    // 给表单数据创建一个时间属性  目的是为了在列表中按照时间的顺序排列
    body.createdAt = moment().format();

    // 给表单数据设置userId (用来区分该话题是否是当前登录用户创建)
    body.userId = req.session.user.id;

    // 向数据库中添加新数据
    M_topic.insertTopic(body,(err,results) => {
        if (err) {
            return res.send({
                code: 500,
                message: err.message
            })            
        }
        res.send({
            code: 200,
            message: '添加成功，跳转到列表页'
        })
    })
}


// 渲染话题详情页面的请求
exports.showDetail = (req,res) => {
    // 获取当前点击话题的id
    // 获取动态字段中的动态参数 例如 :后面的topicId
    const topicId = req.params.topicId;
    console.log(req.params);
    
    M_topic.findTopicById(topicId,(err,results) => {
        if (err) {
            return res.send({
                code: 500,
                message: err.message
            })              
        }
        res.render('topic/show.html',{
            sessonUserId: req.session.user.id,

            topic: results[0]
        })
    })

}

// 处理删除请求
exports.deleteTopic = (req,res) => {
    // 获取当前id
    const topicId = req.params.topicId;

    M_topic.deleteTopic(topicId,(err,results) => {
        if (err) {
            return res.send({
                code: 500,
                message: err.message
            })            
        }
        res.send({
            code: 200,
            message: '删除成功'
        })
    })
}

// 渲染编辑页面
exports.showEdit = (req,res) => {
    // 获取当前话题的id
    const topicId = req.params.topicId; 

    M_topic.findTopicById(topicId,(err,results) => {
        if (err) {
            return res.send({
                code:500,
                message: err.message
            })
        }
        // 渲染edit.html并且绑定数据
        res.render('topic/edit.html',{
            topic:results[0]
        })
    })

}


exports.handleEdit = (req,res) => {
    // 获取当前话题的id
    const topicId = req.params.topicId;
    // 获取表单数据
    var body = req.body;
    
    M_topic.updateTopicById(topicId,body,(err,results) => {
        if (err) {
            return res.send({
                code:500,
                message: err.message
            })
        }
        res.send({
            code:200,
            mssage:'修改成功'
        })
    })

}
    