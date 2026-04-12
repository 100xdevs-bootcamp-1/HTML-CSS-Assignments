const retryOnce = require("../callbacks/easy/retryOnce");

describe("retryOnce callback", () => {
  test("retries once after failure and then succeeds", (done) => {
    let calls = 0;

    const fn = (cb) => {
      calls++;
      if (calls === 1) {
        cb("fail", null);
      } else {
        cb(null, "success");
      }
    };

    const wrapped = retryOnce(fn);

    wrapped((err, result) => {
      try {
        expect(result).toBe("success");
        expect(err).toBeNull();
        expect(calls).toBe(2);
        done();
      } catch (e) {
        done(e);
      }
    });
  });

  test("returns error if both attempts fail", (done) => {
    let calls = 0;

    const fn = (cb) => {
      calls++;
      cb("error", null);
    };

    const wrapped = retryOnce(fn);

    wrapped((err, result) => {
      try {
        expect(err).toBe("error");
        expect(result).toBeNull();
        expect(calls).toBe(2);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});