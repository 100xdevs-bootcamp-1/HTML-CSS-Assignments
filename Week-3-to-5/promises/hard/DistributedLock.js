// Problem Description – Distributed Mutex with Expiry (TTL Lock)
//
// You are required to implement a DistributedLock that provides exclusive access
// to a resource identified by a lockKey.
//
// Only one client can hold a lock at a time.
// If the lock is already held, new acquire requests must wait in a FIFO queue.
//
// Requirements:
// 1. Exclusive Access: only one active lock holder per lockKey
// 2. FIFO Queue: waiting acquire() calls must be served in order
// 3. TTL Expiry (Deadlock Guard):
//    - each lock is granted with a ttl (ms)
//    - after ttl expires, lock must auto-expire and be granted to next waiter
// 4. Safe Unlock:
//    - unlock() should release the lock immediately
//    - if unlock() is called after ttl already expired, ignore it
// 5. Lock Extension:
//    - extend(additionalMs) should increase ttl only if caller still owns the lock
//    - if caller lost ownership, ignore / reject
//
class DistributedLock {
  constructor() { }
  async acquire(lockKey, ttlMs) { }
}

module.exports = DistributedLock;
