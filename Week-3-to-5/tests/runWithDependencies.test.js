const runWithDependencies = require("../callbacks/medium/runWithDependencies");

describe("runWithDependencies callback", () => {
  test("runs tasks in correct order based on dependencies", (done) => {
    const tasks = [
      { id: "A", deps: ["B"], run: (cb) => setTimeout(() => cb(null, "ResultA"), 10) },
      { id: "B", deps: [],    run: (cb) => setTimeout(() => cb(null, "ResultB"), 50) }
    ];

    runWithDependencies(tasks, (err, results) => {
      try {
        expect(err).toBeNull();
        expect(results.A).toBe("ResultA");
        expect(results.B).toBe("ResultB");
        done();
      } catch (e) { done(e); }
    });
  });
});