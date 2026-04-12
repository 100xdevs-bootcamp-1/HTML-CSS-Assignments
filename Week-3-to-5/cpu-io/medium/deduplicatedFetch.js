// Problem Description – Deduplicated Network Request Utility

// You are required to build a utility that prevents multiple identical network requests from executing simultaneously. 
// If the same request (for example, getData('id-1')) is called multiple times at the same moment, only one network request should be triggered. 
// All callers must receive the same Promise result once the request completes.

const pendingRequests = new Map();

function deduplicatedFetch(id, apiCall) {}

module.exports = deduplicatedFetch;
