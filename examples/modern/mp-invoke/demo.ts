import { createCallFunction } from './util'

export const blogCallFunction = createCallFunction('demo')

export function getOpenId () :Promise<{openid:string, unionid:string}> {
  return blogCallFunction('common/getOpenId')
}
