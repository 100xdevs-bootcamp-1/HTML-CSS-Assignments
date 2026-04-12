const heavyCPU = require("../cpu-io/easy/heavyCPU");

describe("heavyCPU", () => {
  test("returns correct sum for small iterations", () => {
    const result = heavyCPU(5);
    expect(result).toBe(10);
  });

  test("blocks the event loop during execution", (done) => {
    let timerFired = false;

    setTimeout(() => {
      timerFired = true;
    }, 0);

    heavyCPU(1e7);

    expect(timerFired).toBe(false);

    setTimeout(() => {
      expect(timerFired).toBe(true);
      done();
    }, 0);
  });
});
