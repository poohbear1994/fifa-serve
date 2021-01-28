/*
 * @Author: your name
 * @Date: 2020-12-18 15:36:12
 * @LastEditTime: 2020-12-18 17:51:38
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \后端\nodejs-myblog\code-demo\blog-koa2\middleware\loginCheck.js
 */
const { ErrorModel } = require('../model/resModel')

// 登录检测中间件
module.exports = async (ctx, next) => {
    // 如果能从session中获得username，就认为登录成功
    if (ctx.session.username) {
        // 执行下一个中间件
        await next()
        return
    }
    // 如果不能从session中获得username，就认为是未登录
    ctx.body = new ErrorModel('未登录')
}