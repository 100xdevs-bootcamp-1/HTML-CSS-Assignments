const createSmartDebounce = require("../callbacks/hard/createSmartDebounce");

describe("Smart Debounce", () => {
  test("ignores out-of-order results from older requests", (done) => {
    const worker = (input, cb) => {
      const delay = input === "first" ? 100 : 20;
      setTimeout(() => cb(null, input), delay);
    };

    const debounced = createSmartDebounce(worker, 50);
    const results = [];

    debounced("first", (err, data) => {
      results.push(data);
    });

    setTimeout(() => {
      debounced("second", (err, data) => {
        results.push(data);
        
        try {
          expect(results).toEqual(["second"]);
          expect(results).not.toContain("first");
          done();
        } catch (e) { done(e); }
      });
    }, 60); 
  });
});