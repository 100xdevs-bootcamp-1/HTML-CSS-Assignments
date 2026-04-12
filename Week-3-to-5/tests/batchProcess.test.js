const batchProcess = require("../callbacks/medium/batchProcess");

describe("batchProcess", () => {
  
  test("Order Preservation: Result indices should match input indices", (done) => {
   
    const items = [100, 50, 10];
    const worker = (delay, cb) => setTimeout(() => cb(null, `Finished ${delay}`), delay);

    batchProcess(items, 2, worker, (err, results) => {
      try {
        expect(err).toBeNull();
        expect(results).toEqual(["Finished 100", "Finished 50", "Finished 10"]);
        done();
      } catch (e) { done(e); }
    });
  });

  test("Concurrency Limit: Should never have more than 'limit' tasks running", (done) => {
    const items = [20, 20, 20, 20, 20];
    let runningCounter = 0;
    let maxObserved = 0;

    const worker = (item, cb) => {
      runningCounter++;
      maxObserved = Math.max(maxObserved, runningCounter);
      
      setTimeout(() => {
        runningCounter--;
        cb(null, item);
      }, 10);
    };

    batchProcess(items, 2, worker, (err, results) => {
      try {
        expect(maxObserved).toBeLessThanOrEqual(2);
        expect(results.length).toBe(5);
        done();
      } catch (e) { done(e); }
    });
  });

  test("Error Handling: Should stop and return error if any task fails", (done) => {
    const items = ["ok", "fail", "ok"];
    const worker = (item, cb) => {
      if (item === "fail") return setTimeout(() => cb(new Error("Boom")), 10);
      setTimeout(() => cb(null, "success"), 20);
    };

    batchProcess(items, 2, worker, (err, results) => {
      try {
        expect(err).toBeDefined();
        expect(err.message).toBe("Boom");
        done();
      } catch (e) { done(e); }
    });
  });

  test("Empty Array: Should handle empty inputs gracefully", (done) => {
    batchProcess([], 5, (item, cb) => cb(), (err, results) => {
      expect(results).toEqual([]);
      done();
    });
  });
});