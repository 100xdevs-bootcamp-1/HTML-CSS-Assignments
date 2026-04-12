
// Problem Description – Async Batch Processor (Time or Count)
//
// You are required to implement createBatcher(processorFn, maxBatchSize, maxWaitMs).
//
// The batcher should collect incoming items and process them in batches.
//
// It must return add(item):
// 1. Add items into a buffer
// 2. If buffer reaches maxBatchSize, call processorFn(batch) immediately
// 3. If maxWaitMs passes before reaching maxBatchSize, call processorFn with the partial batch
// 4. After processing, reset the buffer and timer so no items remain stuck

function createBatcher(processorFn, maxBatchSize, maxWaitMs) { }

module.exports = createBatcher;
