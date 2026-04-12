// Problem Description – Concurrency-Limited Task Executor

// You are given an array of asynchronous tasks and a number maxConcurrent. 
// Your task is to execute the tasks while ensuring that no more than maxConcurrent tasks run at the same time. 
// As soon as one task completes, the next pending task should start. 
// The final output must preserve the original task order.
async function taskScheduler(tasks, maxConcurrent) {}

module.exports = taskScheduler;
