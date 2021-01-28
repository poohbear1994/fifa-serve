/*
 * @Author: your name
 * @Date: 2020-12-21 01:01:05
 * @LastEditTime: 2021-01-04 11:32:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fifa\fifa-server\routes\team.js
 */
const router = require('koa-router')()
const {
    getTeam,
    getTeamDataOfOuguan,
    getTeamSchedule
  } = require('../controller/team')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api')

/**
 * @description: 获取队伍信息接口
 * @param {*}
 * @return {*}
 */
router.get('/team', async (ctx, next) => {
    // 获取query参数
    const teamId = ctx.query.teamId || ''
    // 从数据库获取数据
    const listData = await getTeam(teamId)
    // 返回数据给客户端
    ctx.body = new SuccessModel(listData)
})

/**
 * @description: 获取队伍欧冠数据接口
 * @param {*}
 * @return {*}
 */
router.get('/teamDataOfOuguan', async (ctx, next) => {
  // 获取query参数
  const teamId = ctx.query.teamId || '' 
  // 从数据库获取数据
  const listData = await getTeamDataOfOuguan(teamId)
  // 返回数据给客户端
  ctx.body = new SuccessModel(listData)
})

router.get('/teamSchedule', async (ctx, next) => {
  // 获取query参数
  const teamId = ctx.query.teamId || ''
  const queryDate = ctx.query.queryDate || ''
  // 从数据库获取数据
  const listData = await getTeamSchedule(teamId, queryDate)
  // 返回数据给客户端
  ctx.body = new SuccessModel(listData)
})

module.exports = router