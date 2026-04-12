const createWindowAggregator = require("../callbacks/hard/createWindowAggregator");

describe("Sliding Window Aggregator", () => {
  test("calculates moving average correctly", (done) => {
    const results = [];
    
    const onWindowReady = (avg) => {
      results.push(avg);
      if (results.length === 4) {
        try {
          expect(results).toEqual([1, 1.5, 2, 5]);
          done();
        } catch (e) { done(e); }
      }
    };

    const add = createWindowAggregator(3, onWindowReady);

    add(1);
    add(2);
    add(3);
    add(10);
  });
});