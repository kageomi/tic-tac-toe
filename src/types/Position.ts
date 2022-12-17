type Position = [number, number]

const isPosition = (object: unknown): object is Position => {
  if (!Array.isArray(object)) return false
  if (object.length !== 2) return false
  return object.every(item => typeof item === 'number')
}

export default Position
export { isPosition }
