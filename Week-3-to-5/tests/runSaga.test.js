const runSaga = require("../promises/hard/runSaga");

describe("Atomic Multi-Stage Saga", () => {
  test("successfully completes all stages", async () => {
    const steps = [];
    const stages = [
      { action: async () => steps.push("A"), undo: async () => steps.push("undoA") },
      { action: async () => steps.push("B"), undo: async () => steps.push("undoB") }
    ];

    await runSaga(stages);
    expect(steps).toEqual(["A", "B"]);
  });

  test("rolls back in reverse order on failure", async () => {
    const steps = [];
    const stages = [
      { action: async () => steps.push("A"), undo: async () => steps.push("undoA") },
      { action: async () => steps.push("B"), undo: async () => steps.push("undoB") },
      { 
        action: async () => { throw new Error("Fail"); }, 
        undo: async () => steps.push("undoC") 
      }
    ];

    await expect(runSaga(stages)).rejects.toThrow("Fail");
    expect(steps).toEqual(["A", "B", "undoB", "undoA"]);
  });

  test("throws Critical Failure if undo fails", async () => {
    const stages = [
      { 
        action: async () => {}, 
        undo: async () => { throw new Error("Undo Failed"); } 
      },
      { 
        action: async () => { throw new Error("Primary Action Failed"); }, 
        undo: async () => {} 
      }
    ];

    await expect(runSaga(stages))
      .rejects
      .toThrow(/Critical Failure: Primary Action Failed | Undo Error: Undo Failed/);
  });
});