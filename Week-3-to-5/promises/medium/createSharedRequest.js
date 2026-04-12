
// Problem Description – Promise Shared Cache (Thundering Herd Prevention)
//
// You are given an async function apiCallFn.
// Your task is to implement createSharedRequest(apiCallFn).
//
// The first call should trigger apiCallFn.
// If called again while the request is still pending, return the same promise.
// Once it resolves or rejects, the next call should start a new request.
function createSharedRequest(apiCallFn) { }

module.exports = createSharedRequest;
