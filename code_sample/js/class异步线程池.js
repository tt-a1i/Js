class taskScheduler {
  constructor(maxRunningTasks = 2) {
    this.maxRunningTasks = maxRunningTasks;
    this.runningTasks = 0;
    this.tasks = [];
  }

  run() {
    if (this.tasks.length <= 0 || this.runningTasks >= this.maxRunningTasks) return;

    this.runningTasks++;
    const task = this.tasks.shift();

    task()
        .finally(() => {
          this.runningTasks--;
          this.run();
        });
  }

  addTask(task) {
    return new Promise((...args) => {
      this.tasks.push(() => task().then(...args));
      this.run();
    });
  }
}

function promiseTimeout(time, label) {
  console.log(label);
  console.time(label);
  return () => new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  }).then(() => {
    console.timeEnd(label);
  });
}

const scheduler = new taskScheduler(3);

scheduler.addTask(promiseTimeout(1000, '商品1'));
scheduler.addTask(promiseTimeout(2000, '商品2'));
scheduler.addTask(promiseTimeout(3000, '商品3'));
scheduler.addTask(promiseTimeout(4000, '商品4'));
