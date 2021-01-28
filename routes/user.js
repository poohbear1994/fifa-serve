/*
 * @Author: your name
 * @Date: 2020-12-23 15:20:48
 * @LastEditTime: 2020-12-30 18:08:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fifa\fifa-server\routes\user.js
 */
const router = require('koa-router')()
const {
    login,
    signup
} = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
router.prefix('/api')

/**
 * @description: 注册接口
 * @param {*}
 * @return {*}
 */
router.post('/signup', async (ctx, next) => {
    const postdata = ctx.request.body
    const data = await signup(postdata)
    ctx.body = new SuccessModel(data)
})

/**
 * @description: 登录接口
 * @param {*}
 * @return {*}
 */
router.post('/login', async (ctx, next) => {
    const {email,password} = ctx.request.body
    // 从sql数据库中通过账号密码取出用户数据
    const data = await login(email,password)
    // 数据取出成功，说明登录成功，将用户数据存入redis中
    if (data.nickname) {
        // 设置session用session保存用户数据
        ctx.session.nickname = data.nickname
        ctx.session.icon = data.icon
        console.log(ctx.session)
        // 设置返回数据
        ctx.body = new SuccessModel(data)
        return
    }
    // 如果比对失败，说明登录失败
    ctx.body = new ErrorModel('登录失败')

})
module.exports = router