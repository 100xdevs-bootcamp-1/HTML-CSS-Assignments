const chunkedAsyncReduce = require("../promises/hard/chunkedAsyncReduce");

describe("Non-Blocking Heavy Reducer", () => {
  test("correctly reduces a large array", async () => {
    const data = Array.from({ length: 1000 }, (_, i) => i + 1); 
    const sumFn = (acc, val) => acc + val;
    
    const result = await chunkedAsyncReduce(data, sumFn, 100);
    expect(result).toBe(500500);
  });

  test("does not block the event loop (simulated check)", async () => {
    const data = Array.from({ length: 100000 }, (_, i) => i);
    let eventLoopBlocked = true;
  
    const timer = setTimeout(() => {
      eventLoopBlocked = false;
    }, 1);
  
    await chunkedAsyncReduce(data, (acc, val) => acc + (val % 2), 200);
    
    clearTimeout(timer);
    expect(eventLoopBlocked).toBe(false);
  });

  test("handles chunk sizes larger than the data length", async () => {
    const data = [1, 2, 3];
    const result = await chunkedAsyncReduce(data, (acc, val) => acc + val, 10);
    expect(result).toBe(6);
  });
});