const processLargeArray = require("../cpu-io/medium/processLargeArray");

describe("processLargeArray", () => {
  test("processes all items", async () => {
    const items = Array.from({ length: 5000 }, (_, i) => i);
    const processed = [];

    await processLargeArray(items, (item) => {
      processed.push(item);
    });

    expect(processed.length).toBe(5000);
    expect(processed[0]).toBe(0);
    expect(processed[4999]).toBe(4999);
  });

  test("yields control back to the event loop", async () => {
    const items = Array.from({ length: 3000 }, (_, i) => i);
    let yielded = false;

    setTimeout(() => {
      yielded = true;
    }, 0);

    await processLargeArray(items, () => {});

    expect(yielded).toBe(true);
  });

  test("calls processFn in order", async () => {
    const items = [1, 2, 3, 4];
    const result = [];

    await processLargeArray(items, (item) => {
      result.push(item);
    });

    expect(result).toEqual([1, 2, 3, 4]);
  });

  test("handles empty array gracefully", async () => {
    const fn = jest.fn();

    await processLargeArray([], fn);

    expect(fn).not.toHaveBeenCalled();
  });

  test("throws if processFn throws", async () => {
    const items = [1, 2, 3];

    await expect(
      processLargeArray(items, (item) => {
        if (item === 2) throw new Error("boom");
      })
    ).rejects.toThrow("boom");
  });
});
