const once = require("../callbacks/easy/once");

describe("once callback", () => {
  test("calls the async function only once", (done) => {
    let callCount = 0;
    const fn = (x, cb) => {
      callCount++;
      setTimeout(() => cb(null, x * 2), 10);
    };

    const onceFn = once(fn);

    onceFn(2, (err, r1) => {
      onceFn(10, (err, r2) => {
        try {
          expect(callCount).toBe(1);
          expect(r1).toBe(4);
          expect(r2).toBe(4); 
          done();
        } catch (e) { done(e); }
      });
    });
  });

  test("handles concurrent calls", (done) => {
    let callCount = 0;
    const fn = (cb) => {
      callCount++;
      setTimeout(() => cb(null, "done"), 50);
    };

    const onceFn = once(fn);
    let completed = 0;

    const check = (err, res) => {
      completed++;
      if (completed === 2) {
        try {
          expect(callCount).toBe(1);
          done();
        } catch (e) { done(e); }
      }
    };

    onceFn(check);
    onceFn(check);
  });
});