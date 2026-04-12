const yieldedCPU = require("../cpu-io/easy/yieldedCPU");

describe("yieldedCPU", () => {
  test("returns correct sum", async () => {
    const result = await yieldedCPU(5);
    expect(result).toBe(10);
  });

  test("allows the event loop to run while executing", async () => {
    let timerFired = false;

    setTimeout(() => {
      timerFired = true;
    }, 0);

    await yieldedCPU(5000);

    expect(timerFired).toBe(true);
  });
});
