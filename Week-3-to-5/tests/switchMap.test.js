const switchMap = require("../promises/medium/switchMap");

const sleep = ms => new Promise(res => setTimeout(res, ms));

describe("switchMap", () => {
  test("returns result of the latest call only", async () => {
    const apiCall = jest.fn(async (val, delay) => {
      await sleep(delay);
      return val;
    });

    const wrapped = switchMap(apiCall);

    const p1 = wrapped("A", 30); 
    const p2 = wrapped("B", 10); 

    const r1 = await p1;
    const r2 = await p2;

    expect(r1).toBeUndefined(); 
    expect(r2).toBe("B");
  });

  test("returns result when only one call is made", async () => {
    const apiCall = jest.fn(async () => "result");

    const wrapped = switchMap(apiCall);
    const result = await wrapped();

    expect(result).toBe("result");
  });

  test("ignores multiple stale calls and resolves latest", async () => {
    const apiCall = jest.fn(async (val, delay) => {
      await sleep(delay);
      return val;
    });

    const wrapped = switchMap(apiCall);

    const p1 = wrapped("A", 50);
    const p2 = wrapped("B", 30);
    const p3 = wrapped("C", 10); 

    const r1 = await p1;
    const r2 = await p2;
    const r3 = await p3;

    expect(r1).toBeUndefined();
    expect(r2).toBeUndefined();
    expect(r3).toBe("C");
  });

  test("propagates error from latest call", async () => {
    const apiCall = jest.fn(async (val) => {
      if (val === "bad") throw new Error("boom");
      return val;
    });

    const wrapped = switchMap(apiCall);

    const p1 = wrapped("ok");
    const p2 = wrapped("bad");

    await expect(p1).resolves.toBeUndefined();
    await expect(p2).rejects.toThrow("boom");
  });
});
