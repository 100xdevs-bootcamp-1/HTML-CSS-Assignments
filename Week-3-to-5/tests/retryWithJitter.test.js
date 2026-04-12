const retryWithJitter = require("../cpu-io/medium/retryWithJitter");

const sleep = ms => new Promise(res => setTimeout(res, ms));

describe("retryWithJitter", () => {
  test("resolves if function eventually succeeds", async () => {
    let attempts = 0;

    const fn = jest.fn(async () => {
      attempts++;
      if (attempts < 3) throw new Error("fail");
      return "success";
    });

    const result = await retryWithJitter(fn, 3, 10);

    expect(result).toBe("success");
    expect(fn).toHaveBeenCalledTimes(3);
  });

  test("rejects after exhausting retries", async () => {
    const fn = jest.fn(async () => {
      throw new Error("always fails");
    });

    await expect(
      retryWithJitter(fn, 2, 10)
    ).rejects.toThrow("always fails");

    expect(fn).toHaveBeenCalledTimes(3); 
  });

  test("waits between retries (exponential backoff with jitter)", async () => {
    let attempts = 0;
    const start = Date.now();

    const fn = async () => {
      attempts++;
      if (attempts < 2) throw new Error("fail");
      return "ok";
    };

    const result = await retryWithJitter(fn, 1, 20);
    const elapsed = Date.now() - start;

    expect(result).toBe("ok");
    expect(elapsed).toBeGreaterThanOrEqual(20);
  });
});
