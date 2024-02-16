interface Array<T> {
  myFilter(...args: T[]): any[];
}

Array.prototype.myFilter = function (fn) {
  let result: any[] = [];
  this.forEach((item) => {
    if (fn(item)) {
      result.push(item);
    }
  });
  return result;
};
