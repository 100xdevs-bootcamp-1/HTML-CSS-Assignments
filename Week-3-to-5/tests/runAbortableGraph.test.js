const runAbortableGraph = require("../promises/hard/runAbortableGraph");

describe("Cancellable Dependency Graph", () => {
  test("runs tasks in order and respects abort signal", async () => {
    const controller = new AbortController();
    const tracker = [];

    const tasks = {
      prep: { deps: [], fn: async () => { tracker.push("prep"); return "ready"; } },
      work: { 
        deps: ["prep"], 
        fn: async (signal) => { 
          await new Promise(r => setTimeout(r, 100));
          if (signal.aborted) return;
          tracker.push("work");
          return "done";
        } 
      },
      cleanup: { deps: ["work"], fn: async () => { tracker.push("cleanup"); return "clean"; } }
    };

    const runPromise = runAbortableGraph(tasks, controller.signal);

    setTimeout(() => controller.abort(), 50);

    await expect(runPromise).rejects.toThrow("AbortError");
    expect(tracker).toContain("prep");
    expect(tracker).not.toContain("cleanup");
  });
});