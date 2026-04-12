// Problem Description – Concurrent Cache with Deduplication and TTL
//
// You are required to implement a cache for async data fetching.
//
// The cache must:
// 1. Deduplicate concurrent requests for the same key
// 2. Cache resolved values with a time-to-live (TTL)
// 3. Return cached values if they are still valid
//
// If a cached value is close to expiry, return the current value
// but trigger a background refresh for future requests.
class Cache {
  constructor(ttl) {}

  get(key, fetcher) {}
}

module.exports = Cache;
