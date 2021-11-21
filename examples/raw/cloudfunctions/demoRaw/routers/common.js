const { Router } = require('simple-cloudbase-router')

const router = new Router({
  prefix: 'common'
})

router.use('getOpenId', (ctx, next) => {
  const wxContext = ctx.wxContext
  ctx.body = {
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
    env: wxContext.ENV
  }
  next()
})

router.use((ctx, next) => {
  ctx.body.ts = Date.now()
  next()
})

module.exports = router
