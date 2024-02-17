// .then .catch 的参数期望是函数，否则会发生值透传
Promise.resolve(1).then(2).then(Promise.resolve(3)).then(console.log);
