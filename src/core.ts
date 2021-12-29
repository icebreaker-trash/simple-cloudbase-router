import { pathToRegexp } from 'path-to-regexp'
import type { Middleware, ComposedMiddleware } from 'koa-compose'
import type { IBaseContext } from './type'
import { createContext } from './context'

export function route (
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

export function createServe (fn: ComposedMiddleware<IBaseContext>) {
  return function serve (event: any, context: any) {
    const ctx = createContext(event, context)
    return fn(ctx).then(() => {
      return {
        status: ctx.status,
        data: ctx.body
      }
    })
  }
}
