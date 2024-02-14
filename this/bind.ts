Function.prototype['myBind'] = function (context, ...arguments) {
  if (typeof this !== 'function') {
    throw Error('The call must come from a function');
  }
  const fn = this;

  const bindFn = function (...callArgs) {
    // 作为构造函数调用时，应该忽略显式绑定的 this 值
    if (this instanceof bindFn) {
      return fn.apply(this, [...arguments, ...callArgs]);
    } else {
      return fn.apply(context, arguments);
    }
  };

  // 将原始函数 fn 的原型链复制到 bindFn.prototype
  // 那么通过 new bindFn() 创建的对象就能够正确地继承原始函数的原型链
  if (fn.prototype) {
    bindFn.prototype = Object.create(fn.prototype);
  }

  return bindFn;
};
