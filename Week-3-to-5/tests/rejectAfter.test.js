const rejectAfter = require("../callbacks/easy/rejectAfter");

describe("rejectAfter callback", () => {
  test("calls the callback with an error after given time", (done) => {
    const start = Date.now();
    const waitTime = 100;

    rejectAfter(waitTime, (err, result) => {
      try {
        const diff = Date.now() - start;

        expect(err).toBeDefined();
        expect(err.message).toBe(`Rejected after ${waitTime}ms`);
        
        expect(result).toBeNull();
        
        expect(diff).toBeGreaterThanOrEqual(waitTime);
        
        done();
      } catch (error) {
        done(error);
      }
    });
  }, 300);
});