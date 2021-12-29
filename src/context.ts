import type { IBaseContext } from './type'

export function createContext (event:any, context:any) {
  const ctx:IBaseContext = {
    event,
    context,
    body: {},
    status: 200
  }
  return ctx
}
