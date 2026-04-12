const Barrier = require("../promises/medium/Barrier");

describe("Barrier Synchronization", () => {
  test("blocks execution until open() is called", async () => {
    const barrier = new Barrier();
    let completed = false;

    const task = (async () => {
      await barrier.wait();
      completed = true;
    })();

    expect(completed).toBe(false);

    barrier.open();
    await task; 

    expect(completed).toBe(true);
  });

  test("resolves multiple waiters at once", async () => {
    const barrier = new Barrier();
    let count = 0;

    const waiter = async () => {
      await barrier.wait();
      count++;
    };

    const p1 = waiter();
    const p2 = waiter();
    const p3 = waiter();

    expect(count).toBe(0);

    barrier.open();
    await Promise.all([p1, p2, p3]);

    expect(count).toBe(3);
  });

  test("resolves immediately if wait() is called after open()", async () => {
    const barrier = new Barrier();
    barrier.open();

    let resolvedImmediately = false;
    await barrier.wait().then(() => {
      resolvedImmediately = true;
    });

    expect(resolvedImmediately).toBe(true);
  });
});