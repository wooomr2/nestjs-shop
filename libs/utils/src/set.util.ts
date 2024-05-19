/** set 교집합 구하기 */
export const intersactionSet = <T>(setA: Set<T>, setB: Set<T>) => {
  const intersection = new Set<T>()
  setB.forEach(v => {
    if (setA.has(v)) intersection.add(v)
  })
  return intersection
}

/** set 합집합 구하기 */
export const unionSet = <T>(setA: Set<T>, setB: Set<T>) => {
  const union = new Set<T>(setA)
  setB.forEach(e => {
    union.add(e)
  })
  return union
}

/** set 여집합 구하기 */
export const differenceSet = <T>(setA: Set<T>, setB: Set<T>) => {
  const difference = new Set(setA)
  setB.forEach(e => {
    difference.delete(e)
  })
  return difference
}
