// Problem Description – Rate Limiter (Token Bucket / Sliding Window)
//
// You are required to implement a `RateLimiter` class that restricts the
// number of executions of a given task within a specific time window.
//
// The limiter should ensure that no more than `limit` tasks are executed
// in any given `windowMs` period.
//
// Requirements:
// 1. The constructor should accept `limit` (max tasks) and `windowMs` (time window).
// 2. The `throttle(task)` method should return a Promise that resolves when the task
//    can be executed.
// 3. If the limit is reached, subsequent tasks must wait until the window allows
//    another execution.
// 4. Tasks should be executed in the order they were submitted (FIFO).
//
// This is a common pattern for API rate limiting and resource management.

class RateLimiter {
  constructor(limit, windowMs) {}

  async throttle(task) {}
}

module.exports = RateLimiter;
