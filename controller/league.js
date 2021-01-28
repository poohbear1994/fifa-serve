/*
 * @Author: your name
 * @Date: 2020-12-19 12:41:28
 * @LastEditTime: 2021-01-02 19:27:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fifa\fifa-server\controller\league.js
 */
const xss = require('xss')
const { exec } = require('../db/mysql')

/**
 * @description: 获取X联赛积分
 * @param {*} id 传入联赛id
 * @return {*}
 */
const getLeagueScore = async (id) => {
    // 拼接sql语句
    let sql = `select * from score where 1=1 AND leagueid='${id}' order by score desc;`

    // 操作数据库
    return await exec(sql)
}

/**
 * @description: 头条列表
 * @param {*} async
 * @return {*}
 */
const getTopList = async (id) => {
    // 拼接sql语句
    let sql = `select * from news where 1=1 AND leagueid='${id}' AND top=1 ORDER BY date DESC;`

    // 操作数据库
    return await exec(sql)
}

/**
 * @description: 获取联赛新闻列表 
 * @param {*} id 传入联赛id
 * @return {*}
 */
const getNewList = async (id, page) => {
    // console.log('页数：', page)
    // 第几条开始
    const begin = (page - 1) * 5
    // 第几条结束
    // 拼接sql语句
    let sql = `select * from news  where 1=1 AND leagueid='${id}' AND top=0 ORDER BY date DESC limit ${begin},5;`

    // 操作数据库
    return await exec(sql)
}

module.exports = {
    getLeagueScore,
    getTopList,
    getNewList
}