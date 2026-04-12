const delay = require("../callbacks/easy/delay");

describe("delay callback", () => {
  test("calls the callback with value after given time", (done) => {
    const start = Date.now();
    
    delay(100, "hello", (err, result) => {
      try {
        const diff = Date.now() - start;
        
        expect(err).toBeNull(); 
        expect(result).toBe("hello");
        expect(diff).toBeGreaterThanOrEqual(100);
        
        done(); 
      } catch (error) {
        done(error); 
      }
    });
  }, 300); 
});