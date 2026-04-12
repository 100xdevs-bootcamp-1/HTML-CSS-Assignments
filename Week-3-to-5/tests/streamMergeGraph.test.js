const streamMergeGraph = require("../promises/hard/streamMergeGraph");

describe("Dependency-Aware Stream Merger", () => {
  test("processes tasks in order within concurrency limits", async () => {
    const tracker = [];
    let currentActive = 0;
    let maxObservedActive = 0;

    const createTask = (id, duration) => ({
      deps: [],
      action: async () => {
        currentActive++;
        maxObservedActive = Math.max(maxObservedActive, currentActive);
        await new Promise(r => setTimeout(r, duration));
        tracker.push(id);
        currentActive--;
        return `result-${id}`;
      }
    });

    const taskGraph = {
      A: createTask("A", 50),
      B: createTask("B", 50),
      C: {
        deps: ["A", "B"],
        action: async () => { 
            tracker.push("C"); 
            return "result-C"; 
        }
      }
    };

    await streamMergeGraph(taskGraph, 1);

    expect(tracker[2]).toBe("C");
    expect(maxObservedActive).toBe(1);
  });

  test("handles massive parallelism within limits", async () => {
      const taskGraph = {};
      for(let i=0; i<10; i++) {
          taskGraph[`task${i}`] = { deps: [], action: async () => i };
      }
      
      const results = await streamMergeGraph(taskGraph, 2);
      expect(Object.keys(results).length).toBe(10);
  });
});