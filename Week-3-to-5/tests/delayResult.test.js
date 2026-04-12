const delayResult = require("../promises/easy/delayResult");

describe("delayResult Promise", () => {
  test("resolves with the correct value after a delay", async () => {
    const start = Date.now();
    const result = await delayResult("Success", 100);
    const end = Date.now();

    expect(result).toBe("Success");
    expect(end - start).toBeGreaterThanOrEqual(100);
  });

  test("works in parallel with different values and times", async () => {
    const p1 = delayResult(10, 50);
    const p2 = delayResult(20, 10);

    const results = await Promise.all([p1, p2]);
    
    expect(results).toEqual([10, 20]);
  });

  test("can be used in a chain", (done) => {
    delayResult("First", 10)
      .then((res1) => {
        expect(res1).toBe("First");
        return delayResult("Second", 10);
      })
      .then((res2) => {
        expect(res2).toBe("Second");
        done();
      })
      .catch((err) => done(err));
  });
});