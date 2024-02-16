// 数组去重

function removeDuplicates(arr) {
  return Array.from(new Set(arr));
}

// test code
console.log(removeDuplicates([1, 1, 2, 3, 3, 4, 5]));
