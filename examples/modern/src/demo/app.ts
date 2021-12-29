import { cloud } from '~/common/tcb'
import { compose, createServe } from 'simple-cloudbase-router'
import type { ICustomContext } from './type'
import { commonRouter } from './routers'

const fn = compose<ICustomContext>([
  async (ctx, next) => {
    // @ts-ignore
    ctx.cloud = cloud
    // @ts-ignore
    ctx.wxContext = cloud.getWXContext()
    await next()
  },
  // @ts-ignore
  commonRouter
])

export const serve = createServe(fn)
