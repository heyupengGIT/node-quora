// 导入数据库配置文件
var connection = require("../tools/db_config");

// 查询topics表中的数据
exports.findAllTopics = (callback) => {
    var sqlstr = "SELECT * FROM `topics` ORDER BY `createdAt` DESC";
    connection.query(sqlstr,(err,results) => {
        if (err) {
            return callback(err)
        }
        callback(null,results);
    });
}

// 向topics中添加数据
exports.insertTopic = (body,callback) => {

    const sqlstr = "INSERT INTO `topics` SET ?";

    // 执行sql语句
    connection.query(sqlstr,body,(err,results) => {
        if (err) {
            return callback(err)
        }
        callback(null,results)
    })
}



// 根据id查找到对应的话题数据
exports.findTopicById = (id,callback) => {
    const sqlstr = "SELECT * FROM `topics` WHERE `id` = ?";
    connection.query(sqlstr,id,(err,results) => {
        if (err) {
            return callback(err)
        }
        callback(null,results)
    })
}

// 根据id删除对应的数据
exports.deleteTopic = (id,callback) => {
    const sqlstr = "DELETE FROM `topics` WHERE `id` = ?"
    connection.query(sqlstr,id,(err,results) => {
        if (err) {
            return callback(err)
        }
        callback(null,results)
    })
}

// 根据id修改数据
exports.updateTopicById = (id,body,callback) => {
    const sqlstr = "UPDATE `topics` SET `title`=?, `content`=? WHERE `id`=?";
    connection.query(sqlstr,[
        body.title,
        body.content,
        id
    ],(err,results) => {
        if (err) {
            return callback(err)
        }
        callback(null,results);
    })
}


