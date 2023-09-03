export const isObjEmpty = (obj: Record<PropertyKey, unknown>): boolean => {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false
    }
  }

  return true
}
