
// Problem Description – Sliding Window Rate Limited Collector
//
// You are required to implement createThrottledCollector(batchFn, batchSize, msLimit).
//
// The collector receives high-frequency data and processes it in batches.
//
// Requirements:
// 1. Collect incoming items into batches of size batchSize
// 2. Process each batch using batchFn(batch)
// 3. Enforce rate limiting: no more than 2 batches per second (msLimit based)
// 4. add(item) must return a Promise that resolves with the result of the batch
//    that item was processed in
//

function createThrottledCollector(batchFn, batchSize, msLimit) { }

module.exports = createThrottledCollector;
