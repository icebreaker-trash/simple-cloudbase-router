# simple-cloudbase-router

> 像写 koa 一样来写 微信云函数

## Install

```bash
yarn add simple-cloudbase-router@latest
# or
npm i simple-cloudbase-router@latest
```

## Usage

### Typescript/ESM (with [`simple-cloudbase`](https://cloudbase.icebreaker.top/))

```ts
// app.ts
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
```

```ts
// index.ts
import app from './app'
export async function main(event: any, content: any) {
  return await app.serve(event, content)
}
```

### Commonjs(Raw)

```js
// index.js
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const { Application, Router } = require('simple-cloudbase-router')
const app = new Application()
const router = new Router({
  prefix: 'common'
})
app.use((ctx, next) => {
  ctx.cloud = cloud
  ctx.wxContext = cloud.getWXContext()
  next()
})

router.use('getOpenId', (ctx, next) => {
  const wxContext = ctx.wxContext
  ctx.body = {
    openid: wxContext.OPENID,
    unionid: wxContext.UNIONID
  }
  next()
})
app.use(router.routes())

exports.main = async function main(event: any, content: any) {
  return await app.serve(event, content)
}
```
