const GuardedAPI = require("../callbacks/mediumGuardedAPI");

describe("GuardedAPI callback", () => {
  test("holds calls until initialization is complete", (done) => {
    const api = new GuardedAPI();
    let initDone = false;

    api.init((cb) => {
      setTimeout(() => {
        initDone = true;
        cb(null);
      }, 50);
    });

    api.call(
      (cb) => cb(null, "success"),
      (err, data) => {
        try {
          expect(initDone).toBe(true); 
          expect(data).toBe("success");
          done();
        } catch (e) {
          done(e);
        }
      }
    );
  });
});