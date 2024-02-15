function randomArray(array) {
  for (let i = 0; i < array.length; i++) {
    // randomIndex: [i, array.length - 1]
    const randomIndex = Math.round(Math.random() * (array.length - 1 - i) + i);
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}

// test code
console.log(randomArray([1, 2, 3, 4]));
