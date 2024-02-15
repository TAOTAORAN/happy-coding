// 浅拷贝：引用类型仅复制地址
// Object.assign
// 拓展运算符
// Array.prototype.slice
// Array.prototype.concat

// 深拷贝：新建引用类型并将值复制给它
function deepClone(source, weakMap) {
  const isPrimitive = typeof source !== 'object' && source !== null;
  weakMap = weakMap || new WeakMap();

  let result: any = null;
  if (isPrimitive) {
    switch (typeof source) {
      case 'symbol':
        result = Symbol.prototype.valueOf.call(source);
        break;
      case 'function':
        result = source.bind({});
        break;
      default:
        result = source;
        break;
    }
  } else {
    switch (Object.prototype.toString.call(source)) {
      case '[object Date]':
        result = new Date(source);
        break;
      case '[object Regex]':
        result = new RegExp(source);
        break;
      case '[object Set]':
        result = new Set();
        for (const value of source) {
          result.add(deepClone(value, weakMap));
        }
        break;
      case '[object Map]':
        result = new Map();
        for (const [key, value] of source.entries()) {
          result.set(key, deepClone(value, weakMap));
        }
        break;
      case '[object Object]':
      case '[object Array]':
        const newObj = Array.isArray(source) ? [] : {};
        for (const key in source) {
          const val = source[key];
          if (typeof val === 'object') {
            // 解决循环引用
            if (!weakMap.has(val)) {
              const res = deepClone(val, weakMap);
              weakMap.set(val, res);
            }
            newObj[key] = weakMap.get(val);
          } else {
            newObj[key] = deepClone(val, weakMap);
          }
        }
        result = newObj;
        break;
      default:
        break;
    }
  }
  return result;
}
