const runParallel = require("../cpu-io/easy/runParallel");

describe("runParallel", () => {
  test("executes all async functions in parallel and returns results in order", async () => {
    const order = [];

    const fns = [
      async () => {
        await new Promise(res => setTimeout(res, 50));
        order.push(1);
        return "a";
      },
      async () => {
        await new Promise(res => setTimeout(res, 10));
        order.push(2);
        return "b";
      },
      async () => {
        order.push(3);
        return "c";
      }
    ];

    const result = await runParallel(fns);

    expect(result).toEqual(["a", "b", "c"]);
    expect(order).toContain(1);
    expect(order).toContain(2);
    expect(order).toContain(3);
  });

  test("rejects if any async function rejects", async () => {
    const fns = [
      async () => "ok",
      async () => { throw "error"; },
      async () => "never"
    ];

    await expect(runParallel(fns)).rejects.toBe("error");
  });
});
