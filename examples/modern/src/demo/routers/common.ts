import { Router } from 'simple-cloudbase-router'
import type { ICustomContext } from '../type'
const router = new Router<ICustomContext>({
  prefix: 'common'
})

router.use('getOpenId', (ctx, next) => {
  const wxContext = ctx.wxContext
  ctx.body = {
    openid: wxContext.OPENID,
    // appid: wxContext.APPID,
    unionid: wxContext.UNIONID
    // env: wxContext.ENV
  }
  next()
})

export default router
