const mapLimit = require("../callbacks/hard/mapLimit");

describe("mapLimit Callback", () => {
  test("limits concurrency and preserves order", (done) => {
    const tasks = [
      (cb) => setTimeout(() => cb(null, "A"), 50),
      (cb) => setTimeout(() => cb(null, "B"), 10),
      (cb) => setTimeout(() => cb(null, "C"), 30),
    ];

    let maxRunning = 0;
    let currentlyRunning = 0;

    const trackedTasks = tasks.map(task => (cb) => {
      currentlyRunning++;
      maxRunning = Math.max(maxRunning, currentlyRunning);
      
      task((err, data) => {
        currentlyRunning--;
        cb(err, data);
      });
    });

    mapLimit(trackedTasks, 2, (err, results) => {
      try {
        expect(err).toBeNull();
        expect(results).toEqual(["A", "B", "C"]);
        expect(maxRunning).toBeLessThanOrEqual(2);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});