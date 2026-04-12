const  fetchWithTimeout  = require("../callbacks/easy/fetchWithTimeout");

describe("fetchWithTimeout (Callback Style)", () => {
  beforeEach(() => {
    jest.useRealTimers();
    global.fetch = jest.fn();
  });

  test("calls callback with data if fetch completes within time", (done) => {
    global.fetch.mockImplementation((url, cb) => {
      setTimeout(() => cb(null, "data"), 20);
    });

    fetchWithTimeout("url", 100, (err, result) => {
      try {
        expect(err).toBeNull();
        expect(result).toBe("data");
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  test("calls callback with timeout error if fetch is too slow", (done) => {
    global.fetch.mockImplementation((url, cb) => {
      setTimeout(() => cb(null, "data"), 100);
    });

    fetchWithTimeout("url", 20, (err, result) => {
      try {
        expect(err).toBeDefined();
        expect(err.message || err).toBe("Request Timed Out");
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});