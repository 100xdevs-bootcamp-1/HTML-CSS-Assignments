const sumPromises = require("../promises/easy/sumPromises");

describe("sumPromises", () => {
  test("resolves to the sum of two resolved promises", async () => {
    const p1 = Promise.resolve(10);
    const p2 = Promise.resolve(20);

    const result = await sumPromises(p1, p2);
    expect(result).toBe(30);
  });

  test("works with async delayed promises", async () => {
    const p1 = new Promise((res) => setTimeout(() => res(5), 100));
    const p2 = new Promise((res) => setTimeout(() => res(15), 100));

    const result = await sumPromises(p1, p2);
    expect(result).toBe(20);
  });
});
