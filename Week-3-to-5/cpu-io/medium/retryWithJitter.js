// Problem Description – Retry with Exponential Backoff and Jitter

// You are required to implement a retry mechanism for an asynchronous task that fails. 
// On each retry, the delay before the next attempt should increase, and a small random “jitter”
// should be added to the delay to prevent synchronized retries that can overload a server. 
// The process should stop once the task succeeds or the maximum retry limit is reached.
async function retryWithJitter(fn, retries = 3, baseDelay = 1000) {}

module.exports = retryWithJitter;
