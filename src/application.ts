import Emitter from 'events'
import compose from 'koa-compose'

import context from './context'

import type { ScfError } from './error'
import type { IBaseContext, IExtendableContext } from './context'
import type { Middleware, ComposedMiddleware } from 'koa-compose'
export interface ICloudbaseEvent {
  $url?: string
  data?: {
    [key: string]: any
  }
  [key: string]: any
}

export interface ICloudbaseContext {}

export interface IResponseData {
  status: number
  data: {
    [key: string]: any
  }
}

export interface IConfig {
  debug?: boolean
}

export class Application extends Emitter {
  public context: IBaseContext
  public middleware: Middleware<IExtendableContext>[]
  public config: IConfig
  constructor (config?: IConfig) {
    super()
    this.middleware = []
    this.context = Object.create(context)
    this.config = config ?? {}
  }

  use (fn: Middleware<IExtendableContext>) {
    this.middleware.push(fn)
    return this
  }

  serve (
    event: ICloudbaseEvent,
    context?: ICloudbaseContext
  ): Promise<IResponseData> {
    const ctx = this.createContext(event, context)
    this.on('error', this.onerror)
    const fn: ComposedMiddleware<IExtendableContext> = compose(this.middleware)
    return new Promise((resolve) => {
      fn(ctx)
        .then(() => {
          resolve(this.respond(ctx))
        })
        .catch((err: ScfError) => {
          this.emit('error', err, ctx)
          resolve(this.handleError(err))
        })
    })
  }

  respond (ctx: IExtendableContext): IResponseData {
    return {
      status: ctx.status,
      data: ctx.body
    }
  }

  handleError (err: ScfError) {
    const json = err.toJSON()
    if (!this.config.debug) {
      delete json.stack
    }

    return {
      status: json?.status ?? 500,
      data: json
    }
  }

  createContext (
    event: ICloudbaseEvent,
    context?: ICloudbaseContext
  ): IExtendableContext {
    const ctx = Object.create(this.context)
    ctx.event = event
    ctx.context = context
    ctx.url = event.$url
    ctx.status = 200
    ctx.body = {}
    return ctx
  }

  onerror (err: Error) {
    const msg = err.stack || err.toString()
    console.error(`\n${msg.replace(/^/gm, '  ')}\n`)
  }
}

export const App = Application
