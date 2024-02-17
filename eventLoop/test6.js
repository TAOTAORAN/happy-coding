const promise = Promise.resolve().then(() => {
  return promise;
});

promise.catch(console.error);

// 会输出内部错误，因为 promise 不能返回自己本身
