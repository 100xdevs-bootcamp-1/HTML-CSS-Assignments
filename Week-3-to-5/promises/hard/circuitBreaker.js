
// Problem Description – Circuit Breaker Promise Wrapper
//
// You are given an async function fn that may fail.
// Your task is to implement circuitBreaker(fn, failureThreshold, resetTimeout).
//
// The circuit breaker must track consecutive failures and manage states:
//
// 1. CLOSED: calls execute normally
// 2. OPEN: after failureThreshold failures, reject immediately without calling fn
// 3. HALF-OPEN: after resetTimeout, allow one trial call to check recovery
//
// If the trial succeeds, reset to CLOSED.
// If it fails, return to OPEN.
function circuitBreaker(fn, failureThreshold, resetTimeout) { }

module.exports = circuitBreaker;
