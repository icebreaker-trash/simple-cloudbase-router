import { compose, route } from 'simple-cloudbase-router'
// import type { ICustomContext } from '../type'
export default compose([
  route(
    '/common',
    compose([
      route('/getOpenId', (ctx, next) => {
        const wxContext = ctx.wxContext
        ctx.body = {
          openid: wxContext.OPENID,
          // appid: wxContext.APPID,
          unionid: wxContext.UNIONID
          // env: wxContext.ENV
        }
        next()
      })
    ])
  )
])
