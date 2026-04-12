const circuitHedgedFetch = require("../promises/hard/circuitHedgedFetch");

describe("Hedged Circuit Breaker", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  test("triggers backup fetch if primary is slow", async () => {
    fetch.mockImplementation(() => 
      new Promise(resolve => setTimeout(() => 
        resolve({ ok: true, json: () => Promise.resolve("Data") }), 300))
    );

    const result = await circuitHedgedFetch("http://api.test");
    
    expect(result).toBe("Data");
    expect(fetch).toHaveBeenCalledTimes(2); 
  });

  test("returns stale cache if circuit is OPEN", async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve("Good") });
    await circuitHedgedFetch("http://api.test");

    fetch.mockRejectedValue(new Error("Fail"));
    for(let i=0; i<3; i++) {
        try { await circuitHedgedFetch("http://api.test"); } catch(e) {}
    }

    fetch.mockClear();
    const result = await circuitHedgedFetch("http://api.test");
    
    expect(result).toBe("Good");
    expect(fetch).not.toHaveBeenCalled();
  });
});