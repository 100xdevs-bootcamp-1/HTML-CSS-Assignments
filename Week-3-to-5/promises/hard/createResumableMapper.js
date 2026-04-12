
// Problem Description – Resumable Async Map
//
// You are given an array of async tasks and a concurrency limit.
// Your task is to implement createResumableMapper(tasks, limit).
//
// The function must return an object with:
// 1. start(): starts/resumes processing and resolves when all tasks complete
// 2. pause(): stops scheduling new tasks (running tasks may finish)
// 3. getStatus(): returns progress info (completed, pending, running)
//
// When resumed, processing must continue from where it paused
// without re-running already completed tasks.
function createResumableMapper(tasks, limit) { }

module.exports = createResumableMapper;
