const doubleTry = require("../promises/easy/doubleTry");

describe("doubleTry Promise", () => {
  test("returns result on first attempt if successful", async () => {
    let callCount = 0;
    const fn = async () => {
      callCount++;
      return "Success";
    };

    const result = await doubleTry(fn);
    expect(result).toBe("Success");
    expect(callCount).toBe(1);
  });

  test("retries and succeeds on second attempt", async () => {
    let callCount = 0;
    const fn = async () => {
      callCount++;
      if (callCount === 1) throw new Error("First Failure");
      return "Second Success";
    };

    const result = await doubleTry(fn);
    expect(result).toBe("Second Success");
    expect(callCount).toBe(2);
  });

  test("rejects if both attempts fail", async () => {
    let callCount = 0;
    const fn = async () => {
      callCount++;
      throw new Error(`Failure ${callCount}`);
    };

    await expect(doubleTry(fn)).rejects.toThrow("Failure 2");
    expect(callCount).toBe(2);
  });
});