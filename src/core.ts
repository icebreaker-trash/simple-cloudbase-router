import { pathToRegexp } from 'path-to-regexp'
import type { Middleware, ComposedMiddleware } from 'koa-compose'
import type { IBaseContext } from './type'
import { createContext } from './context'

export function route<T={}> (
  path: string,
  cb: Middleware<IBaseContext & T>
): Middleware<IBaseContext & T> {
  const regexp = pathToRegexp(path)
  return async (ctx, next) => {
    if (regexp.test(ctx.event.$url)) {
      return await cb(ctx, next)
    } else {
      return await next?.()
    }
  }
}

export function createServe<T={}> (fn: Middleware<IBaseContext & T>) {
  return function serve (event: any, context: any) {
    const ctx = createContext<T>(event, context)
    return (fn as ComposedMiddleware<IBaseContext & T>)(ctx).then(() => {
      return {
        status: ctx.status,
        data: ctx.body
      }
    })
  }
}
