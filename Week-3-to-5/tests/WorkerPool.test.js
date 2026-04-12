const WorkerPool = require("../cpu-io/hard/WorkerPool");

describe("WorkerPool", () => {
  test("limits concurrent execution", async () => {
    const pool = new WorkerPool(1, 10);
    let running = 0;

    const task = async () => {
      running++;
      expect(running).toBe(1);
      await new Promise(r => setTimeout(r, 50));
      running--;
    };

    await Promise.all([
      pool.enqueue(task),
      pool.enqueue(task),
    ]);
  });

  test("rejects when queue is full", async () => {
    const pool = new WorkerPool(1, 0);
    await expect(pool.enqueue(async () => {})).rejects.toThrow();
  });
});
