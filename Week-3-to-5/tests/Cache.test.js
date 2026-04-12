const Cache = require("../promises/hard/Cache");

describe("Cache", () => {
  test("deduplicates concurrent fetches", async () => {
    const cache = new Cache(1000);
    let calls = 0;

    const fetcher = async () => {
      calls++;
      return "data";
    };

    await Promise.all([
      cache.get("key", fetcher),
      cache.get("key", fetcher),
    ]);

    expect(calls).toBe(1);
  });
});
