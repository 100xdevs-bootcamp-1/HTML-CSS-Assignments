const runTaskGraph = require("../promises/hard/runTaskGraph");

describe("runTaskGraph", () => {
  test("executes tasks respecting dependencies", async () => {
    const tasks = [
      { id: "A", action: async () => 1 },
      { id: "B", action: async () => 2, dependencies: ["A"] },
      { id: "C", action: async () => 3, dependencies: ["A"] },
    ];

    const result = await runTaskGraph(tasks);
    expect(result.get("A")).toBe(1);
    expect(result.get("B")).toBe(2);
    expect(result.get("C")).toBe(3);
  });

  test("throws on circular dependency", async () => {
    const tasks = [
      { id: "A", action: async () => 1, dependencies: ["B"] },
      { id: "B", action: async () => 2, dependencies: ["A"] },
    ];

    await expect(runTaskGraph(tasks)).rejects.toThrow("Circular");
  });
});
