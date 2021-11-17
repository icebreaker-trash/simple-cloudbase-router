
import {
  createApp,
  createCloudContext,
  createCloudEvent,
  createRouter
} from './util'
describe('[Router]', () => {
  test('default use router with prefix', async () => {
    const app = createApp()
    const router = createRouter({
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

    const event = createCloudEvent('common/getOpenId', {
      a: 1
    })
    const context = createCloudContext()
    app.use(router.routes())

    const res = await app.serve(event, context)
    expect(res.data.aa).toBe(true)
    expect(res.data.bb).toBe(true)
    expect(res.data.getOpenId).toBe(true)
  })
})
