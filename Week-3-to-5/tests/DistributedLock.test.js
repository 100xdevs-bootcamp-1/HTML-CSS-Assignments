const DistributedLock = require("../promises/hard/DistributedLock");

describe("DistributedLock with Expiry", () => {
  let lockManager;

  beforeEach(() => {
    lockManager = new DistributedLock();
  });

  test("should allow exclusive access", async () => {
    const lock1 = await lockManager.acquire("resource", 1000);
    let locked = true;

    const lock2Promise = lockManager.acquire("resource", 1000).then(() => {
      locked = false;
    });

    expect(locked).toBe(true);
    lock1.unlock();
    
    await lock2Promise;
    expect(locked).toBe(false);
  });

  test("should auto-expire after TTL", async () => {
    const start = Date.now();
    await lockManager.acquire("resource", 200); 

    await lockManager.acquire("resource", 1000);
    const end = Date.now();

    expect(end - start).toBeGreaterThanOrEqual(200);
  });

  test("should ignore unlock() calls after TTL expiration", async () => {
    const lock1 = await lockManager.acquire("resource", 100);
    
    await new Promise(r => setTimeout(r, 150));
    
    const lock2 = await lockManager.acquire("resource", 1000);
    
    lock1.unlock();
    
    const state = lockManager.locks.get("resource");
    expect(state.currentOwner).toBeDefined();
    
    lock2.unlock();
  });

  test("should allow lock extension", async () => {
    const lock = await lockManager.acquire("resource", 200);
    
    await new Promise(r => setTimeout(r, 100));
    const success = lock.extend(500);
    expect(success).toBe(true);

    const start = Date.now();
    await lockManager.acquire("resource", 100);
    const end = Date.now();

    expect(end - start).toBeGreaterThanOrEqual(450);
  });
});