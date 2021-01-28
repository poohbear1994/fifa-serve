/*
 * @Author: your name
 * @Date: 2020-12-19 12:19:55
 * @LastEditTime: 2020-12-30 17:50:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fifa\fifa-server\app.js
 */
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
// 引入session与redis
const session = require('koa-generic-session')
const redisStore = require('koa-redis')


const index = require('./routes/index')
// 引入路由
const league = require('./routes/league')
const team = require('./routes/team')
const post = require('./routes/post')
const player = require('./routes/player')
const user = require('./routes/user')

// 引入配置文件
const { REDIS_CONF } = require('./conf/db')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// session 配置
app.keys = ['LJX1994test_']
// 设置session保存位置与cookie过期时间
app.use(session({
  key:'fifaId',
  // 配置 cookie
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 5 * 60 * 1000
  },
  // 配置 redis
  store: redisStore({
    // all: '127.0.0.1:6379'   // 写死本地的 redis
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(league.routes(), league.allowedMethods())
app.use(team.routes(), team.allowedMethods())
app.use(post.routes(), post.allowedMethods())
app.use(player.routes(), player.allowedMethods())
app.use(user.routes(), user.allowedMethods())
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
