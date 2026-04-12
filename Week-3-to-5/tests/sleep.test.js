const sleep = require("../callbacks/easy/sleep");

describe("sleep callback", () => {
  test("waits for the specified time before calling back", (done) => {
    const start = Date.now();
    const duration = 100;

    sleep(duration, () => {
      try {
        const diff = Date.now() - start;
        expect(diff).toBeGreaterThanOrEqual(duration);
        done();
      } catch (error) {
        done(error);
      }
    });
  }, 200); 
});