const listToMap = <T, U>(arr: U[], keyGetter: (value: U) => T) => {
  const map = new Map<T, U>()
  for (const element of arr) {
    const key = keyGetter(element)
    map.set(key, element)
  }
  return map
}

const listToMap2 = <T, U, V>(arr: U[], keyGetter: (value: U) => T, valueGetter: (value: U) => V) => {
  const map = new Map<T, V>()
  for (const element of arr) {
    const key = keyGetter(element)
    const value = valueGetter(element)
    map.set(key, value)
  }
  return map
}

const listToMapMap = <T, U, V>(arr: T[], keyGetter: (value: T) => U, keyGetter2: (value: T) => V) => {
  const map = new Map<U, Map<V, T>>()
  for (const element of arr) {
    const key = keyGetter(element)
    const key2 = keyGetter2(element)

    let map2 = map.get(key)
    if (!map2) {
      map2 = new Map<V, T>()
      map.set(key, map2)
    }

    map2.set(key2, element)
  }
  return map
}

const listToMapMapMap = <T, U, V, W>(
  arr: T[],
  keyGetter: (value: T) => U,
  keyGetter2: (value: T) => V,
  keyGetter3: (value: T) => W,
) => {
  const map = new Map<U, Map<V, Map<W, T>>>()
  for (const element of arr) {
    const key = keyGetter(element)
    const key2 = keyGetter2(element)
    const key3 = keyGetter3(element)

    let map2 = map.get(key)
    if (!map2) {
      map2 = new Map<V, Map<W, T>>()
      map.set(key, map2)
    }

    let map3 = map2.get(key2)
    if (!map3) {
      map3 = new Map<W, T>()
      map2.set(key2, map3)
    }

    map3.set(key3, element)
  }
  return map
}

const chunkArray = <T>(arr: T[], count: number) => {
  const result: T[][] = []
  while (arr.length > count) {
    result.push(arr.splice(0, count))
  }
  result.push(arr)
  return result
}

const listToSet = <T, U>(arr: U[], mapFunc: (value: U) => T) => {
  const set = new Set<T>()
  for (const element of arr) {
    const value = mapFunc(element)
    set.add(value)
  }
  return set
}

const addToSet = <T, U>(arr: U[], mapFunc: (value: U) => T, set: Set<T>) => {
  for (const element of arr) {
    const value = mapFunc(element)
    set.add(value)
  }
  return set
}

/**
 * @param array
 * @param test
 * @returns [test false Array, test true Array]
 */
const splitByBoolean = <T>(array: T[], test: (item: T) => boolean): [T[], T[]] => {
  const falseArray: T[] = []
  const trueArray: T[] = []

  for (const item of array) {
    if (test(item)) {
      trueArray.push(item)
    } else {
      falseArray.push(item)
    }
  }

  return [falseArray, trueArray]
}

/** 두개의 array 에서 중복된 녀석만 뽑아서 새로운 array 를 리턴. */
const getDuplicates = <T>(arr1: T[], arr2: T[]) => {
  const set = new Set<T>(arr1)
  const ret: T[] = []
  for (const arr2Item of arr2) {
    if (set.has(arr2Item)) {
      ret.push(arr2Item)
    }
  }
  return ret
}

export {
  addToSet,
  chunkArray,
  getDuplicates,
  listToMap,
  listToMap2,
  listToMapMap,
  listToMapMapMap,
  listToSet,
  splitByBoolean,
}
