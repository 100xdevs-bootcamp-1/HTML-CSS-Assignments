const monitorPromise = require("../promises/medium/monitorPromise");

describe("Hanging Promise Detector", () => {
  test("does NOT call onHang if promise resolves quickly", async () => {
    let hung = false;
    const onHang = () => { hung = true; };
    
    const fastPromise = new Promise(r => setTimeout(() => r("done"), 50));
    
    const result = await monitorPromise(fastPromise, onHang, 100);
    
    expect(result).toBe("done");
    expect(hung).toBe(false);
  });

  test("calls onHang if promise takes too long", async () => {
    let hung = false;
    const onHang = () => { hung = true; };
    
    const slowPromise = new Promise(r => setTimeout(() => r("slow"), 150));
    
    const monitored = monitorPromise(slowPromise, onHang, 50);

    await new Promise(r => setTimeout(r, 70));
    
    expect(hung).toBe(true);
    
    const result = await monitored;
    expect(result).toBe("slow");
  });

  test("clears timer on rejection to prevent memory leaks", async () => {
    let hung = false;
    const onHang = () => { hung = true; };
    
    const failingPromise = new Promise((_, reject) => setTimeout(() => reject("fail"), 20));

    try {
      await monitorPromise(failingPromise, onHang, 100);
    } catch (e) {
      expect(e).toBe("fail");
    }

    await new Promise(r => setTimeout(r, 150));
    expect(hung).toBe(false);
  });
});