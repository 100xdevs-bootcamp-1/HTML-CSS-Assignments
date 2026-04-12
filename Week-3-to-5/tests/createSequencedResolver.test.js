const createSequencedResolver = require("../promises/hard/createSequencedResolver");

describe("Ordered Event Emitter Bridge", () => {
  test("resolves in strict order even if pushed out of order", async () => {
    const resolver = createSequencedResolver();
    const results = [];

    const p2 = resolver.waitFor(2).then(data => results.push(data));
    const p1 = resolver.waitFor(1).then(data => results.push(data));

    resolver.push(2, "Data 2");
    expect(results).toEqual([]);

    resolver.push(1, "Data 1");

    await Promise.all([p1, p2]);
    expect(results).toEqual(["Data 1", "Data 2"]);
  });

  test("handles gaps in sequence", async () => {
    const resolver = createSequencedResolver();
    const p3 = resolver.waitFor(3);
    
    resolver.push(3, "Data 3");
    resolver.push(1, "Data 1");
    resolver.push(2, "Data 2");

    const result = await p3;
    expect(result).toBe("Data 3");
  });
});