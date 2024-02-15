function debounce(fn, delay) {
  let timer: null | ReturnType<typeof setTimeout> = null;

  return (...args) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    } else {
      timer = setTimeout(() => {
        fn(args);
      }, delay);
    }
  };
}

// 旧版写法
// function debounce (fn, delay) {
//   let timer: null | ReturnType<typeof setTimeout> = null;

//   return function () {
//     let self = this;
//     let args = arguments
//     if (timer) {
//       clearTimeout(timer);
//       timer = null;
//     } else {
//       timer = setTimeout(() => {
//         fn.apply(self, args)
//       }, delay);
//     }
//   }
// }
