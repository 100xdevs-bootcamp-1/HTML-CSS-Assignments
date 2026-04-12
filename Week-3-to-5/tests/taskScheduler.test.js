const taskScheduler = require("../promises/medium/taskScheduler");

const sleep = ms => new Promise(res => setTimeout(res, ms));

describe("taskScheduler", () => {
  test("runs tasks with concurrency limit and preserves order", async () => {
    const tasks = [
      () => sleep(50).then(() => "A"),
      () => sleep(10).then(() => "B"),
      () => sleep(30).then(() => "C"),
    ];

    const result = await taskScheduler(tasks, 2);
    expect(result).toEqual(["A", "B", "C"]);
  });

  test("never exceeds max concurrency", async () => {
    let running = 0;
    let maxSeen = 0;

    const tasks = Array.from({ length: 5 }, (_, i) => async () => {
      running++;
      maxSeen = Math.max(maxSeen, running);
      await sleep(20);
      running--;
      return i;
    });

    await taskScheduler(tasks, 2);
    expect(maxSeen).toBeLessThanOrEqual(2);
  });

  test("rejects when a task fails", async () => {
    const tasks = [
      () => sleep(10).then(() => 1),
      () => Promise.reject(new Error("boom")),
      () => sleep(10).then(() => 3),
    ];

    await expect(taskScheduler(tasks, 2)).rejects.toThrow("boom");
  });
});
