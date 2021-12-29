import koaCompose from 'koa-compose'
import type { Middleware } from 'koa-compose'
import type { AnyObject, IBaseContext } from './type'

export function compose<T = AnyObject> (
  middleware: Middleware<IBaseContext & T>[]
) {
  return koaCompose(middleware)
}
