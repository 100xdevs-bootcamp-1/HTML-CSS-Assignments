
// Problem Description – Hedged Circuit Breaker
//
// You are required to implement circuitHedgedFetch(url, options).
//
// The function should perform a hedged request:
// start a primary fetch immediately, and if it does not respond within 200ms,
// start a backup fetch in parallel.
//
// Additionally, the function must include a circuit breaker mechanism.
// If the API fails repeatedly, the circuit breaker should open and future calls
// must fail fast without making network requests.
//
// While the circuit is OPEN, the function should immediately return a cached value
// instead of attempting the hedged network logic.
//
// This combines hedged requests with circuit breaker state management.
// State persisted outside the function call
function createCircuitHedgedFetch() {
  let cbState = "CLOSED";
  let failureCount = 0;
  let lastFailureTime = null;
  let lastKnownGoodValue = null;

  return async function circuitHedgedFetch(url, options = {}) {

  };
}


module.exports = circuitHedgedFetch;