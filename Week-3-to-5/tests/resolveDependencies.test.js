const resolveDependencies = require("../promises/medium/resolveDependencies");

describe("Dependency Resolver (DAG)", () => {
  test("executes tasks in the correct order based on dependencies", async () => {
    const log = [];
    const tasks = {
      A: { fn: async () => { log.push("A"); return 1; } },
      B: { fn: async () => { log.push("B"); return 2; } },
      C: { 
        fn: async () => { log.push("C"); return 3; }, 
        deps: ["A", "B"] 
      }
    };

    const results = await resolveDependencies(tasks);

    expect(results).toEqual({ A: 1, B: 2, C: 3 });
    expect(log.indexOf("C")).toBeGreaterThan(log.indexOf("A"));
    expect(log.indexOf("C")).toBeGreaterThan(log.indexOf("B"));
  });

  test("runs independent tasks in parallel", async () => {
    const start = Date.now();
    const tasks = {
      A: { fn: async () => new Promise(r => setTimeout(() => r("A"), 100)) },
      B: { fn: async () => new Promise(r => setTimeout(() => r("B"), 100)) }
    };

    await resolveDependencies(tasks);
    const duration = Date.now() - start;

    expect(duration).toBeLessThan(150);
  });

  test("handles multi-level dependency chains", async () => {
    const log = [];
    const tasks = {
      A: { fn: async () => log.push("A") },
      B: { fn: async () => log.push("B"), deps: ["A"] },
      C: { fn: async () => log.push("C"), deps: ["B"] }
    };

    await resolveDependencies(tasks);
    expect(log).toEqual(["A", "B", "C"]);
  });
});