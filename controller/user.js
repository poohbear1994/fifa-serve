/*
 * @Author: your name
 * @Date: 2020-12-18 15:36:12
 * @LastEditTime: 2020-12-27 13:30:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \后端\nodejs-myblog\code-demo\blog-koa2\controller\user.js
 */
const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

// 登录
const login = async (email, password) => {
    // 对传入数据库的用户名进行处理
    email = escape(email)

    // 生成加密密码
    password = genPassword(password)
    // 对传入数据库的密码进行处理
    password = escape(password)

    // sql语句
    const sql = `select icon, nickname from user where email=${email} and password=${password}`
    // console.log('sql is', sql)
    // 从数据库中查询用户名与密码
    const rows = await exec(sql)

    // 如果查询到对应数据说明查询成功，没有查询成功就返回空对象
    return rows[0] || {}
}

/**
 * @description: 注册
 * @param {*} postdata post数据对象
 * @return {*}
 */
const signup = async (postdata) => {
    let email = postdata.email
    let password = postdata.password
    let nickname = postdata.nickname
    email = escape(email)
    password = genPassword(password)
    password = escape(password)
    nickname = escape(nickname)
    // sql语句
    const sql = `insert into user (email, password, nickname) values (${email}, ${password}, ${nickname});`
    const insertData = await exec(sql)
    console.log(insertData)
    return {
        id: insertData.insertId
    }
}
module.exports = {
    login,
    signup
}