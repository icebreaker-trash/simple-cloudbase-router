import { ScfError } from './error'
import type { IScfErrorInfo } from './error'
import type { ICloudbaseEvent, ICloudbaseContext } from './application'
export interface IBaseContext {
  throw(message: string, info?: IScfErrorInfo): never
}

export interface IExtendableContext extends IBaseContext {
  event: ICloudbaseEvent
  context: ICloudbaseContext
  body?: Record<string, any>
}

export const DEAULT_FAILED_CODE = 'FAIL_TO_INVOKE_FUNCTION'

const proto: IBaseContext = {
  throw (message: string, info?: IScfErrorInfo) {
    throw new ScfError(message, {
      ...info,
      code: info?.code || DEAULT_FAILED_CODE
    })
  }
}

export default proto
