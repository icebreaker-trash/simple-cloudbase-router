const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const { compose, createServe } = require('simple-cloudbase-router')

const commonRoute = require('./routers/common')

const fn = compose([
  async (ctx, next) => {
    ctx.cloud = cloud
    ctx.wxContext = cloud.getWXContext()
    await next()
  },
  commonRoute
])
const serve = createServe(fn)
module.exports = {
  serve
}
