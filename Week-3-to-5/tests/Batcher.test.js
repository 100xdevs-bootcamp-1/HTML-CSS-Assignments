const createBatcher = require("../promises/medium/createBatcher");

describe("Async Batch Processor", () => {
  test("triggers when maxBatchSize is reached", async () => {
    let processedBatches = [];
    const processor = async (batch) => processedBatches.push(batch);
    
    const { add } = createBatcher(processor, 3, 1000);

    add(1);
    add(2);
    expect(processedBatches.length).toBe(0);

    add(3); 
    expect(processedBatches.length).toBe(1);
    expect(processedBatches[0]).toEqual([1, 2, 3]);
  });

  test("triggers when maxWaitMs expires", (done) => {
    let processedBatches = [];
    const processor = async (batch) => {
      processedBatches.push(batch);
      try {
        expect(processedBatches[0]).toEqual(["A", "B"]);
        done();
      } catch (e) { done(e); }
    };

    const { add } = createBatcher(processor, 10, 50);

    add("A");
    add("B");
    expect(processedBatches.length).toBe(0);
  });

  test("resets timer and buffer correctly after processing", async () => {
    let callCount = 0;
    const processor = async () => { callCount++; };
    
    const { add } = createBatcher(processor, 2, 50);

    add(1);
    add(2); 
    
    await new Promise(r => setTimeout(r, 100)); 
    
    add(3);
    await new Promise(r => setTimeout(r, 100)); 
    
    expect(callCount).toBe(2);
  });
});