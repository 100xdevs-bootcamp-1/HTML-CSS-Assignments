const Scheduler = require("../callbacks/hard/Scheduler");

describe("Scheduler callback", () => {
  test("executes tasks in priority order and signals completion", (done) => {
    const scheduler = new Scheduler();
    const results = [];

    const createTask = (val) => (cb) => {
      results.push(val);
      cb(null);
    };

    scheduler.schedule(createTask("low"), 0);
    scheduler.schedule(createTask("high"), 10);
    scheduler.schedule(createTask("medium"), 5);

    scheduler.run((err) => {
      try {
        expect(err).toBeNull();
        expect(results).toEqual(["high", "medium", "low"]);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});