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

完整见[examples/modern](https://github.com/sonofmagic/simple-cloudbase-router/tree/main/examples/modern)

```ts
// app.ts
import { cloud } from '~/common/tcb'
import { compose, createServe } from 'simple-cloudbase-router'
import type { ICustomContext } from './type'
import { commonRouter } from './routers'

const fn = compose<ICustomContext>([
  async (ctx, next) => {
    ctx.cloud = cloud
    ctx.wxContext = cloud.getWXContext()
    await next()
  },
  commonRouter
])

export const serve = createServe(fn)
```

```ts
// index.ts
import { serve } from './app'
export async function main (event: any, content: any) {
  return await serve(event, content)
}
```

### Commonjs(Raw)

完整见[examples/raw](https://github.com/sonofmagic/simple-cloudbase-router/tree/main/examples/raw)

```js
// app.js
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const { compose, createServe } = require('simple-cloudbase-router')

const commonRoute = require('./routers/common')

const fn = compose([
  async (ctx, next) => {
    ctx.cloud = cloud
    ctx.wxContext = cloud.getWXContext()
    await next()
  },
  commonRoute
])
const serve = createServe(fn)
module.exports = {
  serve
}
```

```js
// index.js
const app = require('./app')

exports.main = async (event, context) => {
  return await app.serve(event, context)
}
```
