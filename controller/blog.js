/*
 * @Author: your name
 * @Date: 2020-12-18 15:36:12
 * @LastEditTime: 2020-12-18 18:03:14
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \后端\nodejs-myblog\code-demo\blog-koa2\controller\blog.js
 */
const xss = require('xss')
const { exec } = require('../db/mysql')

// 获取list数据
const getList = async (author, keyword) => {
    // 拼接sql语句
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    // 操作数据库
    return await exec(sql)
}

// 获取详情数据
const getDetail = async (id) => {
    // 拼接sql语句
    const sql = `select * from blogs where id='${id}'`
    // 操作数据库
    const rows = await exec(sql)
    return rows[0]
}

// 新建数据
const newBlog = async (blogData = {}) => {
    // 获取post上传数据
    // blogData 是一个博客对象，包含 title content author 属性
    const title = xss(blogData.title)
    // console.log('title is', title)
    const content = xss(blogData.content)
    const author = blogData.author
    const createTime = Date.now()

    // 拼接sql语句
    const sql = `
        insert into blogs (title, content, createtime, author)
        values ('${title}', '${content}', ${createTime}, '${author}');
    `

    // 将数据写入数据库
    const insertData = await exec(sql)
    return {
        id: insertData.insertId
    }
}

// 更新数据
const updateBlog = async (id, blogData = {}) => {
    // id 就是要更新博客的 id
    // blogData 是一个博客对象，包含 title content 属性

    // 获取post上传的数据
    const title = xss(blogData.title)
    const content = xss(blogData.content)

    // 拼接sql语句
    const sql = `
        update blogs set title='${title}', content='${content}' where id=${id}
    `

    // 将数据更新进数据库
    const updateData = await exec(sql)
    // 如果数据库被影响的行数（每一行就是一条数据）> 0 数据库更新成功
    if (updateData.affectedRows > 0) {
        return true
    }
    return false
}

// 删除数据
const delBlog = async (id, author) => {
    // id 就是要删除博客的 id
    // 拼接sql语句
    const sql = `delete from blogs where id='${id}' and author='${author}';`
    // 从数据库中删除数据
    const delData = await exec(sql)
    // 如果数据库被影响的行数（每一行就是一条数据）> 0 数据库删除成功
    if (delData.affectedRows > 0) {
        return true
    }
    return false
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}