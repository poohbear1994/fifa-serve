/*
 * @Author: your name
 * @Date: 2020-12-19 12:34:02
 * @LastEditTime: 2020-12-19 12:42:22
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \fifa\fifa-server\db\mysql.js
 */
const mysql = require('mysql')
// 获取mysql配置
const { MYSQL_CONF } = require('../conf/db')

// 创建链接对象，连接到数据库
const con = mysql.createConnection(MYSQL_CONF)

// 开始链接
con.connect()

// 统一执行 sql 的函数
function exec(sql) {
    const promise = new Promise((resolve, reject) => {
        // 请求对连接的数据库进行操作
        con.query(sql, (err, result) => {
            // 如果发生错误
            if (err) {
                reject(err)
                return
            }
            // 如果没有错误，就说明数据库操作成功
            resolve(result)
        })
    })
    return promise
}

module.exports = {
    exec,
    escape: mysql.escape
}