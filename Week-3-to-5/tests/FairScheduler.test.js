const FairScheduler = require("../promises/hard/FairScheduler");

describe("FairScheduler", () => {
  test("executes higher priority tasks first", async () => {
    const scheduler = new FairScheduler();
    const order = [];

    scheduler.schedule(async () => order.push("low"), 1);
    scheduler.schedule(async () => order.push("high"), 10);

    await scheduler.run();

    expect(order[0]).toBe("high");
    expect(order[1]).toBe("low");
  });

  test("prevents starvation using aging", async () => {
    jest.useFakeTimers();

    const scheduler = new FairScheduler(0.01);
    const order = [];

    scheduler.schedule(async () => order.push("old-low"), 1);

    jest.advanceTimersByTime(1000);

    scheduler.schedule(async () => order.push("new-high"), 10);

    await scheduler.run();

    expect(order[0]).toBe("old-low");

    jest.useRealTimers();
  });

  test("executes all scheduled tasks", async () => {
    const scheduler = new FairScheduler();
    const executed = [];

    scheduler.schedule(async () => executed.push(1), 1);
    scheduler.schedule(async () => executed.push(2), 2);
    scheduler.schedule(async () => executed.push(3), 3);

    await scheduler.run();

    expect(executed).toHaveLength(3);
  });

  test("handles async tasks correctly", async () => {
    const scheduler = new FairScheduler();
    const order = [];

    scheduler.schedule(
      async () => {
        await new Promise(r => setTimeout(r, 10));
        order.push("A");
      },
      1
    );

    scheduler.schedule(
      async () => {
        await new Promise(r => setTimeout(r, 5));
        order.push("B");
      },
      1
    );

    await scheduler.run();

    expect(order).toEqual(["A", "B"]);
  });
});
