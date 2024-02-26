// 实现批量请求函数，并可以限制并发数量

const request = async (url) => {
  console.log('触发请求', url);
  return new Promise((resolve) => {
    const time = Math.floor(Math.random() * 1500);
    setTimeout(() => {
      console.log(`data from: ${url}`);
      resolve(`data from: ${url}`);
    }, time);
  });
};

const onHandle = async (sequence, result) => {
  while (sequence.length) {
    let last = sequence.pop();
    try {
      result[last?.index] = await request(last?.url);
    } catch (error) {
      result[last?.index] = error;
    }
  }
};

const limitRequest = async (urls, limit) => {
  let sequence = urls.map((url, index) => ({ url, index })); // 为了确保输出顺序，存储 index
  let result = [];
  let promises = Array.from({ length: Math.min(limit, urls.length) }, () =>
    onHandle(sequence, result)
  );
  await Promise.all(promises);

  return result;
};

limitRequest(['url1', 'url2', 'url3', 'url4'], 1)
  .then((res) => {
    console.log('全部请求结束');
    console.log('res', res);
  })
  .catch((err) => {
    console.error(err);
  });
