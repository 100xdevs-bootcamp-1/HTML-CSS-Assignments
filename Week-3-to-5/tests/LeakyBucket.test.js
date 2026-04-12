const LeakyBucket = require("../callbacks/hard/LeakyBucket");

describe("LeakyBucket Callback", () => {
  test("processes tasks in FIFO order", (done) => {
    const bucket = new LeakyBucket(5, 10);
    const results = [];
    let completed = 0;

    const checkDone = () => {
      completed++;
      if (completed === 3) {
        try {
          expect(results).toEqual([1, 2, 3]);
          done();
        } catch (e) { done(e); }
      }
    };

    const task = (val, cb) => {
      results.push(val);
      cb(null, val);
    };

    bucket.add((cb) => task(1, cb), (err, res) => checkDone());
    bucket.add((cb) => task(2, cb), (err, res) => checkDone());
    bucket.add((cb) => task(3, cb), (err, res) => checkDone());
  });

  test("enforces leak rate between task executions", (done) => {
    const bucket = new LeakyBucket(5, 50);
    const timestamps = [];
    let completed = 0;

    const checkDone = () => {
      completed++;
      if (completed === 3) {
        try {
          expect(timestamps[1] - timestamps[0]).toBeGreaterThanOrEqual(45);
          expect(timestamps[2] - timestamps[1]).toBeGreaterThanOrEqual(45);
          done();
        } catch (e) { done(e); }
      }
    };

    const task = (cb) => {
      timestamps.push(Date.now());
      cb(null);
    };

    bucket.add(task, checkDone);
    bucket.add(task, checkDone);
    bucket.add(task, checkDone);
  }, 1000);

  test("rejects immediately when bucket capacity is exceeded", (done) => {
    const bucket = new LeakyBucket(1, 50);

    const slowTask = (cb) => setTimeout(() => cb(null), 100);

    bucket.add(slowTask, () => {});

    bucket.add(slowTask, (err) => {
      try {
        expect(err).toBeDefined();
        expect(err.message).toBe("Rate Limit Exceeded");
        done();
      } catch (e) { done(e); }
    });
  });

  test("continues processing even if a task fails", (done) => {
    const bucket = new LeakyBucket(5, 10);
    const results = [];
    let completed = 0;

    const checkDone = () => {
      completed++;
      if (completed === 3) {
        try {
          expect(results).toEqual(["ok", "ok"]);
          done();
        } catch (e) { done(e); }
      }
    };

    bucket.add((cb) => cb(null, "ok"), (err, res) => {
      if (res) results.push(res);
      checkDone();
    });

    bucket.add((cb) => cb(new Error("fail")), (err) => {
      try {
        expect(err.message).toBe("fail");
        checkDone();
      } catch (e) { done(e); }
    });

    bucket.add((cb) => cb(null, "ok"), (err, res) => {
      if (res) results.push(res);
      checkDone();
    });
  });
});