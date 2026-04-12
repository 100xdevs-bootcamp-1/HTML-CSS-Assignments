const fetchDeep = require("../cpu-io/medium/fetchDeep");

const sleep = ms => new Promise(res => setTimeout(res, ms));

describe("fetchDeep", () => {
  test("fetches data without redirects", async () => {
    const fetcher = jest.fn(async (id) => ({ id, value: `data-${id}` }));

    const result = await fetchDeep({ a: "1", b: "2" }, fetcher);

    expect(result).toEqual({
      a: { id: "1", value: "data-1" },
      b: { id: "2", value: "data-2" },
    });
    expect(fetcher).toHaveBeenCalledTimes(2);
  });

  test("follows redirect chain until final data", async () => {
    const fetcher = jest.fn(async (id) => {
      if (id === "1") return { redirectId: "2" };
      if (id === "2") return { redirectId: "3" };
      return { id: "3", value: "final" };
    });

    const result = await fetchDeep({ a: "1" }, fetcher);

    expect(result).toEqual({
      a: { id: "3", value: "final" },
    });
    expect(fetcher).toHaveBeenCalledTimes(3);
  });

  test("processes multiple keys in parallel", async () => {
    const start = Date.now();

    const fetcher = jest.fn(async (id) => {
      await sleep(30);
      return { id };
    });

    await fetchDeep({ a: "1", b: "2" }, fetcher);
    const elapsed = Date.now() - start;

    expect(elapsed).toBeLessThan(60);
  });

  test("throws error when max redirect depth is exceeded", async () => {
    const fetcher = jest.fn(async (id) => ({ redirectId: id }));

    await expect(
      fetchDeep({ a: "1" }, fetcher, 3)
    ).rejects.toThrow("Max redirect depth exceeded");
  });

  test("propagates fetcher errors", async () => {
    const fetcher = jest.fn(async (id) => {
      if (id === "2") throw new Error("boom");
      return { redirectId: "2" };
    });

    await expect(
      fetchDeep({ a: "1" }, fetcher)
    ).rejects.toThrow("boom");
  });
});
