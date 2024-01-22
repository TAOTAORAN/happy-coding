/**
 * 支持resolve reject .then
 * 支持异步
 * 支持连续.then
 * 支持链式调用
 */
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECT = 'reject';

function MyPromise(fn) {
  const self = this; // 指向Promise实例
  this.status = PENDING;
  this.value = null; // 经过resolve处理后的值
  this.reason = null; // 经过reject处理后的值
  /**
   * 支持异步，需要存下来 onfulfilled
   * this.onFulfilledFn = Function.prototype;
   * this.onRejectedFn = Function.prototype;
   */

  // 支持连续 .then
  this.onFulfilledFns = [];
  this.onRejectedFns = [];

  function resolve(value) {
    if (value instanceof MyPromise) {
      return value.then(resolve, reject);
    }
    // 为了不影响同步任务，执行逻辑放到任务队列中
    setTimeout(() => {
      if (self.status === PENDING) {
        self.value = value;
        self.status = FULFILLED;
        self.onFulfilledFns.forEach((f) => f(value));
      }
    });
  }

  function reject(value) {
    setTimeout(() => {
      if (self.status === PENDING) {
        self.value = value;
        self.status = REJECT;
        self.onRejectedFns.forEach((f) => f(value));
      }
    });
  }

  try {
    fn(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

MyPromise.prototype.then = function (onfulfilled, onrejected) {
  onfulfilled =
    typeof onfulfilled === 'function' ? onfulfilled : (data) => data;
  onrejected =
    typeof onrejected === 'function'
      ? onrejected
      : (error) => {
          throw error;
        };

  if (this.status === PENDING) {
    return new MyPromise((resolve, reject) => {
      this.onFulfilledFns.push(() => {
        try {
          let result = onfulfilled(this.value);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      this.onRejectedFns.push(() => {
        try {
          let reason = onrejected(this.value);
          resolve(reason);
        } catch (error) {
          reject(error);
        }
      });
    });
  }
  if (this.status === FULFILLED) {
    return new MyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          let result = onfulfilled(this.value);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    });
  }
  if (this.status === REJECT) {
    return new MyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          let reason = onrejected(this.value);
          resolve(reason);
        } catch (error) {
          reject(error);
        }
      });
    });
  }
};

// test code
let pms = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('hello');
  }, 1000);
});

// 连续调用
pms.then(() => {
  console.log('1');
});

pms.then(() => {
  console.log('2');
});

// 链式调用
pms
  .then(() => {
    console.log('1');
    return '2 next then';
  })
  .then((res) => {
    console.log(res);
  });

console.log('代码应该比 promise.then 先输出');
