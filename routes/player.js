/*
 * @Author: your name
 * @Date: 2020-12-22 14:34:00
 * @LastEditTime: 2020-12-29 17:59:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fifa\fifa-server\routes\player.js
 */
const router = require('koa-router')()
const {
    getPlayerOfTeam,
    getPlayerOfName,
    updatePlayer
  } = require('../controller/player')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api')

/**
 * @description: 获取某俱乐部所有球员接口
 * @param {*}
 * @return {*}
 */
router.get('/allPlayerOfTeam', async (ctx, next) => {
    // 获取query参数
    const teamId = ctx.query.teamId || '' 
    console.log('id'+''+teamId)
    // 从数据库获取数据
    const listData = await getPlayerOfTeam(teamId)
    // 返回数据给客户端
    ctx.body = new SuccessModel(listData)
    // ctx.body=clubId
})

/**
 * @description: 根据姓名查询球员接口 
 * @param {*}
 * @return {*}
 */
router.get('/playerOfName', async (ctx, next) => {
    // 获取query参数
    const playerName = ctx.query.playerName || '' 
    console.log('id'+''+playerName)
    // 从数据库获取数据
    const listData = await getPlayerOfName(playerName)
    // 返回数据给客户端
    ctx.body = new SuccessModel(listData)
})

/**
 * @description: 升级球员数据
 * @param {*}
 * @return {*}
 */
router.post('/updatePlayer', async (ctx, next) => {
    // 获取post数据
    const postData = ctx.request.body
    // 从数据库获取数据
    const listData = await updatePlayer(postData)
    // 返回数据给客户端
    ctx.body = new SuccessModel(listData)
})
module.exports = router