const deepClone = require("../promises/medium/deepClone");

describe("Deep Clone with Circular References", () => {
  test("clones simple nested objects", () => {
    const original = { a: 1, b: { c: 2 } };
    const clone = deepClone(original);

    expect(clone).toEqual(original);
    expect(clone.b).not.toBe(original.b); 
  });

  test("handles circular references without crashing", () => {
    const original = { name: "Google" };
    original.self = original;

    const clone = deepClone(original);

    expect(clone.name).toBe("Google");
    expect(clone.self).toBe(clone); 
    expect(clone.self).not.toBe(original);
  });

  test("clones arrays correctly", () => {
    const original = [1, [2, 3], { d: 4 }];
    const clone = deepClone(original);

    expect(Array.isArray(clone)).toBe(true);
    expect(clone[1]).not.toBe(original[1]);
    expect(clone[2].d).toBe(4);
  });
});