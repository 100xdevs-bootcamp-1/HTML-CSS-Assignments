const circuitBreaker = require("../promises/hard/circuitBreaker");

describe("Circuit Breaker Promise Wrapper", () => {
  test("works normally in CLOSED state", async () => {
    const fn = jest.fn().mockResolvedValue("Success");
    const breaker = circuitBreaker(fn, 2, 100);

    const result = await breaker();
    expect(result).toBe("Success");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test("opens after reaching the failure threshold", async () => {
    const fn = jest.fn().mockRejectedValue(new Error("Fail"));
    const breaker = circuitBreaker(fn, 2, 100);

    await expect(breaker()).rejects.toThrow("Fail");
    await expect(breaker()).rejects.toThrow("Fail");

    await expect(breaker()).rejects.toThrow("Circuit is OPEN");
    expect(fn).toHaveBeenCalledTimes(2);
  });

  test("recovers after resetTimeout (HALF-OPEN to CLOSED)", async () => {
    const fn = jest.fn()
      .mockRejectedValueOnce(new Error("Fail")) 
      .mockResolvedValue("Recovered");          

    const breaker = circuitBreaker(fn, 1, 50);

    await expect(breaker()).rejects.toThrow("Fail");
    
    await expect(breaker()).rejects.toThrow("Circuit is OPEN");

    await new Promise(r => setTimeout(r, 60));

    const result = await breaker();
    expect(result).toBe("Recovered");
    
    const result2 = await breaker();
    expect(result2).toBe("Recovered");
    expect(fn).toHaveBeenCalledTimes(3); 
  });
});