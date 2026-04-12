const runDependentTasks = require("../promises/hard/runDependentTasks");

describe("Topological Task Runner (Kahn's Algorithm)", () => {
  
  test("executes tasks in correct dependency order", async () => {
    const executionOrder = [];
    
    const tasks = {
      A: async () => { executionOrder.push("A"); return "resA"; },
      B: async () => { executionOrder.push("B"); return "resB"; },
      C: async () => { executionOrder.push("C"); return "resC"; },
      D: async () => { executionOrder.push("D"); return "resD"; }
    };

    const dependencies = [
      ["B", "A"],
      ["C", "A"],
      ["D", "B"],
      ["D", "C"]
    ];

    const results = await runDependentTasks(tasks, dependencies);

    expect(results).toEqual({ A: "resA", B: "resB", C: "resC", D: "resD" });
    expect(executionOrder[0]).toBe("A");
    expect(executionOrder[3]).toBe("D");
    expect(executionOrder.slice(1, 3)).toContain("B");
    expect(executionOrder.slice(1, 3)).toContain("C");
  });

  test("runs independent tasks in parallel", async () => {
    const startTimes = {};
    
    const tasks = {
      T1: async () => { startTimes.T1 = Date.now(); await new Promise(r => setTimeout(r, 100)); },
      T2: async () => { startTimes.T2 = Date.now(); await new Promise(r => setTimeout(r, 100)); },
      T3: async () => { startTimes.T3 = Date.now(); await new Promise(r => setTimeout(r, 100)); }
    };

    await runDependentTasks(tasks, []);

    const diff12 = Math.abs(startTimes.T1 - startTimes.T2);
    const diff23 = Math.abs(startTimes.T2 - startTimes.T3);

    expect(diff12).toBeLessThan(20);
    expect(diff23).toBeLessThan(20);
  });

  test("throws an error when a cycle is detected", async () => {
    const tasks = {
      A: async () => "A",
      B: async () => "B",
      C: async () => "C"
    };

    const dependencies = [
      ["B", "A"],
      ["C", "B"],
      ["A", "C"]
    ];

    await expect(runDependentTasks(tasks, dependencies))
      .rejects
      .toThrow("Cycle detected in dependencies");
  });

  test("handles complex deep dependency chains", async () => {
    const tasks = {
      1: async () => 1,
      2: async () => 2,
      3: async () => 3,
      4: async () => 4
    };

    const dependencies = [
      ["3", "4"],
      ["2", "3"],
      ["1", "2"]
    ];

    const results = await runDependentTasks(tasks, dependencies);
    expect(results).toEqual({ 1: 1, 2: 2, 3: 3, 4: 4 });
  });
});