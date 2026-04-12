const raceWithMetadata = require("../promises/medium/raceWithMetadata");

describe("Race with Metadata", () => {
  test("returns the correct winner key and value", async () => {
    const promiseMap = {
      serverA: new Promise((resolve) => setTimeout(() => resolve("Data A"), 100)),
      serverB: new Promise((resolve) => setTimeout(() => resolve("Data B"), 20)),
      serverC: new Promise((resolve) => setTimeout(() => resolve("Data C"), 150)),
    };

    const result = await raceWithMetadata(promiseMap);

    expect(result).toEqual({ winner: "serverB", value: "Data B" });
  });

  test("handles promises that resolve immediately", async () => {
    const promiseMap = {
      slow: new Promise((resolve) => setTimeout(() => resolve("slow"), 10)),
      instant: Promise.resolve("now"),
    };

    const result = await raceWithMetadata(promiseMap);

    expect(result).toEqual({ winner: "instant", value: "now" });
  });

  test("rejects if the winning promise rejects", async () => {
    const promiseMap = {
      fastFail: new Promise((_, reject) => setTimeout(() => reject(new Error("Fail")), 10)),
      slowSuccess: new Promise((resolve) => setTimeout(() => resolve("Success"), 50)),
    };

    await expect(raceWithMetadata(promiseMap)).rejects.toThrow("Fail");
  });
});