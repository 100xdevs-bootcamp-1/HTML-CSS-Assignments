const swrCache = require("../promises/medium/swrCache");

describe("SWR Cache", () => {
  beforeEach(() => {
  });
  test("handles revalidation failure without crashing the process", async () => {
    const fetchFn = jest.fn()
      .mockResolvedValueOnce("Stale")
      .mockRejectedValueOnce(new Error("Network Fail"));
  
    await swrCache("fail_key", fetchFn);
  
    const result = await swrCache("fail_key", fetchFn);
    expect(result).toBe("Stale");
  
    await new Promise(r => setTimeout(r, 10));
    
    expect(fetchFn).toHaveBeenCalledTimes(2);
  });

  test("returns fresh data and populates cache on first call", async () => {
    const fetchFn = jest.fn().mockResolvedValue("Fresh Data");
    
    const result = await swrCache("user_1", fetchFn);
    
    expect(result).toBe("Fresh Data");
    expect(fetchFn).toHaveBeenCalledTimes(1);
  });

  test("returns stale data immediately but triggers a refresh", async () => {
    const fetchFn = jest.fn()
      .mockResolvedValueOnce("Initial")
      .mockResolvedValueOnce("Updated");

    await swrCache("key", fetchFn);

    const result = await swrCache("key", fetchFn);

    expect(result).toBe("Initial");
    
    await new Promise(r => setTimeout(r, 0));
    expect(fetchFn).toHaveBeenCalledTimes(2);
  });

  test("handles revalidation failure without crashing the stale return", async () => {
    const fetchFn = jest.fn()
      .mockResolvedValueOnce("Stale")
      .mockRejectedValueOnce(new Error("Network Fail"));

    await swrCache("fail_key", fetchFn);

    const result = await swrCache("fail_key", fetchFn);
    expect(result).toBe("Stale");
  });
});