const DynamicPriorityQueue = require("../callbacks/medium/DynamicPriorityQueue");

describe("DynamicPriorityQueue callback", () => {
  test("executes tasks based on priority order", (done) => {
    const pq = new DynamicPriorityQueue(1); 
    const results = [];

    const checkDone = () => {
      if (results.length === 3) {
        try {
          expect(results).toEqual(["first", "high", "low"]);
          done();
        } catch (e) { done(e); }
      }
    };

    pq.add((cb) => setTimeout(() => cb(null, "first"), 50), 0, (err, res) => {
      results.push(res);
      checkDone();
    });

    pq.add((cb) => setTimeout(() => cb(null, "low"), 10), 0, (err, res) => {
      results.push(res);
      checkDone();
    });

    pq.add((cb) => setTimeout(() => cb(null, "high"), 10), 10, (err, res) => {
      results.push(res);
      checkDone();
    });
  });
});