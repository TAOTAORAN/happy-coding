function flat(arr: any[], depth = 1) {
  let result: any[] = [];

  if (depth === 0) {
    return arr;
  }

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flat(arr[i], --depth));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

// test code
console.log(flat([0, [1, [2, [3]]], 0], 3));
