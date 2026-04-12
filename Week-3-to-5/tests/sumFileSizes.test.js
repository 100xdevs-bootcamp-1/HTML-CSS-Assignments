const sumFileSizes = require("../cpu-io/easy/sumFileSizes");
const fs = require("fs").promises;
const path = require("path");
const os = require("os");

describe("sumFileSizes", () => {
  let tempDir;
  let file1, file2;

  beforeAll(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "test-sum-"));
    file1 = path.join(tempDir, "f1.txt");
    file2 = path.join(tempDir, "f2.txt");
    await fs.writeFile(file1, "hello"); // 5 bytes
    await fs.writeFile(file2, "world!!!"); // 8 bytes
  });

  afterAll(async () => {
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  test("should correctly sum file sizes", async () => {
    const total = await sumFileSizes([file1, file2]);
    expect(total).toBe(13);
  });

  test("should return 0 for empty array", async () => {
    expect(await sumFileSizes([])).toBe(0);
  });

  test("should handle a single file", async () => {
    const total = await sumFileSizes([file1]);
    expect(total).toBe(5);
  });

  test("should handle an empty file", async () => {
    const emptyFile = path.join(tempDir, "empty.txt");
    await fs.writeFile(emptyFile, "");
    const total = await sumFileSizes([emptyFile]);
    expect(total).toBe(0);
  });

  test("should handle duplicate paths in the same call", async () => {
    const total = await sumFileSizes([file1, file1]);
    expect(total).toBe(10);
  });

  test("should handle files in different subdirectories", async () => {
    const subDir = path.join(tempDir, "sub");
    await fs.mkdir(subDir);
    const subFile = path.join(subDir, "sub.txt");
    await fs.writeFile(subFile, "abc"); // 3 bytes
    const total = await sumFileSizes([file1, subFile]);
    expect(total).toBe(8);
  });

  test("should fail if one file does not exist", async () => {
    const nonExistent = path.join(tempDir, "no.txt");
    await expect(sumFileSizes([file1, nonExistent])).rejects.toThrow();
  });
});
