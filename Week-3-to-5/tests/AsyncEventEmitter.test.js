const AsyncEventEmitter = require("../promises/medium/AsyncEventEmitter");

describe("AsyncEventEmitter", () => {
  test("resolves only after all async listeners finish", async () => {
    const emitter = new AsyncEventEmitter();
    let counter = 0;

    emitter.on("test", async () => {
      await new Promise(r => setTimeout(r, 50));
      counter++;
    });

    emitter.on("test", async () => {
      await new Promise(r => setTimeout(r, 10));
      counter++;
    });

    const results = await emitter.emit("test");
    
    expect(counter).toBe(2);
    expect(results.length).toBe(2);
    expect(results[0].status).toBe("fulfilled");
  });

  test("handles listener failures gracefully using allSettled", async () => {
    const emitter = new AsyncEventEmitter();
    
    emitter.on("error-event", async () => {
      throw new Error("Boom");
    });

    emitter.on("error-event", async () => {
      return "Success";
    });

    const results = await emitter.emit("error-event");

    expect(results[0].status).toBe("rejected");
    expect(results[0].reason.message).toBe("Boom");
    expect(results[1].status).toBe("fulfilled");
    expect(results[1].value).toBe("Success");
  });

  test("does nothing if event has no listeners", async () => {
    const emitter = new AsyncEventEmitter();
    const results = await emitter.emit("non-existent");
    expect(results).toEqual([]);
  });
});