export function wait (ms:number) {
  return new Promise((resolve) => setTimeout(resolve, ms || 1))
}

export function isPromise (x:any) {
  return x && typeof x.then === 'function'
}
