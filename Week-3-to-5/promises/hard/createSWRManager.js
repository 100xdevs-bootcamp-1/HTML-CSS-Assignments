
// Problem Description – Stale-While-Revalidate Flight Tracker
//
// You are required to implement createSWRManager(fetcherFn, ttl).
//
// The manager should return cached data immediately for fast responses,
// but refresh stale data in the background.
//
// Requirements:
// 1. If cached value exists, return it immediately
// 2. If cache age exceeds ttl, trigger a background refresh
// 3. If refresh fails, keep stale cached data (do not crash)
// 4. If multiple calls happen during refresh, deduplicate and share one refresh promise
//
function createSWRManager(fetcherFn, ttl) { }

module.exports = createSWRManager;
