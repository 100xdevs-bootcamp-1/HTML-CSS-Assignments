const createWindowAggregatorPromise = require("../promises/medium/createWindowAggregatorPromise");

describe("createWindowAggregatorPromise", () => {
  test("processes batch immediately when size is reached", async () => {
    let results = [];
    const processor = async (b) => results.push(b);
    
    const { add } = createWindowAggregatorPromise(processor, 2, 1000);

    add(1);
    add(2); 

    expect(results.length).toBe(1);
    expect(results[0]).toEqual([1, 2]);
  });

  test("processes partial batch when time window expires", (done) => {
    let results = [];
    const processor = async (b) => {
      results.push(b);
      try {
        expect(results[0]).toEqual(["data"]);
        done();
      } catch (e) { done(e); }
    };

    const { add } = createWindowAggregatorPromise(processor, 10, 50);

    add("data");
  });

  test("ensures no ghost flushes happen if size trigger clears timer", async () => {
    let callCount = 0;
    const processor = async () => { callCount++; };
    
    const { add } = createWindowAggregatorPromise(processor, 2, 50);

    add(1);
    add(2); 
    
   
    await new Promise(r => setTimeout(r, 100));
    
    expect(callCount).toBe(1); 
  });
});