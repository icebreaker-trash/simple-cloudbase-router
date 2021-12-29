import { serve } from './app'
export async function main (event: any, content: any) {
  return await serve(event, content)
}
