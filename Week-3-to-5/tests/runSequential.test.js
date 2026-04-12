const runSequential = require("../cpu-io/easy/runSequential");

describe("runSequential", () => {
  test("executes async functions one after another in order", async () => {
    const order = [];

    const fns = [
      async () => {
        await new Promise((res) => setTimeout(res, 50));
        order.push(1);
        return "a";
      },
      async () => {
        order.push(2);
        return "b";
      },
      async () => {
        order.push(3);
        return "c";
      },
    ];

    const result = await runSequential(fns);

    expect(result).toEqual(["a", "b", "c"]);
    expect(order).toEqual([1, 2, 3]);
  });
});
