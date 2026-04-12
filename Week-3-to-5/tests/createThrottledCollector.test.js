const createThrottledCollector = require("../promises/hard/createThrottledCollector");

describe("Sliding Window Rate Limited Collector", () => {
  test("batches items and resolves with batch results", async () => {
    const batchFn = jest.fn().mockImplementation(async (batch) => `Processed ${batch.length}`);
    const collector = createThrottledCollector(batchFn, 3, 100);

    const p1 = collector.add("a");
    const p2 = collector.add("b");
    const p3 = collector.add("c"); 

    const results = await Promise.all([p1, p2, p3]);

    expect(results).toEqual(["Processed 3", "Processed 3", "Processed 3"]);
    expect(batchFn).toHaveBeenCalledTimes(1);
  });

  test("enforces the time limit between batches", async () => {
    const batchFn = jest.fn().mockResolvedValue("ok");
    const collector = createThrottledCollector(batchFn, 1, 200);

    const start = Date.now();
    
    await collector.add("item1");
    await collector.add("item2");

    const duration = Date.now() - start;

    expect(duration).toBeGreaterThanOrEqual(200);
    expect(batchFn).toHaveBeenCalledTimes(2);
  });
});