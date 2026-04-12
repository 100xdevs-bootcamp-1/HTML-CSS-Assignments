const transactionalWrite = require("../promises/hard/transactionalWrite");
const fs = require('fs').promises;

jest.mock('fs', () => ({
  promises: {
    writeFile: jest.fn(),
    unlink: jest.fn()
  }
}));

describe("Atomic Multi-File Write", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("resolves when all files are written successfully", async () => {
    fs.writeFile.mockResolvedValue();
    
    const files = [
      { path: 'a.txt', content: 'hello' },
      { path: 'b.txt', content: 'world' }
    ];

    await expect(transactionalWrite(files)).resolves.toBeUndefined();
    expect(fs.writeFile).toHaveBeenCalledTimes(2);
    expect(fs.unlink).not.toHaveBeenCalled();
  });

  test("deletes written files if one fails", async () => {
    fs.writeFile
      .mockResolvedValueOnce() 
      .mockRejectedValueOnce(new Error("Disk Full"));

    const files = [
      { path: 'success.txt', content: 'data' },
      { path: 'fail.txt', content: 'data' }
    ];

    await expect(transactionalWrite(files)).rejects.toThrow("Disk Full");

    expect(fs.unlink).toHaveBeenCalledWith('success.txt');
  });
});