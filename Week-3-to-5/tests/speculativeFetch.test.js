const speculativeFetch = require("../promises/hard/speculativeFetch");

describe("Speculative Cache Warm-up", () => {
  beforeEach(() => {
    speculativeFetch.cache = new Map();
  });

  test("resolves from API immediately if fast", async () => {
    const apiFn = jest.fn(async () => "api_data");
    const diskFn = jest.fn(async () => "disk_data");

    const result = await speculativeFetch("user_1", apiFn, diskFn);

    expect(result).toBe("api_data");
    expect(diskFn).not.toHaveBeenCalled();
  });

  test("falls back to disk if API takes longer than 200ms", async () => {
    const apiFn = async () => {
      await new Promise(r => setTimeout(r, 400));
      return "api_data";
    };
    const diskFn = jest.fn(async () => "disk_data");

    const result = await speculativeFetch("user_2", apiFn, diskFn);

    expect(result).toBe("disk_data");
    expect(diskFn).toHaveBeenCalled();
  });

  test("api updates cache in background even if disk wins", async () => {
    let apiFinished = false;
    const apiFn = async (key) => {
      await new Promise(r => setTimeout(r, 300));
      apiFinished = true;
      return "fresh_api_data";
    };
    const diskFn = async () => "old_disk_data";

    await speculativeFetch("user_3", apiFn, diskFn);
    
    expect(speculativeFetch.cache.get("user_3")).toBeUndefined();

    await new Promise(r => setTimeout(r, 100));
    expect(speculativeFetch.cache.get("user_3")).toBe("fresh_api_data");
  });
});