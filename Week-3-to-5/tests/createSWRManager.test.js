const createSWRManager = require("../promises/hard/createSWRManager");

describe("SWR Flight Tracker Manager", () => {
  test("returns cached data immediately while refreshing in background", async () => {
    let callCount = 0;
    const fetcher = async () => {
      callCount++;
      return `Flight Data V${callCount}`;
    };

    const manager = createSWRManager(fetcher, 100);

    const res1 = await manager.get("AI-101");
    expect(res1).toBe("Flight Data V1");

    const res2 = await manager.get("AI-101");
    expect(res2).toBe("Flight Data V1");
    expect(callCount).toBe(1);

    await new Promise(r => setTimeout(r, 110));

    const res3 = await manager.get("AI-101");
    expect(res3).toBe("Flight Data V1");

    await new Promise(r => setTimeout(r, 10));
    
    const res4 = await manager.get("AI-101");
    expect(res4).toBe("Flight Data V2");
  });

  test("deduplicates multiple concurrent refreshes", async () => {
    const fetcher = jest.fn().mockImplementation((key) => 
      new Promise(r => setTimeout(() => r(`Fresh ${key}`), 50))
    );
    const manager = createSWRManager(fetcher, 0); 

    await manager.get("XY-202"); 
    expect(fetcher).toHaveBeenCalledTimes(1);

    await Promise.all([
      manager.get("XY-202"),
      manager.get("XY-202"),
      manager.get("XY-202")
    ]);

    expect(fetcher).toHaveBeenCalledTimes(2);
  });
});