const WeightedRateLimiter = require("../promises/hard/WeightedRateLimiter");

describe("Sliding Window Weighted Rate Limiter", () => {
  test("executes weighted requests within limits", async () => {
    const limiter = new WeightedRateLimiter(10, 1000); 
    const results = [];

    const task = (id) => async () => { results.push(id); return id; };

    const p1 = limiter.request(task(1), 6);
    const p2 = limiter.request(task(2), 5);

    expect(results).toEqual([1]);

    await p2; 
    expect(results).toEqual([1, 2]);
  });

  test("maintains FIFO fairness", async () => {
    const limiter = new WeightedRateLimiter(10, 500);
    const order = [];

    const task = (id) => async () => order.push(id);

   
    await limiter.request(task("A"), 10);
    
    const pB = limiter.request(task("B"), 10);
    const pC = limiter.request(task("C"), 1);

    await Promise.all([pB, pC]);

    expect(order).toEqual(["A", "B", "C"]);
  });
});