import type { Middleware } from 'koa-compose'
import compose from 'koa-compose'
import type { IExtendableContext } from './context'
import { pathToRegexp } from 'path-to-regexp'
export interface ILayer {
  path?: string
  middleware: Middleware<IExtendableContext>
  match(url: string): boolean
  regexp?: RegExp
}

export interface IRouterOptions {
  prefix?: string
}
export class Router {
  stack: ILayer[]
  options: IRouterOptions
  constructor (options: IRouterOptions) {
    this.stack = []
    this.options = options || {}
  }

  use (path: string, fn?: Middleware<IExtendableContext>) {
    if (typeof path === 'string') {
      if (typeof fn === 'function') {
        this.stack.push({
          path,
          regexp: pathToRegexp(path),
          middleware: fn,
          match (url) {
            return this.regexp!.test(url)
          }
        })
      } else {
        console.error('Please comfirm fn is Function')
      }
    } else if (typeof path === 'function') {
      fn = path
      this.stack.push({
        middleware: fn,
        match (_url) {
          return true
        }
      })
    }
  }

  routes () {
    const router: Router = this
    const dispatch: Middleware<IExtendableContext> & { router: Router } =
      function (ctx, next) {
        const matchedLayers = router.match(ctx.url)
        const layerChain = matchedLayers.reduce<
          Middleware<IExtendableContext>[]
        >((acc, cur) => {
          acc.push(cur.middleware)
          return acc
        }, [])

        return compose(layerChain)(ctx, next)
      }
    dispatch.router = router
    return dispatch
  }

  match (url: string) {
    const layers = this.stack
    return layers.filter((x) => x.match(url))
  }
}
