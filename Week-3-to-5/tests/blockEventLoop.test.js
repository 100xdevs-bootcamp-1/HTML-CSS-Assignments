const blockEventLoop = require("../cpu-io/easy/blockEventLoop");

describe("blockEventLoop", () => {
  test("should block the execution for at least the specified time", () => {
    const start = Date.now();
    blockEventLoop(100);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(100);
  });

  test("should prevent timers from firing during block", async () => {
    let timerFired = false;
    setTimeout(() => {
      timerFired = true;
    }, 10);

    
    blockEventLoop(100);

    expect(timerFired).toBe(false);

    await new Promise((res) => setTimeout(res, 0));
    expect(timerFired).toBe(true);
  });

  test("should handle 0ms block", () => {
    const start = Date.now();
    blockEventLoop(0);
    const end = Date.now();
    expect(end - start).toBeLessThan(50);
  });

  test("should block setImmediate as well", async () => {
    let immediateFired = false;
    setImmediate(() => {
      immediateFired = true;
    });

    blockEventLoop(50);
    expect(immediateFired).toBe(false);

    await new Promise((res) => setImmediate(res));
    expect(immediateFired).toBe(true);
  });

  test("should block microtasks (Promises)", async () => {
    let promiseFired = false;
    Promise.resolve().then(() => {
      promiseFired = true;
    });

    blockEventLoop(50);
    expect(promiseFired).toBe(false);

    await new Promise((res) => setTimeout(res, 0));
    expect(promiseFired).toBe(true);
  });

  test("should be cumulative if called multiple times", () => {
    const start = Date.now();
    blockEventLoop(50);
    blockEventLoop(50);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(100);
  });

  test("should block even with very small durations", () => {
    const start = performance.now();
    blockEventLoop(10);
    const end = performance.now();
    expect(end - start).toBeGreaterThanOrEqual(10);
  });
});
