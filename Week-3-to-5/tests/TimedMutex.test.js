const TimedMutex = require("../promises/medium/TimedMutex");

describe("TimedMutex", () => {
  test("acquires lock immediately if free", async () => {
    const mutex = new TimedMutex();

    const release = await mutex.acquire(100);
    expect(typeof release).toBe("function");

    release();
    expect(mutex.locked).toBe(false);
  });

  test("queues requests when locked and runs in order", async () => {
    const mutex = new TimedMutex();
    const order = [];

    const release1 = await mutex.acquire(100);
    order.push(1);

    const p2 = mutex.acquire(100).then((release) => {
      order.push(2);
      release();
    });

    const p3 = mutex.acquire(100).then((release) => {
      order.push(3);
      release();
    });

    release1();

    await Promise.all([p2, p3]);

    expect(order).toEqual([1, 2, 3]);
  });

  test("rejects if lock is not acquired within timeout", async () => {
    const mutex = new TimedMutex();

    await mutex.acquire(100);

    await expect(mutex.acquire(20)).rejects.toBe("Lock Timeout");
  });

  test("allows next queued task after release", async () => {
    const mutex = new TimedMutex();
    let ran = false;

    const release1 = await mutex.acquire(100);

    const p2 = mutex.acquire(100).then((release) => {
      ran = true;
      release();
    });

    expect(ran).toBe(false);

    release1();
    await p2;

    expect(ran).toBe(true);
  });
});
