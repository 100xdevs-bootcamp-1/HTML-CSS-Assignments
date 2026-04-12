const measureTime = require("../cpu-io/easy/measureTime");

describe("measureTime", () => {
  test("should measure the time of a 100ms async function", async () => {
    const fn = () => new Promise((res) => setTimeout(res, 100));
    const duration = await measureTime(fn);

    // Allow some buffer for setTimeout inaccuracy
    expect(duration).toBeGreaterThanOrEqual(90);
    expect(duration).toBeLessThan(200);
  });

  test("should handle very fast functions", async () => {
    const fn = async () => 1;
    const duration = await measureTime(fn);
    expect(duration).toBeGreaterThanOrEqual(0);
  });

  test("should rethrow error if function fails", async () => {
    const fn = async () => {
      throw new Error("fail");
    };
    await expect(measureTime(fn)).rejects.toThrow("fail");
  });

  test("should handle function resolving with a value", async () => {
    const fn = async () => "result";
    const duration = await measureTime(fn);
    expect(typeof duration).toBe("number");
  });

  test("should handle multiple concurrent calls", async () => {
    const fn = () => new Promise((res) => setTimeout(res, 50));
    const results = await Promise.all([measureTime(fn), measureTime(fn)]);
    results.forEach((duration) => {
      expect(duration).toBeGreaterThanOrEqual(40);
    });
  });

  test("should measure zero-delay functions", async () => {
    const fn = () => Promise.resolve();
    const duration = await measureTime(fn);
    expect(duration).toBeGreaterThanOrEqual(0);
  });

  test("should measure long-running functions", async () => {
    const fn = () => new Promise((res) => setTimeout(res, 300));
    const duration = await measureTime(fn);
    expect(duration).toBeGreaterThanOrEqual(290);
  }, 10000); // Higher timeout for long test

  test("should handle synchronous functions wrapped in async", async () => {
    const fn = async () => {
      let sum = 0;
      for (let i = 0; i < 1000000; i++) sum += i;
      return sum;
    };
    const duration = await measureTime(fn);
    expect(duration).toBeGreaterThanOrEqual(0);
  });
});
