// Math.random() result: [0, 1)
// Math.floor() 向下取整
// Math.ceil() 向上取整
// Math.round() 四舍五入

// 生成 [n, m) 的随机整数
function randomNumber1(n, m) {
  return Math.floor(Math.random() * (m - n) + n);
}

// 生成 [n, m] 的随机整数
function randomNumber2(n, m) {
  return Math.round(Math.random() * (m - n) + n);
}

// 生成 (n, m] 的随机整数
function randomNumber3(n, m) {
  return Math.ceil(Math.random() * (m - n) + n);
}

// 生成 (n, m) 的随机整数
function randomNumber4(n, m) {
  const number = Math.floor(Math.random() * (m - n) + n);
  return number === n ? number + 1 : number;
}
