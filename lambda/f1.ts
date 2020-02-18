import lodash from 'lodash'
import { EOL } from 'os'

export async function f1(a: number, b: number): Promise<number> {
  const object = { a: [{ b: { c: 3 } }] }

  lodash.get(object, 'a[0].b.c')

  if (process.env.NODE_ENV === 'production') {
    // eslint-disable-next-line no-console
    console.log('production')
  } else {
    // eslint-disable-next-line no-console
    console.log('development')
  }

  // eslint-disable-next-line no-console
  console.log(EOL)

  return a + b
}
