/**
 * 提示：
 * 性能考虑：Object.setPrototypeOf方法相比Object.create在性能上通常较慢
 * Object.create是直接在新对象创建时设置原型，而Object.setPrototypeOf则是在对象创建后改变原型
 * 错误处理：如果target不是对象且不是null，Object.create会抛出一个错误
 */
const myObjectCreate = (proto, propertiesObject) => {
  if (proto !== null || typeof proto !== 'object') {
    throw Error('Object prototype may only be an Object or null ');
  }
  // 使用构造函数创建一个自动继承构造函数原型的新对象
  const f = function F() {};
  f.prototype = proto;
  const obj = new f();
  if (propertiesObject) {
    Object.defineProperties(obj, propertiesObject);
  }
  return obj;
};
