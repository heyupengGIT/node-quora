// 路由模块
// 处理路由分发 找到对应的处理函数
// 1. 导包express
// 2. 使用express.Router()返回的路由对象router
// 3. 配置路由router
// 4. 导出路由模块

const express = require('express');
const user = require('./controllers/c_user');
const topic = require('./controllers/c_topic');


const router = express.Router();

// 渲染登录页面的请求
router.get('/signin', user.showSignin)
    // 处理登录表单的请求
    .post('/handleSignin', user.handleSignin)
    //渲染话题列表的请求
    .get('/',topic.showIndex)
    // 渲染发布新话题的请求
    .get('/topic/create',topic.showCreateTopic)
    //处理发布新话题的请求
    .post('/handleCreateTopic',topic.handleCreateTopic)
    // 退出用户登录的请求
    .get('/signout',user.handleSignout)
    //渲染话题详情页面的请求
    .get('/topic/:topicId',topic.showDetail)
    //处理删除的请求
    // /topic/{{topic.id}}/delete
    .post('/topic/:topicId/delete', topic.deleteTopic)
    // 渲染编辑页面
    .get('/topic/:topicId/edit',topic.showEdit)
    // 处理编辑表单的请求
    .post('/topic/:topicId/edit',topic.handleEdit)

    






module.exports = router;