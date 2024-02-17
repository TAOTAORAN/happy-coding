Promise.resolve('1')
  .then((res) => {
    console.log(res); // 1
  })
  .finally(() => {
    console.log('finally1');
  });

Promise.resolve('2')
  .finally(() => {
    console.log('finally2');
    return 'return finally2';
  })
  .then((res) => {
    console.log(res); // 2
  });

Promise.resolve('3')
  .finally(() => {
    console.log('finally3');
    throw new Error('error!!!');
  })
  .catch((error) => {
    console.log('catch: ', error);
  });
// output:
// 1
// finally2
// finally3
// finally1
// catch: Error: error!!!
// 2
