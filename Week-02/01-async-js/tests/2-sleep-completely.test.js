const sleep = require("../hard (promises)/2-sleep-completely");

describe("sleep function", () => {
  test("resolves after 1 second", () => {
    const start = Date.now();
    return expect(sleep(1000))
      .resolves.toBeUndefined()
      .then(() => {
        const end = Date.now();
        const difference = end - start;
        expect(difference).toBeGreaterThanOrEqual(1000);
      });
  }, 2000);

  test("resolves after 2 seconds", () => {
    const start = Date.now();
    return expect(sleep(2000))
      .resolves.toBeUndefined()
      .then(() => {
        const end = Date.now();
        const difference = end - start;
        expect(difference).toBeGreaterThanOrEqual(2000);
      });
  }, 3000);

  test("resolves after 3 seconds", () => {
    const start = Date.now();
    return expect(sleep(3000))
      .resolves.toBeUndefined()
      .then(() => {
        const end = Date.now();
        const difference = end - start;
        expect(difference).toBeGreaterThanOrEqual(3000);
      });
  }, 4000);
});
