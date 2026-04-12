const CallbackPool = require("../callbacks/medium/CallbackPool");

describe("CallbackPool", () => {
  test("limits concurrency to the specified amount", (done) => {
    const pool = new CallbackPool(2);
    let activeCount = 0;
    let maxActive = 0;
    let finished = 0;

    const task = (cb) => {
      activeCount++;
      maxActive = Math.max(maxActive, activeCount);
      setTimeout(() => {
        activeCount--;
        cb(null, "done");
      }, 20);
    };

    const handleComplete = () => {
      finished++;
      if (finished === 5) {
        try {
          expect(maxActive).toBeLessThanOrEqual(2);
          done();
        } catch (e) { done(e); }
      }
    };

    for (let i = 0; i < 5; i++) {
      pool.run(task, handleComplete);
    }
  });
});