import App from '../src/application'
import { pathToRegexp } from 'path-to-regexp'
import type { IExtendableContext } from '../src/context'
jest.setTimeout(60000)
describe('[application]', () => {
  test('console context ', async () => {
    const regexp = pathToRegexp('common/getOpenId')
    const app = new App()
    const event = {
      $url: 'common/getOpenId',
      data: {
        a: 1
      }
    }
    const context = {}

    const ctx = app.createContext(event, context)

    expect(ctx.body).toEqual({})
    expect(ctx.event).toEqual(event)
    expect(ctx.url).toBe(event.$url)
    app.use(async (ctx, next) => {
      if (regexp.test(ctx.url)) {
        ctx.body.code = 'getOpenId'
      } else {
        ctx.body.code = 'not match'
      }
      await next()
    })

    app.use((ctx, next) => {
      ctx.body.messgae = 'hello'
      next()
    })

    const ret = await app.serve(event, context)

    expect(ret.status).toBe(200)
    expect(ret.data.code).toBe('getOpenId')
    expect(ret.data.messgae).toBe('hello')
  })

  test('throw error', async () => {
    const regexp = pathToRegexp('common/error')
    const app = new App()
    const event = {
      $url: 'common/error',
      data: {
        a: 1
      }
    }
    const context = {}

    app.use((ctx, next) => {
      if (regexp.test(ctx.url)) {
        ctx.throw('error messgae', { code: 123 })
      }
      next()
    })
    let outCtx: IExtendableContext = app.createContext(event, context)
    outCtx.body = { isError: false }
    app.on('error', (err, ctx) => {
      console.log(err)
      outCtx = ctx
      ctx.body.isError = true
    })

    const res = await app.serve(event, context)

    expect(res.status).toBe(500)
    expect(res.data.message).toBe('error messgae')
    expect(res.data.code).toBe(123)
    expect(outCtx.body.isError).toBe(true)
  })
})
