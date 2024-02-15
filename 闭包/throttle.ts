function throttle(fn, interval) {
  let timer: null | ReturnType<typeof setTimeout> = null;

  return (...args) => {
    if (timer) {
      return;
    } else {
      timer = setTimeout(() => {
        fn();
      }, interval);
    }
  };
}

// 旧版写法
// function throttle(fn, interval) {
//   let timer: null | ReturnType<typeof setTimeout> = null;

//   return function () {
//     let self = this;
//     let args = arguments;
//     if (timer) {
//       return;
//     } else {
//       timer = setTimeout(() => {
//         fn.apply(self, args);
//       }, interval);
//     }
//   };
// }
