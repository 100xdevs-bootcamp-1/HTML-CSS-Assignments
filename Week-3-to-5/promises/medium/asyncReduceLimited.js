// Problem Description – Parallel Chunked Async Reducer

// You are required to process an array using a reducer function where the reduction happens in sequence, but the data fetching or processing for items is performed in parallel chunks. 
// Each chunk should be processed concurrently, then reduced before moving to the next chunk. 
// The final reduced result must be correct and deterministic.
async function asyncReduceLimited(array, limit, asyncProcessFn, reducer, initialValue) {}

async function mapAsyncLimit(array, limit, asyncFn) {}

module.exports = asyncReduceLimited;
