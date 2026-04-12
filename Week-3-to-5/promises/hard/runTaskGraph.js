// Problem Description – Dependency-Aware Task Scheduler
//
// You are required to write an async function that executes a set of tasks.
// Each task has a unique id, an async action, and a list of dependency task IDs.
//
// A task can only execute after all of its dependencies have completed.
// Tasks with no dependencies should start immediately and may run in parallel.
//
// The function must:
// 1. Execute tasks as soon as their dependencies are resolved
// 2. Detect circular dependencies and throw an error
// 3. Throw an error if a task depends on a missing task
//
// The function should return a map of taskId → result.

async function runTaskGraph(tasks) {}

module.exports = runTaskGraph;

