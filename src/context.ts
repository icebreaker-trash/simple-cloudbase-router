import type { IBaseContext } from './type'

export function createContext<T={}> (event:any, context:any):IBaseContext & T {
  return {
    event,
    context,
    data: event.data || {},
    body: {},
    status: 200
  } as IBaseContext & T
}
