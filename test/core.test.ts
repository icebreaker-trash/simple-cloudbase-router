import { createServe, route } from '../src/core'
import { compose } from '../src/compose'
import { createCloudContext, createCloudEvent } from './util'

const defaultCloudContext = createCloudContext()
describe('Router core', () => {
  it('default', async () => {
    const fn = compose([
      async (ctx, next) => {
        // @ts-ignore
        ctx.cloud = {
          cloud: true
        }
        return await next()
      },
      route('/', async (ctx, _next) => {
        ctx.body.a = true
      }),
      route('/:id', async (ctx, _next) => {
        ctx.body.b = true
      }),
      route('/user/:id', async (ctx, _next) => {
        ctx.body.c = true
      })
    ])
    const serve = createServe(fn)
    let event = createCloudEvent('/', {
      test: true
    })
    const result1 = await serve(event, defaultCloudContext)
    expect(result1.data.a).toBe(true)
    event = createCloudEvent('/12345', {
      test2: true
    })
    const result2 = await serve(event, defaultCloudContext)

    expect(result2.data.b).toBe(true)
  })
})
