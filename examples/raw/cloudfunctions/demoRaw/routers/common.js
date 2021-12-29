const { compose, route } = require('simple-cloudbase-router')

module.exports = compose([
  route('/common', compose([
    route('/getOpenId', async (ctx, next) => {
      const wxContext = ctx.wxContext
      ctx.body = {
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
        env: wxContext.ENV
      }
      return await next()
    }),
    async (ctx, next) => {
      ctx.body.ts = Date.now()
      return await next()
    }
  ]))
])
