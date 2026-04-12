const PriorityQueueExecutor = require("../promises/medium/PriorityQueueExecutor");

describe("Priority Queue Executor", () => {
  test("executes tasks in order of priority", async () => {
    const executor = new PriorityQueueExecutor();
    const results = [];

    const createTask = (id, ms) => async () => {
      await new Promise(r => setTimeout(r, ms));
      results.push(id);
    };

    executor.push(createTask("LOW", 50), 1);
    
    executor.push(createTask("MED", 10), 5);
    executor.push(createTask("HIGH", 10), 10);

    await new Promise(r => setTimeout(r, 150));

    expect(results).toEqual(["LOW", "HIGH", "MED"]);
  });

  test("handles tasks with the same priority in FIFO order", async () => {
    const executor = new PriorityQueueExecutor();
    const results = [];

    executor.push(async () => results.push(1), 10);
    executor.push(async () => results.push(2), 10);

    await new Promise(r => setTimeout(r, 50));
    expect(results).toEqual([1, 2]);
  });
});