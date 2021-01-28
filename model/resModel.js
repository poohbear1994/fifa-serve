/*
 * @Author: your name
 * @Date: 2020-12-18 15:36:12
 * @LastEditTime: 2020-12-18 18:42:36
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \后端\nodejs-myblog\code-demo\blog-koa2\model\resModel.js
 */
// 基础模型
class BaseModel {
    constructor(data, message) {
        // 如果传入数据是字符串，说明只传入了message
        if (typeof data === 'string') {
            // 设置返回message
            this.message = data
            data = null
            message = null
        }
        // 如果data存在并且不是字符串，说明传入了数据
        if (data) {
            // 设置返回数据
            this.data = data
        }
        // 设置返回信息
        if (message) {
            this.message = message
        }
    }
}

// 成功模型
class SuccessModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.errno = 0
    }
}

// 错误模型
class ErrorModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.errno = -1
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}