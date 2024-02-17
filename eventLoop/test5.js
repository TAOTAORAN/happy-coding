Promise.resolve()
  .then(() => {
    return new Error('error!!!'); // 如果是 throw new Error('error!!!') 呢
  })
  .then((res) => {
    console.log('then:', res);
  })
  .catch((err) => {
    console.log('catch,', err);
  });
