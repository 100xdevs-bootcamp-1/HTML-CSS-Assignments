const RateLimiter = require("../cpu-io/hard/RateLimiter");

describe("RateLimiter", () => {
  test("should allow immediate execution within limit", async () => {
    const limiter = new RateLimiter(2, 1000);
    const start = Date.now();

    await limiter.throttle(async () => {});
    await limiter.throttle(async () => {});

    const duration = Date.now() - start;
    expect(duration).toBeLessThan(100);
  });

  test("should delay execution when limit is reached", async () => {
    const limiter = new RateLimiter(1, 200);
    const start = Date.now();

    await limiter.throttle(async () => {}); // Executes immediately
    await limiter.throttle(async () => {}); // Should wait ~200ms

    const duration = Date.now() - start;
    expect(duration).toBeGreaterThanOrEqual(190);
  });

  test("should handle multiple bursts", async () => {
    const limiter = new RateLimiter(2, 200);
    const start = Date.now();

    await Promise.all([
      limiter.throttle(async () => 1),
      limiter.throttle(async () => 2),
      limiter.throttle(async () => 3), // Should be delayed
    ]);

    const duration = Date.now() - start;
    expect(duration).toBeGreaterThanOrEqual(190);
  });

  test("should return the result of the task", async () => {
    const limiter = new RateLimiter(5, 1000);
    const result = await limiter.throttle(async () => "success");
    expect(result).toBe("success");
  });

  test("should handle tasks that throw error", async () => {
    const limiter = new RateLimiter(1, 100);
    await expect(
      limiter.throttle(async () => {
        throw new Error("task fail");
      }),
    ).rejects.toThrow("task fail");

    // Next task should still be rate limited correctly
    const start = Date.now();
    await limiter.throttle(async () => {});
    expect(Date.now() - start).toBeGreaterThanOrEqual(90);
  });

  test("should maintain FIFO order", async () => {
    const limiter = new RateLimiter(1, 100);
    const results = [];

    const p1 = limiter.throttle(async () => {
      results.push(1);
    });
    const p2 = limiter.throttle(async () => {
      results.push(2);
    });
    const p3 = limiter.throttle(async () => {
      results.push(3);
    });

    await Promise.all([p1, p2, p3]);
    expect(results).toEqual([1, 2, 3]);
  });

  test("should work with a limit of 1", async () => {
    const limiter = new RateLimiter(1, 50);
    const start = Date.now();
    await limiter.throttle(async () => {});
    await limiter.throttle(async () => {});
    expect(Date.now() - start).toBeGreaterThanOrEqual(50);
  });

  test("should allow many tasks if window passes", async () => {
    const limiter = new RateLimiter(1, 50);
    await limiter.throttle(async () => {});
    await new Promise((res) => setTimeout(res, 60));

    const start = Date.now();
    await limiter.throttle(async () => {});
    expect(Date.now() - start).toBeLessThan(20);
  });
});
