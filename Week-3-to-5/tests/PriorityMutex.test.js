const PriorityMutex = require("../promises/hard/PriorityMutex");

describe("Preemptive Priority Mutex", () => {
  test("high priority tasks jump ahead of low priority", async () => {
    const mutex = new PriorityMutex();
    const order = [];

    const task = (name, delay) => async () => {
      await new Promise(r => setTimeout(r, delay));
      order.push(name);
    };

    const p1 = mutex.lock(task("T1", 100), 1);
    
    const p2 = mutex.lock(task("T2", 10), 1); 
    const p3 = mutex.lock(task("T3", 10), 10); 

    await Promise.all([p1, p2, p3]);

    expect(order).toEqual(["T1", "T3", "T2"]);
  });

  test("priority aging prevents starvation", async () => {
    const mutex = new PriorityMutex();
    const order = [];
    
    const task = (name) => async () => { order.push(name); };

    const pLow = mutex.lock(async () => {
        await new Promise(r => setTimeout(r, 100)); // Hold lock
    }, 1);

    const pStarve = mutex.lock(task("Starve"), 1);

    const originalNow = Date.now;
    Date.now = () => originalNow() + 6000;

    const pHigh = mutex.lock(task("High"), 2);

    await Promise.all([pLow, pStarve, pHigh]);

  
    expect(order[0]).toBe("Starve");
    
    Date.now = originalNow; 
  });
});