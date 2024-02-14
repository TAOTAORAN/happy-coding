Function.prototype['myCall'] = function (context, ...arguments) {
  // 判断调用对象是否为函数
  if (typeof this !== 'function') {
    throw Error('The call must come from a function');
  }

  context = context || window;
  // 创建一个唯一的属性以避免覆盖原有属性
  const fnSymbol = Symbol();
  context[fnSymbol] = this;

  const result = context[fnSymbol](...arguments);

  // 删除添加的属性
  delete context[fnSymbol];

  return result;
};
