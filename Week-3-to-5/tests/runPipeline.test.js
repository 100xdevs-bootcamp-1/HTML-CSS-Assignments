const runPipeline = require("../promises/hard/runPipeline");

describe("runPipeline", () => {
  test("aborts pipeline immediately", async () => {
    const controller = new AbortController();

    const fns = [
      async () => {},
      async () => {
        controller.abort();
        await new Promise(r => setTimeout(r, 100));
      },
      async () => {},
    ];

    await expect(
      runPipeline(fns, controller.signal)
    ).rejects.toThrow("Abort");
  });
});
