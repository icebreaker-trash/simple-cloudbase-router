const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const { Application } = require('simple-cloudbase-router')
const app = new Application()
const commonRouter = require('./routers/common')

app.use((ctx, next) => {
  ctx.cloud = cloud
  ctx.wxContext = cloud.getWXContext()
  next()
})

app.use(commonRouter.routes())

app.on('error', (_err, ctx) => {
  console.error(ctx.event)
})

module.exports = app
