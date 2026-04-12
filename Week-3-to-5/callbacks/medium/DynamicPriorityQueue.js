// Problem Description – Priority Task Queue with Dynamic Concurrency
//
// You are required to implement a task queue that executes asynchronous
// tasks based on priority.
// Higher-priority tasks should be executed before lower-priority ones.
// The queue must enforce a concurrency limit, ensuring only a fixed number
// of tasks run at the same time.
// The concurrency limit can be updated dynamically while the system is running.
//
// Each task must invoke its callback when finished.
class DynamicPriorityQueue {
  constructor(concurrency) {}

  setLimit(newLimit) {}

  add(task, priority, onComplete) {}

  runNext() {}
}

module.exports = DynamicPriorityQueue;
