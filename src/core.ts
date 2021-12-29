import { pathToRegexp } from 'path-to-regexp'
import type { Key } from 'path-to-regexp'
import type { Middleware, ComposedMiddleware } from 'koa-compose'
import type { IBaseContext, AnyObject } from './type'
import { createContext } from './context'

export function route<T = AnyObject> (
  path: string,
  cb: Middleware<IBaseContext & T>
): Middleware<IBaseContext & T> {
  const keys: Key[] = []
  const regexp = pathToRegexp(path, keys)
  return async (ctx, next) => {
    const arr = regexp.exec(ctx.event.$url)
    if (arr) {
      if (keys.length) {
        const values = arr.slice(1)
        for (let i = 0; i < keys.length; i++) {
          ctx.params[keys[i].name] = values[i]
        }
      }
      return await cb(ctx, next)
    } else {
      return await next?.()
    }
  }
}

export function createServe<T = AnyObject> (fn: Middleware<IBaseContext & T>) {
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
