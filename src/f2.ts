import { Lambda } from 'aws-sdk'

export async function* f2(a: string, b: string): any {
  const lambda = new Lambda()
  lambda.invoke()
  yield a
  yield b
  return a + b
}
