/*
 * @Author: your name
 * @Date: 2020-12-18 15:36:12
 * @LastEditTime: 2020-12-19 15:36:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \后端\nodejs-myblog\code-demo\blog-koa2\conf\db.js
 */
const env = process.env.NODE_ENV  // 环境参数

// 配置mysql数据库与redis数据库
let MYSQL_CONF
let REDIS_CONF

if (env === 'dev') {
    // mysql
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '!Lujianxin1994',
        port: '3306',
        database: 'football'
    }

    // redis
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

if (env === 'production') {
    // mysql
    MYSQL_CONF = {
        host: '127.0.0.1',
        user: 'root',
        password: '!Lujianxin1994',
        port: '3306',
        database: 'fifa'
    }

    // redis
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}