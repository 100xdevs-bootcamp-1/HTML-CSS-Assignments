const PromisePool = require("../callbacks/medium/PromisePool");

const sleep = ms => new Promise(res => setTimeout(res, ms));

describe("PromisePool", () => {
  test("runs at most N tasks concurrently", async () => {
    const pool = new PromisePool(2);
    let running = 0;
    let maxSeen = 0;

    const task = async () => {
      running++;
      maxSeen = Math.max(maxSeen, running);
      await sleep(20);
      running--;
      return "done";
    };

    await Promise.all([
      pool.run(task),
      pool.run(task),
      pool.run(task),
      pool.run(task),
    ]);

    expect(maxSeen).toBeLessThanOrEqual(2);
  });

  test("queues tasks beyond concurrency limit", async () => {
    const pool = new PromisePool(1);
    const order = [];

    const task = async (label, delay) => {
      await sleep(delay);
      order.push(label);
      return label;
    };

    await Promise.all([
      pool.run(() => task("A", 20)),
      pool.run(() => task("B", 10)),
      pool.run(() => task("C", 5)),
    ]);

    expect(order).toEqual(["A", "B", "C"]);
  });

  test("resolves each task with its result", async () => {
    const pool = new PromisePool(2);

    const results = await Promise.all([
      pool.run(async () => 1),
      pool.run(async () => 2),
      pool.run(async () => 3),
    ]);

    expect(results).toEqual([1, 2, 3]);
  });

  test("rejects task promise if task throws", async () => {
    const pool = new PromisePool(1);

    await expect(
      pool.run(async () => {
        throw new Error("boom");
      })
    ).rejects.toThrow("boom");
  });

  test("continues processing queue after a task fails", async () => {
    const pool = new PromisePool(1);
    const results = [];

    const successTask = async (val) => {
      await sleep(5);
      results.push(val);
      return val;
    };

    await expect(
      pool.run(async () => {
        throw new Error("fail");
      })
    ).rejects.toThrow("fail");

    const res = await pool.run(() => successTask("ok"));

    expect(res).toBe("ok");
    expect(results).toEqual(["ok"]);
  });
});
