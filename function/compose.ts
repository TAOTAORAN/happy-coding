function compose(...fns) {
  if (fns.length === 0) {
    return (args) => args;
  }

  if (fns.length === 1) {
    return fns[0];
  }

  return fns.reduce(
    (acc, fn) =>
      (...args) =>
        acc(fn(args))
  );
}
