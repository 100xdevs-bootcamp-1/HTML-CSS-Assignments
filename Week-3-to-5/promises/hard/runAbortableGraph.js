
// Problem Description – Cancellable Dependency Graph (Abort Signal)
//
// You are given a DAG of async tasks where tasks may depend on other tasks.
// Your task is to implement runAbortableGraph(tasks, signal).
//
// Tasks should run with maximum possible concurrency while respecting dependencies.
//
// Requirements:
// 1. Start tasks as soon as their dependencies are resolved
// 2. Support cancellation using an AbortSignal
// 3. If aborted, stop scheduling new tasks immediately
// 4. Any downstream tasks not yet started must never run and should reject immediately
// 5. The function should reject with an AbortError when cancelled
async function runAbortableGraph(tasks, signal) { }

module.exports = runAbortableGraph;
