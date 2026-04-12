const Semaphore = require("../cpu-io/hard/Semaphore");

describe("Semaphore", () => {
  test("limits concurrent execution to max permits", async () => {
    const sem = new Semaphore(2);
    let running = 0;
    let maxRunning = 0;

    const task = async () => {
      running++;
      maxRunning = Math.max(maxRunning, running);
      await new Promise(r => setTimeout(r, 30));
      running--;
    };

    await Promise.all([
      sem.run(task),
      sem.run(task),
      sem.run(task),
      sem.run(task),
    ]);

    expect(maxRunning).toBe(2);
  });

  test("queues tasks when permits are exhausted", async () => {
    const sem = new Semaphore(1);
    const order = [];

    const slow = async () => {
      order.push("slow-start");
      await new Promise(r => setTimeout(r, 40));
      order.push("slow-end");
    };

    const fast = async () => {
      order.push("fast");
    };

    const p1 = sem.run(slow);
    const p2 = sem.run(fast);

    await Promise.all([p1, p2]);

    expect(order).toEqual([
      "slow-start",
      "slow-end",
      "fast",
    ]);
  });

  test("releases permit even if task throws", async () => {
    const sem = new Semaphore(1);
    let ran = false;

    const badTask = async () => {
      throw new Error("boom");
    };

    const goodTask = async () => {
      ran = true;
    };

    await expect(sem.run(badTask)).rejects.toThrow("boom");
    await sem.run(goodTask);

    expect(ran).toBe(true);
  });

  test("maintains FIFO order for waiting tasks", async () => {
    const sem = new Semaphore(1);
    const order = [];

    const task = (id, delay) => async () => {
      await new Promise(r => setTimeout(r, delay));
      order.push(id);
    };

    const p1 = sem.run(task(1, 30));
    const p2 = sem.run(task(2, 10));
    const p3 = sem.run(task(3, 0));

    await Promise.all([p1, p2, p3]);

    expect(order).toEqual([1, 2, 3]);
  });
});
