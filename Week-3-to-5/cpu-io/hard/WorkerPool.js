// Problem Description – Worker Pool with Backpressure
//
// You are required to implement a WorkerPool that limits concurrent execution
// of async tasks.
//
// The pool should accept tasks via an enqueue() method.
// Only N tasks may run at the same time.
// The internal queue has a maximum capacity.
//
// If enqueue() is called when the queue is full, it must immediately
// return a rejected Promise to signal backpressure.
//
// This pattern is commonly used to prevent overload in high-throughput systems.

class WorkerPool {
  constructor(limit, maxQueue) {}

  enqueue(task) {}

  run() {}
}

  
  module.exports = WorkerPool;