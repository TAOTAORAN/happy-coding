Promise.reject('error!!!')
  .then(
    (res) => {},
    (error) => {
      console.log('error: ', error);
    }
  )
  .catch((error) => {
    console.log('catch: ', error);
  });
// output: error: error!!!

Promise.resolve()
  .then(
    (res) => {
      throw new Error('error!!!');
    },
    (error) => {
      console.log('error: ', error);
    }
  )
  .catch((error) => {
    console.log('catch: ', error);
  });
// output: catch: error!!!
