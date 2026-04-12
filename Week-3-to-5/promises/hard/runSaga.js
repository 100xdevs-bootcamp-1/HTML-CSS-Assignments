
// Problem Description – Atomic Multi-Stage Saga (Recovery)
//
// You are required to implement runSaga(stages).
//
// Each stage contains:
// { action: () => Promise, undo: () => Promise }
//
// The stages must run sequentially.
// If any stage action fails, you must rollback by calling undo() for all
// previously completed stages in reverse order.
//
// Requirements:
// 1. Execute all actions in order
// 2. On failure, rollback completed actions using undo() (reverse order)
// 3. If an undo fails, reject with "Critical Failure" including both
//    the original error and undo error
//
async function runSaga(stages) { }

module.exports = runSaga;
