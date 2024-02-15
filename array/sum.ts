function sum(array: number[]) {
  return array.reduce((pre, cur) => pre + cur, 0);
}

// test code
console.log(sum([1, 2, 3, 4]));
