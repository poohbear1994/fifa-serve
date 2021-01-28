/*
 * @Author: your name
 * @Date: 2020-12-19 12:38:18
 * @LastEditTime: 2021-01-02 19:19:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fifa\fifa-server\routes\bundliga.js
 */
const router = require('koa-router')()
const {
    getLeagueScore,
    getTopList,
    getNewList
  } = require('../controller/league')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api/league')

router.get('/score', async (ctx, next) => {
    // 获取联赛
    const league = ctx.query.leagueId
    // 从数据库获取数据
    const listData = await getLeagueScore(league)
    // 处理返回数据
    const table = {
            title:"积分",
            header:["#","球队","胜","平","负","积分"],
            teams:listData
          }
    // 返回数据给客户端
    ctx.body = new SuccessModel(table)
})

router.get('/topList', async (ctx, next) => {
  // 获取联赛
  const league = ctx.query.leagueId
  // 从数据库获取数据
  const listData = await getTopList(league)
  // 返回数据给客户端
  ctx.body = new SuccessModel(listData)
})

router.get('/newList', async (ctx, next) => {
  // 获取联赛
  const league = ctx.query.leagueId
  // 获取请求页
  const queryPage = ctx.query.page
  console.log('页数：', queryPage)
  // 从数据库获取数据
  const listData = await getNewList(league, queryPage)
  // 返回数据给客户端
  ctx.body = new SuccessModel(listData)
})

module.exports = router