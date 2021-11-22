import {
  createApp,
  createCloudContext,
  createCloudEvent,
  createRouter
} from './util'
describe('[Router]', () => {
  test('default use router with prefix', async () => {
    type IExtendCtx = {
      wxContext: Record<string, any>
    }
    const app = createApp<IExtendCtx>()
    app.use((ctx, next) => {
      ctx.wxContext = {
        openid: '123'
      }
      next()
    })
    const router = createRouter<IExtendCtx>({
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
      // @ts-ignore
      ctx.body.openid = ctx.wxContext.openid
    })

    router.use('nothing2Do', (ctx, next) => {
      ctx.body.nothing2Do = true
      next()
      ctx.body.nothing2Do2 = true
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
    expect(res.data.openid).toBe('123')
    expect(res.data.nothing2Do).toBeUndefined()
    expect(res.data.nothing2Do2).toBeUndefined()
  })
  test('mutiple routers use each other', async () => {
    type IExtendCtx = {
      wxContext: Record<string, any>
    }
    const app = createApp<IExtendCtx>()
    app.use((ctx, next) => {
      ctx.wxContext = {
        openid: '123456789'
      }
      next()
    })
    const router = createRouter<IExtendCtx>({
      prefix: 'common'
    })
    const innerRouter = createRouter<IExtendCtx>({
      prefix: 'unless'
    })

    innerRouter.use((ctx, next) => {
      ctx.body.C = true
      next()
      ctx.body.D = true
    })
    innerRouter.use('big', (ctx, next) => {
      ctx.body.E = true
      next()
      ctx.body.F = true
    })
    router.use((ctx, next) => {
      ctx.body.A = true
      next()
      ctx.body.B = true
    })
    router.use('getOpenId', (ctx, next) => {
      ctx.body.getOpenId = true
      next()
      // @ts-ignore
      ctx.body.openid = ctx.wxContext.openid
    })

    router.use(innerRouter.routes())

    const event = createCloudEvent('common/unless/big', {
      a: 1
    })
    const context = createCloudContext()
    app.use(router.routes())

    const res = await app.serve(event, context)
    expect(res.data.A).toBe(true)
    expect(res.data.B).toBe(true)
    expect(res.data.getOpenId).toBe(true)
    expect(res.data.openid).toBe('123456789')
  })
})
