import { f1 } from '../lambda/f1'

test('f1 should works correctly', async () => {
  expect(await f1(1, 2)).toEqual(3)
  expect(await f1(3, 1)).toEqual(4)
})
