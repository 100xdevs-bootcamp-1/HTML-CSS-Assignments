const createBatcher = require("../promises/hard/createBatcher");

describe("createBatcher", () => {
  test("batches multiple requests into a single bulk call", async () => {
    const fetchBulk = jest.fn(async (ids) => {
      return Object.fromEntries(ids.map(id => [id, id * 10]));
    });

    const batcher = createBatcher(fetchBulk, 50);

    const p1 = batcher(1);
    const p2 = batcher(2);
    const p3 = batcher(3);

    const results = await Promise.all([p1, p2, p3]);

    expect(fetchBulk).toHaveBeenCalledTimes(1);
    expect(fetchBulk).toHaveBeenCalledWith([1, 2, 3]);
    expect(results).toEqual([10, 20, 30]);
  });

  test("creates a new batch after delay window expires", async () => {
    const fetchBulk = jest.fn(async (ids) => {
      return Object.fromEntries(ids.map(id => [id, id]));
    });

    const batcher = createBatcher(fetchBulk, 30);

    const r1 = await batcher(1);

    await new Promise(r => setTimeout(r, 50));

    const r2 = await batcher(2);

    expect(fetchBulk).toHaveBeenCalledTimes(2);
    expect(r1).toBe(1);
    expect(r2).toBe(2);
  });

  test("returns only the requested result to each caller", async () => {
    const fetchBulk = jest.fn(async () => ({
      a: "A",
      b: "B",
    }));

    const batcher = createBatcher(fetchBulk, 20);

    const resA = batcher("a");
    const resB = batcher("b");

    await expect(resA).resolves.toBe("A");
    await expect(resB).resolves.toBe("B");
  });

  test("rejects all pending requests if bulk fetch fails", async () => {
    const fetchBulk = jest.fn(async () => {
      throw new Error("Network error");
    });

    const batcher = createBatcher(fetchBulk, 20);

    const p1 = batcher(1);
    const p2 = batcher(2);

    await expect(p1).rejects.toThrow("Network error");
    await expect(p2).rejects.toThrow("Network error");
  });

  test("does not mix requests across different batch windows", async () => {
    const fetchBulk = jest.fn(async (ids) => {
      return Object.fromEntries(ids.map(id => [id, id]));
    });

    const batcher = createBatcher(fetchBulk, 40);

    const p1 = batcher(1);
    await new Promise(r => setTimeout(r, 60));
    const p2 = batcher(2);

    await Promise.all([p1, p2]);

    expect(fetchBulk).toHaveBeenCalledTimes(2);
  });
});
