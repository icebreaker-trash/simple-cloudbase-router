import { Router, App } from '../src'
import type { ICloudbaseContext, ICloudbaseEvent, IRouterOptions } from '../src'

export function createApp<T> () {
  return new App<T>()
}

export function createRouter<T> (options?: IRouterOptions) {
  return new Router<T>(options)
}

export function createCloudContext (): ICloudbaseContext {
  return {}
}

export function createCloudEvent (
  url?: string,
  data?: Record<string, any>
): ICloudbaseEvent {
  return {
    $url: url,
    data
  }
}
