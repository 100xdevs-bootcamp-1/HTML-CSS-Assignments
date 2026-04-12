const eventLoopRace = require("../cpu-io/easy/eventLoopRace");

describe("eventLoopRace", () => {
  test("logs messages in correct event loop order", (done) => {
    const logs = [];
    const originalLog = console.log;

    console.log = (msg) => logs.push(msg);

    eventLoopRace();

    setTimeout(() => {
      expect(logs).toEqual([
        "1: Synchronous",
        "4: Synchronous",
        "3: Microtask (Promise)",
        "2: Macrotask (I/O)",
      ]);

      console.log = originalLog;
      done();
    }, 10);
  });
});
