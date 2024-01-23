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

const resolvePromise = (promise, result, resolve, reject) => {
  /**
   * 处理循环引用的情况, 如:
   * let promise = new MyPromise((resolve, reject) => {
   * resolve(123);
   * });
   * let promise2 = promise.then(() => {
   * return promise2; // 这里返回了 promise2 自身
   * });
   */
  if (promise === result) {
    return reject(new TypeError('Promise cannot resolve itself'));
  }

  let thenCalledOrThrow = false; // 判断否已经执行了 onfulfilled 或 onrejected

  /**
   * 通常指的是一个对象或函数，它有一个then方法，这个方法的行为类似于 Promise 的 then 方法。
   * 这意味着虽然这个对象可能不是一个真正的 Promise 实例，但它遵循与 Promise 相似的接口和行为模式。
   * 在 JavaScript中，这种类型的对象被称为 "thenable"
   */
  let thenable;

  // 处理返回的 Promise：如果 result 是一个 Promise，我们需要等待它解析，然后根据它的结果来解析或拒绝 promise
  if (result instanceof MyPromise) {
    if (result.status === PENDING) {
      // 如果 Promise 状态仍未确定，即还可能改变
      result.then((value) => {
        resolvePromise(promise, value, resolve, reject);
      }, reject);
    } else {
      // 如果 Promise 状态已确定，直接采用它的状态
      result.then(resolve, reject);
    }
    return;
  }
  // 处理 thenable 对象：如果 result 是一个具有 .then 方法的对象或函数，我们尝试以 Promise-like 的方式处理它
  if (
    (typeof result === 'function' || typeof result === 'object') &&
    typeof result !== null
  ) {
    try {
      thenable = result.then;
      if (typeof thenable === 'function') {
        thenable.call(
          result,
          (value) => {
            if (thenCalledOrThrow) return;
            thenCalledOrThrow = true;
            return resolvePromise(promise, value, resolve, reject);
          },
          (reason) => {
            if (thenCalledOrThrow) return;
            thenCalledOrThrow = true;
            return reject(reason);
          }
        );
      } else {
        resolve(result);
      }
    } catch (error) {
      if (thenCalledOrThrow) return;
      thenCalledOrThrow = true;
      return reject(error);
    }
  } else {
    resolve(result);
  }
  // 处理普通值和错误：如果 result 是普通值，我们直接解析 promise。如果在处理过程中发生错误，我们拒绝 promise
};

MyPromise.prototype.then = function (onfulfilled, onrejected) {
  onfulfilled =
    typeof onfulfilled === 'function' ? onfulfilled : (data) => data;
  onrejected =
    typeof onrejected === 'function'
      ? onrejected
      : (error) => {
          throw error;
        };

  let promise;
  if (this.status === PENDING) {
    promise = new MyPromise((resolve, reject) => {
      this.onFulfilledFns.push(() => {
        try {
          let result = onfulfilled(this.value);
          resolvePromise(promise, result, resolve, reject);
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
    promise = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          let result = onfulfilled(this.value);
          resolvePromise(promise, result, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    });
  }
  if (this.status === REJECT) {
    promise = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          let reason = onrejected(this.value);
          resolvePromise(promise, reason, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  return promise;
};

// // test code
// let pms = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('hello');
//   }, 1000);
// });

// // 连续调用
// pms.then(() => {
//   console.log('1');
// });

// pms.then(() => {
//   console.log('2');
// });

// // 链式调用
// pms
//   .then(() => {
//     console.log('1');
//     return '2 next then';
//   })
//   .then((res) => {
//     console.log(res);
//   });

// console.log('代码应该比 promise.then 先输出');

// 显示返回一个 promise 实例
const pms2 = new MyPromise((resolve) => {
  setTimeout(() => {
    resolve('world');
  }, 1000);
});

pms2
  .then((data) => {
    console.log(data);
    return new MyPromise((resolve) => {
      setTimeout(() => {
        resolve('world2 next then');
      }, 1000);
    });
  })
  .then((data) => {
    console.log(data);
  });
