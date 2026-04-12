const callbackify = require("../callbacks/easy/callbackify");

describe("callbackify", () => {
  test("resolves with data when the promise succeeds", (done) => {
    const promiseFn = (a, b) => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(a + b), 10);
      });
    };

    const cbFn = callbackify(promiseFn);

    cbFn(2, 3, (err, result) => {
      try {
        expect(err).toBeNull();
        expect(result).toBe(5);
        done();
      } catch (e) {
        done(e);
      }
    });
  });

  test("rejects when the promise fails", (done) => {
    const promiseFn = () => Promise.reject("error message");
    
    const cbFn = callbackify(promiseFn);

    cbFn((err, result) => {
      try {
        expect(err).toBe("error message");
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});