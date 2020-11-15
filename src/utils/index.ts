/**
 * @name 本地存储方法
 */
const db = {
  set: (key: string, value: any) => {
    let val = value
    if (typeof val === 'object') {
      val = JSON.stringify(val)
    }
    return localStorage.setItem(key, val)
  },

  get: (key: string) => {
    let val: any = localStorage.getItem(key)
    try {
      val = JSON.parse(val)
    } catch (e) {
      // todo
    }
    return val
  },

  del: (key: string) => {
    return localStorage.removeItem(key)
  },
}

/**
 * @name 字典转数组
 * @param { Object } dict 字典对象
 * @param { String } label 转成后的key名字
 * @param { String } value 转成后的value名字
 * @param { Array } exclude 要排除的值,字典的value,字符串数组形式
 */
const dictToArray = (dict: any, label: string = 'label', value: string = 'value', exclude: any[] = []) => {
  const arr: any = []

  Object.keys(dict).map((key: any) => {
    const obj: any = {}
    const val: any = dict[key]

    obj[label] = val

    if (val instanceof Object) {
      obj[label] = val.label
    } else {
      obj[label] = val
    }

    obj[value] = isNaN(key) ? key : Number(key)

    if (exclude.indexOf(obj[value]) < 0) {
      arr.push(obj)
    }
  })

  return arr
}


export {
  db,
  dictToArray,
}
