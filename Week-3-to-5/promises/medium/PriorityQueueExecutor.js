
// Problem Description – Priority Task Queue
//
// You are required to implement a PriorityQueueExecutor that runs async tasks sequentially.
//
// The executor must support push(task, priority), where higher priority runs first.
// If tasks are waiting, newly added high-priority tasks should jump ahead of lower-priority ones.
class PriorityQueueExecutor {
  constructor() { }
  push(task, priority = 0) { }
  async _run() { }
}

module.exports = PriorityQueueExecutor;
