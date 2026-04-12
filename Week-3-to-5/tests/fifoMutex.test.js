const Mutex = require("../callbacks/hard/fifoMutex");

describe("Fair Mutex", () => {
  test("should execute tasks in FIFO order and serialize them", (done) => {
    const mutex = new Mutex();
    const results = [];

    mutex.lock(
      (cb) => setTimeout(() => cb(null, "TASK_A"), 50),
      (err, data) => {
        results.push(data);
      }
    );

    mutex.lock(
      (cb) => setTimeout(() => cb(null, "TASK_B"), 10),
      (err, data) => {
        results.push(data);
        
        try {
          expect(results).toEqual(["TASK_A", "TASK_B"]);
          done();
        } catch (e) {
          done(e);
        }
      }
    );
  });

  test("should handle tasks that fail without breaking the queue", (done) => {
    const mutex = new Mutex();
    
    mutex.lock(
      (cb) => setTimeout(() => cb(new Error("A_FAILED")), 10),
      (err) => {
        expect(err.message).toBe("A_FAILED");
      }
    );

    mutex.lock(
      (cb) => setTimeout(() => cb(null, "B_SUCCESS"), 10),
      (err, data) => {
        expect(data).toBe("B_SUCCESS");
        done();
      }
    );
  });
});