import { cloud } from '~/common/tcb'
import { Application } from 'simple-cloudbase-router'
import type { ICustomContext } from './type'
import { commonRouter } from './routers'
const app = new Application<ICustomContext>()

app.use((ctx, next) => {
  ctx.cloud = cloud
  ctx.wxContext = cloud.getWXContext()
  next()
})

app.use(commonRouter.routes())

app.on('error', (_err, ctx) => {
  console.error(ctx.event)
})

export default app
