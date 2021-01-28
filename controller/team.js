/*
 * @Author: your name
 * @Date: 2020-12-21 00:55:22
 * @LastEditTime: 2021-01-04 15:07:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fifa\fifa-server\controller\team.js
 */
const xss = require('xss')
const { exec } = require('../db/mysql')

/**
 * @description: 获取队伍信息
 * @param {*} id 队伍id
 * @return {*}
 */
const getTeam = async (id) => {
    // 拼接sql语句
    let sql = `select * from team where teamid='${id}';`

    // 操作数据库
    return await exec(sql)
}

/**
 * @description: 获取队伍的欧冠联赛数据
 * @param {*} id 队伍id
 * @return {*}
 */
const getTeamDataOfOuguan = async (id) => {
    // 拼接sql语句
    let sql = `select * from ouguan where teamid='${id}';`

    // 操作数据库
    return await exec(sql)
}

/**
 * @description: 获取某队伍的联赛数据
 * @param {*} id 队伍id
 * @return {*}
 */
const getTeamDataOfLeague = async (id) => {
    // 拼接sql语句
    let sql = `select * from score where teamid='${id}';`
    // 操作数据库
    return await exec(sql)
}

/**
 * @description: 获取某队伍某月赛程数据
 * @param {*} id 队伍id
 * @return {*}
 */
const getTeamSchedule = async (id, queryDate) => {
    // 拼接sql语句
    let sql = `select * from schedule where (date like '%${queryDate}%' and zhuduiid='${id}') or (date like '%${queryDate}%' and keduiid='${id}');`
    // 操作数据库
    return await exec(sql)
}
module.exports = {
    getTeam,
    getTeamDataOfOuguan,
    getTeamDataOfLeague,
    getTeamSchedule
}