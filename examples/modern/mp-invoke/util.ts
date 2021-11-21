export function createCallFunction (name: string) {
  return async (url?: string, data?: Record<string, any>) => {
    const { result } = await wx.cloud.callFunction({
      name,
      data: {
        $url: url,
        data
      }
    })

    return (result as Record<string, any>).data
  }
}
