const createResumableMapper = require("../promises/hard/createResumableMapper");

describe("Resumable Async Map", () => {
  test("processes tasks with concurrency limit and pauses/resumes", async () => {
    const tasks = Array.from({ length: 6 }, (_, i) => async () => {
      await new Promise(r => setTimeout(r, 50));
      return i;
    });

    const mapper = createResumableMapper(tasks, 2);

    const finishPromise = mapper.start();
    
    await new Promise(r => setTimeout(r, 75));
    mapper.pause();
    
    const status = mapper.getStatus();
    
    expect(status.completed).toBe(2);
    expect(status.running).toBe(2);

    mapper.start();
    const results = await finishPromise;

    expect(results).toEqual([0, 1, 2, 3, 4, 5]);
    expect(mapper.getStatus().completed).toBe(6);
  });
});