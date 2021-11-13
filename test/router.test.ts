import { Router, Application } from '../src'

describe('[Router]', () => {
  test('default use router with prefix', async () => {
    const app = new Application()
    const router = new Router({
      prefix: 'common'
    })
    router.use((ctx, next) => {
      ctx.body.aa = true
      next()
      ctx.body.bb = true
    })
    router.use('getOpenId', (ctx, next) => {
      ctx.body.getOpenId = true
      next()
    })
    const event = {
      $url: 'common/getOpenId',
      data: {
        a: 1
      }
    }
    const context = {}
    app.use(router.routes())

    const res = await app.serve(event, context)
    expect(res.data.aa).toBe(true)
    expect(res.data.bb).toBe(true)
    expect(res.data.getOpenId).toBe(true)
  })
})
