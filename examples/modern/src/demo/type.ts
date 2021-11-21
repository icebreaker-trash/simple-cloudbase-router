import type { ICloud } from 'wx-server-sdk'
import Cloud from 'wx-server-sdk'

export type ICustomContext = {
  wxContext:ICloud.WXContext
  cloud:typeof Cloud
}
