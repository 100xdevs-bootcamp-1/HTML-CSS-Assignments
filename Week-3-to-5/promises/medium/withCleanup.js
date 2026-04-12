// Problem Description – Guaranteed Async Cleanup
//
// You need to wrap an asynchronous function so that a cleanup
// function is always executed, regardless of whether the async
// function succeeds or fails.
//

function withCleanup(fn, cleanup) {}

module.exports = withCleanup;

  