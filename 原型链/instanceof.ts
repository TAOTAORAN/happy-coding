const myInstanceOf = (obj, constructor) => {
  // 获取对象的原型
  const proto = Object.getPrototypeOf(obj);

  // 检查原型是否为 null，到达原型链的顶端
  if (proto === null) return false;

  // 检查当前原型是否等于构造函数的 prototype 属性
  if (proto === constructor.prototype) return true;

  // 递归检查上一级原型
  return myInstanceOf(proto, constructor);
};
