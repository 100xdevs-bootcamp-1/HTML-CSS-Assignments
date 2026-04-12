const getUserPosts = require("../promises/easy/getUserPosts");

describe("getUserPosts", () => {
  test("fetches posts for a valid user", async () => {
    global.fetchUser = jest.fn(() =>
      Promise.resolve({ id: 1 })
    );
    global.fetchPosts = jest.fn(() =>
      Promise.resolve(["post1", "post2"])
    );

    const result = await getUserPosts(1);
    expect(result).toEqual(["post1", "post2"]);
  });

  test("logs error when fetchUser fails", async () => {
    console.error = jest.fn();
    global.fetchUser = jest.fn(() =>
      Promise.reject("error")
    );

    await getUserPosts(1);
    expect(console.error).toHaveBeenCalled();
  });
});
