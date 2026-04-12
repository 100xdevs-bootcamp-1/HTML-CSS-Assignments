const createSharedRequest = require("../promises/medium/createSharedRequest");

describe("Shared Request Cache", () => {
  test("deduplicates concurrent calls into a single execution", async () => {
    let callCount = 0;
    const api = async () => {
      callCount++;
      await new Promise(r => setTimeout(r, 50));
      return "DATA";
    };

    const sharedApi = createSharedRequest(api);

    const [r1, r2, r3] = await Promise.all([
      sharedApi(),
      sharedApi(),
      sharedApi()
    ]);

    expect(r1).toBe("DATA");
    expect(r2).toBe("DATA");
    expect(r3).toBe("DATA");
    expect(callCount).toBe(1); 
  });

  test("starts a new request after the previous one settles", async () => {
    let callCount = 0;
    const api = async () => {
      callCount++;
      return `Result ${callCount}`;
    };

    const sharedApi = createSharedRequest(api);

    const first = await sharedApi();
    expect(first).toBe("Result 1");

    const second = await sharedApi();
    expect(second).toBe("Result 2");
    expect(callCount).toBe(2);
  });

  test("handles rejections correctly", async () => {
    let callCount = 0;
    const api = async () => {
      callCount++;
      throw new Error("API Fail");
    };

    const sharedApi = createSharedRequest(api);

    const p1 = sharedApi();
    const p2 = sharedApi();

    await expect(p1).rejects.toThrow("API Fail");
    await expect(p2).rejects.toThrow("API Fail");
    expect(callCount).toBe(1);
  });
});