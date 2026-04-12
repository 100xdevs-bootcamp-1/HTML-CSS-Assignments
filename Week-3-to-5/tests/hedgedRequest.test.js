const hedgedRequest = require("../callbacks/medium/hedgedRequest");

describe("hedgedRequest", () => {
  
  test("Primary wins: Secondary should not be triggered if Primary is fast", (done) => {
    let secondaryCalled = false;

    const primary = (cb) => setTimeout(() => cb(null, "PRIMARY_DATA"), 20);
    const secondary = (cb) => {
      secondaryCalled = true;
      cb(null, "SECONDARY_DATA");
    };

    hedgedRequest(primary, secondary, 50, (err, data) => {
      try {
        expect(data).toBe("PRIMARY_DATA");
        expect(secondaryCalled).toBe(false); 
        done();
      } catch (e) { done(e); }
    });
  });

  test("Secondary wins: should use Secondary if Primary exceeds timeout", (done) => {
    const primary = (cb) => setTimeout(() => cb(null, "PRIMARY_SLOW"), 100);
    const secondary = (cb) => setTimeout(() => cb(null, "SECONDARY_FAST"), 10);

    hedgedRequest(primary, secondary, 30, (err, data) => {
      try {
        expect(data).toBe("SECONDARY_FAST");
        done();
      } catch (e) { done(e); }
    });
  });

  test("Error Path: should only fail if BOTH tasks fail", (done) => {
    const primary = (cb) => setTimeout(() => cb(new Error("Primary Failed")), 10);
    const secondary = (cb) => setTimeout(() => cb(new Error("Secondary Failed")), 10);

    hedgedRequest(primary, secondary, 5, (err, data) => {
      try {
        expect(err).toBeDefined();
        expect(err.message).toBe("Secondary Failed");
        done();
      } catch (e) { done(e); }
    });
  });

  test("Resilience: Primary fails, but Secondary eventually succeeds", (done) => {
    const primary = (cb) => setTimeout(() => cb(new Error("Primary Dead")), 10);
    const secondary = (cb) => setTimeout(() => cb(null, "SECONDARY_SUCCESS"), 20);

    hedgedRequest(primary, secondary, 5, (err, data) => {
      try {
        expect(err).toBeNull();
        expect(data).toBe("SECONDARY_SUCCESS");
        done();
      } catch (e) { done(e); }
    });
  });
});