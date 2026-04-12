const deduplicatedFetch = require("../cpu-io/medium/deduplicatedFetch");

const sleep = ms => new Promise(res => setTimeout(res, ms));

describe("deduplicatedFetch", () => {
  test("deduplicates simultaneous calls with same id", async () => {
    const apiCall = jest.fn(async (id) => {
      await sleep(20);
      return `data-${id}`;
    });

    const promises = [
      deduplicatedFetch("id-1", apiCall),
      deduplicatedFetch("id-1", apiCall),
      deduplicatedFetch("id-1", apiCall),
    ];

    const results = await Promise.all(promises);

    expect(apiCall).toHaveBeenCalledTimes(1);
    expect(results).toEqual(["data-id-1", "data-id-1", "data-id-1"]);
  });

  test("does not deduplicate different ids", async () => {
    const apiCall = jest.fn(async (id) => `data-${id}`);

    const results = await Promise.all([
      deduplicatedFetch("id-1", apiCall),
      deduplicatedFetch("id-2", apiCall),
    ]);

    expect(apiCall).toHaveBeenCalledTimes(2);
    expect(results).toEqual(["data-id-1", "data-id-2"]);
  });

  test("cleans up after successful resolution", async () => {
    const apiCall = jest.fn(async () => "ok");

    await deduplicatedFetch("id-1", apiCall);
    await deduplicatedFetch("id-1", apiCall);

    expect(apiCall).toHaveBeenCalledTimes(2); 
  });

  test("cleans up after rejection and allows retry", async () => {
    const apiCall = jest
      .fn()
      .mockRejectedValueOnce(new Error("fail"))
      .mockResolvedValueOnce("success");

    await expect(
      deduplicatedFetch("id-1", apiCall)
    ).rejects.toThrow("fail");

    const result = await deduplicatedFetch("id-1", apiCall);

    expect(apiCall).toHaveBeenCalledTimes(2);
    expect(result).toBe("success");
  });

  test("all callers receive the same rejection", async () => {
    const apiCall = jest.fn(async () => {
      await sleep(10);
      throw new Error("boom");
    });

    const p1 = deduplicatedFetch("id-1", apiCall);
    const p2 = deduplicatedFetch("id-1", apiCall);

    await expect(p1).rejects.toThrow("boom");
    await expect(p2).rejects.toThrow("boom");
    expect(apiCall).toHaveBeenCalledTimes(1);
  });
});
