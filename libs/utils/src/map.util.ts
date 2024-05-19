const mapToList = <T>(map: Map<any, T>) => {
  const retArr: T[] = []
  for (const [k, v] of map) {
    retArr.push(v)
  }
  return retArr
}

const map = <T, U, V>(map: Map<T, U>, converter: (value: U) => V): Map<T, V> => {
  const newMap: Map<T, V> = new Map()
  for (const [key, value] of map) {
    newMap.set(key, converter(value))
  }
  return newMap
}

const get2 = <T, U, V>(map: Map<T, Map<U, V>>, key1: T, key2: U): V | undefined => {
  const tmp = map.get(key1)
  if (tmp) {
    return tmp.get(key2)
  }
}

const set2 = <T, U, V>(map: Map<T, Map<U, V>>, key1: T, key2: U, value: V): void => {
  let tmp = map.get(key1)
  if (tmp) {
    tmp.set(key2, value)
  } else {
    tmp = new Map()
    tmp.set(key2, value)
    map.set(key1, tmp)
  }
}

const get3 = <T, U, V, W>(map: Map<T, Map<U, Map<V, W>>>, key1: T, key2: U, key3: V): W | undefined => {
  const tmpMap1 = map.get(key1)
  if (tmpMap1) {
    const tmpMap2 = tmpMap1.get(key2)
    if (tmpMap2) {
      return tmpMap2.get(key3)
    }
  }
}

const set3 = <T, U, V, W>(map: Map<T, Map<U, Map<V, W>>>, key1: T, key2: U, key3: V, value: W): void => {
  let map1 = map.get(key1)
  if (!map1) {
    map1 = new Map()
    map.set(key1, map1)
  }

  let map2 = map1.get(key2)
  if (!map2) {
    map2 = new Map()
    map1.set(key2, map2)
  }

  map2.set(key3, value)
}

export { get2, get3, map, mapToList, set2, set3 }
