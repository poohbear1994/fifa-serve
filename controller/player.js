/*
 * @Author: your name
 * @Date: 2020-12-22 14:35:28
 * @LastEditTime: 2020-12-29 18:26:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fifa\fifa-server\controller\player.js
 */
const xss = require('xss')
const { exec } = require('../db/mysql')

/**
 * @description: 获取俱乐部（队伍）的所有球员
 * @param {*} id 俱乐部（team）id
 * @return {*}
 */
const getPlayerOfTeam = async (id) => {
     // 拼接sql语句
     let sql = `select * from player where teamid='${id}';`
     // 操作数据库
    return await exec(sql)
}

/**
 * @description: 根据传入姓名获取球员（可模糊查询）
 * @param {*} name 球员姓名
 * @return {*}
 */
const getPlayerOfName = async (name) => {
    // 拼接sql语句
    let sql = `select * from player where name LIKE'%${name}%';`
    // 操作数据库
   return await exec(sql)
}

/**
 * @description: 更新球员数据
 * @param {*} async
 * @return {*}
 */
const updatePlayer = async (postData) => {
    // 拼接sql语句
    const sql = `update player set name='${postData.name}', goal=${postData.goal},
        assist=${postData.assist}, number=${postData.number},
        yellowCard=${postData.yellowCard}, redCard=${postData.redCard},
        times=${postData.times} where 1=1 and playerid=${postData.playerid};`
    // 操作数据库
    const okPacket =  await exec(sql)
    // 更新成功
    if(okPacket.affectedRows > 0) {
        const selectSql = `select * from player where playerid='${postData.playerid}';`
        return await exec(selectSql)
    }
}

module.exports = {
    getPlayerOfTeam,
    getPlayerOfName,
    updatePlayer
}