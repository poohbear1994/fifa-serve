/*
 * @Author: your name
 * @Date: 2020-12-21 14:42:01
 * @LastEditTime: 2020-12-23 15:04:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fifa\fifa-server\controller\post.js
 */
const xss = require('xss')
const { exec } = require('../db/mysql')

// 获取文章
const getPost = async (id) => {
    // 拼接sql语句
    let sql = `select * from post where postid='${id}';`

    // 操作数据库
    return await exec(sql)
}

module.exports = {
    getPost
}