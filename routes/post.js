/*
 * @Author: your name
 * @Date: 2020-12-21 14:38:48
 * @LastEditTime: 2020-12-23 14:58:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fifa\fifa-server\routes\post.js
 */
const router = require('koa-router')()
const {
    getPost
  } = require('../controller/post')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api')

/**
 * @description: 获取文章接口
 * @param {*}
 * @return {*}
 */
router.get('/post', async (ctx, next) => {
    // 获取query参数
    const postId = ctx.query.postId || '' 
    console.log('id'+''+postId)
    // 从数据库获取数据
    const listData = await getPost(postId)
    // 返回数据给客户端
    ctx.body = new SuccessModel(listData)
})

module.exports = router