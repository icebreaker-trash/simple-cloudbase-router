import app from './app'
export async function main (event:any, content:any) {
  return await app.serve(event, content)
}
