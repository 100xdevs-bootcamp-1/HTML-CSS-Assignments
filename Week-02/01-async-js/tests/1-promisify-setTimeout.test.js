const wait = require("../hard (promises)/1-promisify-setTimeout");

describe("wait function", () => {
  test("resolves after 1 second", () => {
    const start = Date.now();
    return expect(wait(1))
      .resolves.toBeUndefined()
      .then(() => {
        const end = Date.now();
        const difference = end - start;
        expect(difference).toBeGreaterThanOrEqual(1000);
      });
  }, 2000);

  test("resolves after 2 seconds", () => {
    const start = Date.now();
    return expect(wait(2))
      .resolves.toBeUndefined()
      .then(() => {
        const end = Date.now();
        const difference = end - start;
        expect(difference).toBeGreaterThanOrEqual(2000);
      });
  }, 3000);

  test("resolves after 3 seconds", () => {
    const start = Date.now();
    return expect(wait(3))
      .resolves.toBeUndefined()
      .then(() => {
        const end = Date.now();
        const difference = end - start;
        expect(difference).toBeGreaterThanOrEqual(3000);
      });
  }, 4000);
});
