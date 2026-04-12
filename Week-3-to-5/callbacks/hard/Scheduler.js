// Problem Description – Preemptive Priority Task Scheduler
//
// You are required to build a scheduler that executes async tasks
// based on priority.
//
// Higher-priority tasks should be executed before lower-priority ones.
// Long-running tasks must periodically yield control back to the scheduler
// so that newly arrived high-priority tasks can be processed.
//
// True preemption is not possible in JavaScript, so tasks must cooperate
// by yielding execution voluntarily.

class Scheduler {
  constructor() {}

  schedule(task, priority = 0) {}

  run(onAllFinished) {}
}

module.exports = Scheduler;
