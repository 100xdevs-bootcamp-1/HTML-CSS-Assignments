const withTimeoutPromise = require("../promises/easy/withTimeoutPromise");

describe("withTimeoutPromise Wrapper", () => {
  test("resolves if the original promise is faster than the timeout", async () => {
    const fastPromise = new Promise((resolve) => setTimeout(() => resolve("Fast Data"), 50));
    
    const result = await withTimeoutPromise(fastPromise, 100);
    expect(result).toBe("Fast Data");
  });

  test("rejects if the timeout is faster than the original promise", async () => {
    const slowPromise = new Promise((resolve) => setTimeout(() => resolve("Slow Data"), 200));

    await expect(withTimeoutPromise(slowPromise, 100)).rejects.toThrow("Request Timed Out");
  });

  test("ensures standard errors from the original promise still propagate", async () => {
    const failingPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("API Error")), 20));

    await expect(withTimeoutPromise(failingPromise, 100)).rejects.toThrow("API Error");
  });
});