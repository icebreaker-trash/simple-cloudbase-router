import type { IBaseContext, AnyObject } from './type'

export function createContext<T = AnyObject> (
  event: any,
  context: any
): IBaseContext & T {
  return {
    event,
    context,
    data: event.data || {},
    params: {},
    body: {},
    status: 200
  } as IBaseContext & T
}
