
// Problem Description – Preemptive Priority Mutex
//
// You are required to implement a PriorityMutex that allows only one async task
// to hold a lock at a time.
//
// Each lock request includes a priority (higher is better).
// High-priority tasks should jump ahead of lower-priority tasks.
//
// To prevent starvation, tasks waiting longer than 5 seconds must gain priority
// (priority aging) and eventually move ahead in the queue.
//
// Implement a class PriorityMutex with:
// lock(task, priority): runs the task when it acquires the lock and returns a Promise.
//
// Tasks must execute one at a time, in the correct order based on aged priority.
class PriorityMutex {
  constructor() { }
  _getAgedPriority(waiter) { }
  async lock(task, basePriority) { }
  async _execute(task, resolve, reject) { }
  _next() { }
}

module.exports = PriorityMutex;
