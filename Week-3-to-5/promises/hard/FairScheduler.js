// Problem Description – Fair Priority Task Scheduler (Starvation-Free)
//
// You are required to implement a task scheduler that supports priorities
// while ensuring fairness.
//
// Each task has a priority (higher number = higher priority).
// Normally, higher-priority tasks should run first.
//
// However, low-priority tasks must not starve forever.
// If a task waits too long, its effective priority should increase over time
// (priority aging).
//
// Requirements:
// 1. Higher-priority tasks should be preferred
// 2. Tasks must execute one at a time
// 3. Starvation must be prevented using priority aging
// 4. Tasks must execute asynchronously

class FairScheduler {
  constructor(agingFactor = 1) {}

  schedule(task, priority = 0) {}

  async run() {}
}

module.exports = FairScheduler;

