import { createServe, route } from '../src/core'
import { compose } from '../src/compose'
import { createCloudContext, createCloudEvent } from './util'

const defaultCloudContext = createCloudContext()
describe('Router core', () => {
  it('default', async () => {
    const fn = compose([
      async (ctx, next) => {
        // @ts-ignore
        ctx.isCloud = true
        return await next()
      },
      route('/', async (ctx, _next) => {
        expect(ctx.isCloud).toBe(true)
        ctx.body.a = true
      }),
      route('/:id', async (ctx, _next) => {
        ctx.body.b = true
      }),
      route('/user/:id', async (ctx, _next) => {
        ctx.body.c = true
        expect(ctx.params.id).toBe('110')
        return await _next()
      }),
      route('/user/:id/:action', async (ctx, _next) => {
        expect(ctx.params.id).toBe('110')
        expect(ctx.params.action).toBe('del')
        ctx.body.d = true
      }),
      async (ctx, _next) => {
        ctx.body.end = true
      }
    ])
    const serve = createServe(fn)

    let event = createCloudEvent('/', {
      test: true
    })
    let result = await serve(event, defaultCloudContext)
    expect(result.data.a).toBe(true)
    event = createCloudEvent('/12345', {
      test2: true
    })
    result = await serve(event, defaultCloudContext)
    expect(result.data.b).toBe(true)

    event = createCloudEvent('/user/110', {
      test3: true
    })
    result = await serve(event, defaultCloudContext)
    expect(result.data.c).toBe(true)
    expect(result.data.end).toBe(true)

    event = createCloudEvent('/user/110/del', {
      test4: true
    })
    result = await serve(event, defaultCloudContext)
    expect(result.data.d).toBe(true)
  })
})
