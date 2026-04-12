const TimeSlicedScheduler = require("../callbacks/hard/TimeSlicedScheduler");

describe("TimeSlicedScheduler", () => {
  test("executes all scheduled tasks in order", async () => {
    const scheduler = new TimeSlicedScheduler();
    const order = [];

    scheduler.schedule(async () => order.push(1));
    scheduler.schedule(async () => order.push(2));
    scheduler.schedule(async () => order.push(3));

    await scheduler.run();

    expect(order).toEqual([1, 2, 3]);
  });

  test("yields control between tasks", async () => {
    const scheduler = new TimeSlicedScheduler();
    const events = [];

    scheduler.schedule(async () => {
      events.push("task-1");
    });

    scheduler.schedule(async () => {
      events.push("task-2");
    });

    const runPromise = scheduler.run();

    await new Promise(r => setTimeout(r, 0));
    events.push("event-loop");

    await runPromise;

    expect(events).toEqual([
      "task-1",
      "event-loop",
      "task-2",
    ]);
  });

  test("handles async tasks correctly", async () => {
    const scheduler = new TimeSlicedScheduler();
    const order = [];

    scheduler.schedule(async () => {
      await new Promise(r => setTimeout(r, 20));
      order.push("A");
    });

    scheduler.schedule(async () => {
      await new Promise(r => setTimeout(r, 10));
      order.push("B");
    });

    await scheduler.run();

    expect(order).toEqual(["A", "B"]);
  });

  test("does not block the event loop for synchronous tasks", async () => {
    const scheduler = new TimeSlicedScheduler();
    const events = [];

    scheduler.schedule(async () => {
      events.push("task");
    });

    const promise = scheduler.run();
    events.push("sync-code");

    await promise;

    expect(events).toEqual(["task", "sync-code"]);
  });
});
