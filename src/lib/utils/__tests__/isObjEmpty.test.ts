import { describe, expect, test } from 'vitest'
import { isObjEmpty } from '@/lib/utils/isObjEmpty'

describe('isObjEmpty', () => {
  test('returns true if object is empty', () => {
    expect(isObjEmpty({})).toBe(true)
  })
  test('returns false if object is not empty', () => {
    expect(isObjEmpty({ 0: true })).toBe(false)
  })
})
