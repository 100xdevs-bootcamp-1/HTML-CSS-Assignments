const batchAll = require("../promises/medium/batchAll");

const sleep = ms => new Promise(res => setTimeout(res, ms));

describe("batchAll", () => {
  test("processes tasks in batches and preserves order", async () => {
    const tasks = [
      () => sleep(20).then(() => 1),
      () => sleep(10).then(() => 2),
      () => sleep(5).then(() => 3),
      () => sleep(5).then(() => 4),
    ];

    const result = await batchAll(tasks, 2);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  test("does not start next batch until current batch finishes", async () => {
    const started = [];
    const finished = [];

    const tasks = [
      () => sleep(30).then(() => finished.push(1)),
      () => sleep(30).then(() => finished.push(2)),
      () => {
        started.push(3);
        return Promise.resolve(3);
      },
      () => {
        started.push(4);
        return Promise.resolve(4);
      },
    ];

    await batchAll(tasks, 2);

    expect(started.length).toBe(2);
    expect(finished).toEqual([1, 2]);
  });

  test("runs all tasks in a batch in parallel", async () => {
    const start = Date.now();

    const tasks = [
      () => sleep(30),
      () => sleep(30),
      () => sleep(30),
    ];

    await batchAll(tasks, 3);
    const elapsed = Date.now() - start;

    expect(elapsed).toBeLessThan(60);
  });

  test("handles batchSize larger than task count", async () => {
    const tasks = [
      () => Promise.resolve(1),
      () => Promise.resolve(2),
    ];

    const result = await batchAll(tasks, 5);
    expect(result).toEqual([1, 2]);
  });

  test("rejects if any task in a batch fails", async () => {
    const tasks = [
      () => Promise.resolve(1),
      () => Promise.reject(new Error("boom")),
      () => Promise.resolve(3),
    ];

    await expect(batchAll(tasks, 2)).rejects.toThrow("boom");
  });
});
