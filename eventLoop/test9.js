function runAsync(x) {
  const p = new Promise((resolve) => {
    setTimeout(() => {
      resolve(x, console.log(x)); // resolve 只处理第一个参数，但是后续参数如果传代码，会执行
    }, 1000);
  });
  return p;
}
Promise.all([runAsync(1), runAsync(2)]).then((res) => {
  console.log(res);
});
