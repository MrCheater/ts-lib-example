import lodash from 'lodash'
import { EOL } from 'os'

export async function f1(a: number, b: number): Promise<number> {
  const object = { a: [{ b: { c: 3 } }] }

  lodash.get(object, 'a[0].b.c')

  if (process.env.NODE_ENV === 'production') {
    console.log('production')
  } else {
    console.log('development')
  }

  console.log(EOL)

  return a + b
}
