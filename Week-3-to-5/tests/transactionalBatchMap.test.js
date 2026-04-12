const transactionalBatchMap = require("../promises/hard/transactionalBatchMap");

describe("Resilient Snapshot Parallel Batcher", () => {
  test("successfully uploads all items when no failures occur", async () => {
    const uploadFn = jest.fn(async (item) => `id-${item}`);
    const deleteFn = jest.fn();

    const results = await transactionalBatchMap([1, 2, 3], 2, uploadFn, deleteFn);

    expect(results).toEqual(["id-1", "id-2", "id-3"]);
    expect(uploadFn).toHaveBeenCalledTimes(3);
    expect(deleteFn).not.toHaveBeenCalled();
  });

  test("stops and rolls back successfully on failure", async () => {
    const uploaded = [];
    const deleted = [];

    const uploadFn = async (item) => {
      if (item === 3) throw new Error("Upload Failed");
      await new Promise(r => setTimeout(r, 10 * item)); 
      uploaded.push(item);
      return item;
    };

    const deleteFn = async (item) => {
      deleted.push(item);
    };

    await expect(transactionalBatchMap([1, 2, 3, 4], 2, uploadFn, deleteFn))
      .rejects.toThrow("Upload Failed");

    expect(deleted).toContain(1);
    expect(deleted).toContain(2);
    expect(uploaded).not.toContain(4);
  });
});