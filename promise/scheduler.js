// JS 实现一个带并发限制的异步调度器
// 保证同事运行的任务最多有两个
// 完善代码中 Schedule 类
// 使得一下程序能正确输出

class Schedule {
  constructor() {
    this.count = 2;
    this.queue = [];
    this.run = [];
  }

  add(task) {
    return new Promise((resolve) => {
      this.queue.push({ task, resolve }); // 将任务和其对应的 resolve 函数放入队列

      this.runTasks(); // 开始运行任务
    });
  }

  runTasks() {
    while (this.run.length < this.count && this.queue.length > 0) {
      const { task, resolve } = this.queue.shift(); // 从队列中取出任务和其对应的 resolve 函数
      const promise = task(); // 执行任务
      promise.then(() => {
        resolve(); // 执行任务完成后，调用 resolve 函数
        this.run.splice(this.run.indexOf(promise), 1); // 从当前运行的任务中移除完成的任务
        this.runTasks(); // 递归调用以继续运行任务
      });
      this.run.push(promise); // 将当前任务添加到运行列表中
    }
  }
}

const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const scheduler = new Schedule();
const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order));
};

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(1000, '4');
// output: 2 3 1 4

// 一开始 1、2 进入任务队列
// 500ms时，2 完成，3 进队
// 800ms时，3 完成 4 进队
// 1000ms时，1 完成 输出 1
// 1200ms时，4 完成 输出 4
