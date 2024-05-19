const add = <T, U>(map: Map<T, U[]>, key: T, value: U) => {
  let list = map.get(key)
  if (!list) {
    list = [] as U[]
    map.set(key, list)
  }
  list.push(value)
}

const listToMapList = <T, U>(arr: U[], keyGetter: (value: U) => T) => {
  const resultMap = new Map<T, U[]>()
  for (const arrItem of arr) {
    const key = keyGetter(arrItem)
    add(resultMap, key, arrItem)
  }
  return resultMap
}

const listToMapList2 = <T, U, V>(arr: T[], keyGetter: (value: T) => U, valueGetter: (value: T) => V): Map<U, V[]> => {
  const resultMap: Map<U, V[]> = new Map()
  for (const arrItem of arr) {
    const key = keyGetter(arrItem)
    const value = valueGetter(arrItem)
    add(resultMap, key, value)
  }
  return resultMap
}

const setKey = <T, U>(val1: T, val2: U) => {
  return `${val1}-${val2}`
}

const addMapMapList = <T, U, V>(map: Map<U, Map<V, T[]>>, key: U, key2: V, value: T) => {
  let map2 = map.get(key)
  if (!map2) {
    map2 = new Map()
    map.set(key, map2)
  }
  add(map2, key2, value)
}

const listToMapMapList = <T, U, V>(
  arr: T[],
  keyGetter: (value: T) => U,
  keyGetter2: (value: T) => V,
): Map<U, Map<V, T[]>> => {
  const resultMap: Map<U, Map<V, T[]>> = new Map()
  for (const arrItem of arr) {
    const key = keyGetter(arrItem)
    const key2 = keyGetter2(arrItem)
    addMapMapList(resultMap, key, key2, arrItem)
  }
  return resultMap
}

const addMapMapMapList = <T, U, V, W>(map: Map<U, Map<V, Map<W, T[]>>>, key: U, key2: V, key3: W, value: T) => {
  let map1 = map.get(key)
  if (!map1) {
    map1 = new Map()
    map.set(key, map1)
  }

  let map2 = map1.get(key2)
  if (!map2) {
    map2 = new Map()
    map1.set(key2, map2)
  }

  add(map2, key3, value)
}

const listToMapMapMapList = <T, U, V, W>(
  arr: T[],
  keyGetter: (value: T) => U,
  keyGetter2: (value: T) => V,
  keyGetter3: (value: T) => W,
): Map<U, Map<V, Map<W, T[]>>> => {
  const resultMap: Map<U, Map<V, Map<W, T[]>>> = new Map()
  for (const arrItem of arr) {
    const key = keyGetter(arrItem)
    const key2 = keyGetter2(arrItem)
    const key3 = keyGetter3(arrItem)
    addMapMapMapList(resultMap, key, key2, key3, arrItem)
  }
  return resultMap
}

export { add, addMapMapList, listToMapList, listToMapList2, listToMapMapList, listToMapMapMapList, setKey }
