import cloud from 'wx-server-sdk'

export function cloudInit (env?: string) {
  cloud.init({
    env: env ?? (cloud.DYNAMIC_CURRENT_ENV as unknown as string)
  })
  return cloud
}
