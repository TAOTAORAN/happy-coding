interface Array<T> {
  myPush(...args: T[]): number;
}

Array.prototype['myPush'] = function () {
  for (let i = 0; i < arguments.length; i++) {
    this[this.length] = arguments[i];
  }
  return this.length;
};

// test code
console.log([1, 2].myPush(3)); // output: 3
