// Problem Description – Abortable Async Pipeline
//
// You are required to implement an async pipeline that executes
// an array of async functions sequentially (waterfall execution).
//
// The pipeline must support cancellation using AbortController.
// If the abort signal is triggered:
// 1. Execution must stop immediately
// 2. Any pending async operation should be aborted
// 3. The pipeline must throw an AbortError
//
async function runPipeline(fns, signal) {}

module.exports = runPipeline;

  