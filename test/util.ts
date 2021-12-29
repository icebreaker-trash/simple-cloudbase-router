export function wait (ms:number) {
  return new Promise((resolve) => setTimeout(resolve, ms || 1))
}

export function isPromise (x:any) {
  return x && typeof x.then === 'function'
}

export function createCloudContext (): Record<string, any> {
  return {}
}

export function createCloudEvent (
  url?: string,
  data?: Record<string, any>
): Record<string, any> {
  return {
    $url: url,
    data
  }
}
