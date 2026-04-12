const chunkedProcessor = require("../cpu-io/medium/chunkedProcessor");

describe("chunkedProcessor", () => {
  test("should process all items in the array", (done) => {
    const items = [1, 2, 3, 4, 5];
    const processed = [];

    chunkedProcessor(items, (item) => processed.push(item), () => {
      try {
        expect(processed).toEqual([1, 2, 3, 4, 5]);
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  test("should not block the event loop (yields control)", (done) => {
    const items = new Array(50000).fill(0); 
    let heartbeatCount = 0;

    const interval = setInterval(() => {
      heartbeatCount++;
    }, 1); 

    chunkedProcessor(items, (item) => {
      for(let i = 0; i < 1000; i++) { 
        Math.sqrt(i); 
      }
    }, () => {
      clearInterval(interval);
      try {
        expect(heartbeatCount).toBeGreaterThan(0);
        done();
      } catch (error) {
        done(error);
      }
    });
  }, 10000); 

  test("should handle an empty array", (done) => {
    chunkedProcessor([], (item) => {}, () => {
      done();
    });
  });
});