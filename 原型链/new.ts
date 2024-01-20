const myNew = (fn, ...arguments) => {
  if (typeof fn !== 'function') return;

  const obj = Object.create(fn.prototype);

  const result = fn.apply(obj, arguments);
  return typeof result === 'object' && result !== null ? result : obj;
};
