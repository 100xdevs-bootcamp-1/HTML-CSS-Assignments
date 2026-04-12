const checkFileExists = require("../cpu-io/easy/checkFileExists");
const fs = require("fs").promises;
const path = require("path");
const os = require("os");

describe("checkFileExists", () => {
  let tempFile;

  beforeAll(async () => {
    tempFile = path.join(os.tmpdir(), `test-exists-${Date.now()}.txt`);
    await fs.writeFile(tempFile, "test");
  });

  afterAll(async () => {
    try {
      await fs.unlink(tempFile);
    } catch (e) {}
  });

  test("should return true for an existing file", async () => {
    expect(await checkFileExists(tempFile)).toBe(true);
  });

  test("should return false for a non-existing file", async () => {
    const nonExistent = path.join(
      os.tmpdir(),
      "this-file-does-not-exist-12345.txt",
    );
    expect(await checkFileExists(nonExistent)).toBe(false);
  });

  test("should return true for a directory", async () => {
    expect(await checkFileExists(os.tmpdir())).toBe(true);
  });

  test("should return false for null or undefined path", async () => {
    expect(await checkFileExists(null)).toBe(false);
    expect(await checkFileExists(undefined)).toBe(false);
  });
});
