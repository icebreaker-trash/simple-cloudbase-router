export interface IBaseContext {
  event: any
  context: any
  body: any
  params: Record<string, string>
  data?: any
  status: number
}

export type AnyObject = Record<string, any>
