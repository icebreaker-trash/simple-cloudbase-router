import { pathToRegexp } from 'path-to-regexp'
import type { Middleware } from 'koa-compose'
export { default as compose } from 'koa-compose'

export interface IBaseContext {
    event: any
    context: any
    body: any
    data?: any
    status: number
  }

export function createRoute (
  path: string,
  cb: Middleware<IBaseContext>
): Middleware<IBaseContext> {
  const regexp = pathToRegexp(path)
  return async (ctx, next) => {
    if (regexp.test(ctx.event.$url)) {
      await cb(ctx, next)
    } else {
      await next()
    }
  }
}

export function createServe (fn: Middleware<IBaseContext>) {
  return function serve (event: any, context: any) {
    const ctx:IBaseContext = {
      event,
      context,
      body: {},
      status: 200
    }
    return fn(ctx).then(() => {
      return {
        status: ctx.status,
        data: ctx.body
      }
    })
  }
}
