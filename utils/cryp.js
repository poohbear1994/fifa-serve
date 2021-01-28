/*
 * @Author: your name
 * @Date: 2020-12-18 15:36:12
 * @LastEditTime: 2020-12-18 18:26:28
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \后端\nodejs-myblog\code-demo\blog-koa2\utils\cryp.js
 */
const crypto = require('crypto')

// 密匙
const SECRET_KEY = 'WJiol_8776#'

// md5 加密
function md5(content) {
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}

// 加密函数
function genPassword(password) {
    // md5加密字符串格式
    const str = `password=${password}&key=${SECRET_KEY}`
    // 使用md5对传入的数据进行加密
    return md5(str)
}

module.exports = {
    genPassword
}