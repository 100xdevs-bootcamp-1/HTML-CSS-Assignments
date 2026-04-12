const AsyncCache = require("../cpu-io/medium/AsyncCache");

const sleep = ms => new Promise(res => setTimeout(res, ms));

describe("AsyncCache", () => {
  test("fetches and caches value on first get", async () => {
    const cache = new AsyncCache(50);
    const fetcher = jest.fn(async () => "data");

    const result = await cache.get("key1", fetcher);

    expect(result).toBe("data");
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  test("returns cached value on subsequent gets within TTL", async () => {
    const cache = new AsyncCache(50);
    const fetcher = jest.fn(async () => "data");

    await cache.get("key1", fetcher);
    const result = await cache.get("key1", fetcher);

    expect(result).toBe("data");
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  test("re-fetches value after TTL expires", async () => {
    const cache = new AsyncCache(30);
    const fetcher = jest
      .fn()
      .mockResolvedValueOnce("first")
      .mockResolvedValueOnce("second");

    const first = await cache.get("key1", fetcher);
    await sleep(40); 
    const second = await cache.get("key1", fetcher);

    expect(first).toBe("first");
    expect(second).toBe("second");
    expect(fetcher).toHaveBeenCalledTimes(2);
  });

  test("does not cache failed fetches", async () => {
    const cache = new AsyncCache(50);
    const fetcher = jest
      .fn()
      .mockRejectedValueOnce(new Error("boom"))
      .mockResolvedValueOnce("ok");

    await expect(cache.get("key1", fetcher)).rejects.toThrow("boom");

    const result = await cache.get("key1", fetcher);
    expect(result).toBe("ok");
    expect(fetcher).toHaveBeenCalledTimes(2);
  });

  test("handles multiple keys independently", async () => {
    const cache = new AsyncCache(50);
    const fetcher = jest.fn(async key => `data-${key}`);

    const a = await cache.get("a", () => fetcher("a"));
    const b = await cache.get("b", () => fetcher("b"));

    expect(a).toBe("data-a");
    expect(b).toBe("data-b");
    expect(fetcher).toHaveBeenCalledTimes(2);
  });
});
