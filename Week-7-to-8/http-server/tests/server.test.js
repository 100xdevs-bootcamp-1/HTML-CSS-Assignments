const baseURL = "http://localhost:3000";

describe("TODO App Server HTTP Routes", () => {
  describe("GET /", () => {
    it("1. Should return a 200 status code on the root path", async () => {
      const res = await fetch(`${baseURL}/`);
      expect(res.status).toBe(200);
    });

    it("2. Should return exact string 'Hello World'", async () => {
      const res = await fetch(`${baseURL}/`);
      const text = await res.text();
      expect(text).toBe("Hello World");
    });

    it("3. Should logically stall or return 404 status code if an invalid path is hit", async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1000);
        const res = await fetch(`${baseURL}/invalid_route`, {
          signal: controller.signal,
        });
        expect(res.status).toBe(404);
        clearTimeout(timeoutId);
      } catch (err) {
        expect(err.name).toBe("AbortError");
      }
    });

    it("4. Should not crash when query parameters are appended", async () => {
      const res = await fetch(`${baseURL}/?some=param`);
      const text = await res.text();
      expect(res.status).toBe(200);
      expect(text).toBe("Hello World");
    });

    it("5. Should close the response properly without hanging", async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1000);
      try {
        const res = await fetch(`${baseURL}/`, { signal: controller.signal });
        expect(res.ok).toBe(true);
      } finally {
        clearTimeout(timeoutId);
      }
    });
  });

  describe("POST /create/todo", () => {
    it("1. Should add a new todo when provided with a valid title and description, returning a 200 status", async () => {
      const res = await fetch(`${baseURL}/create/todo`, {
        method: "POST",
        body: JSON.stringify({ title: "Test 1", description: "Desc 1" }),
      });
      expect(res.status).toBe(200);
    });

    it("2. Should auto-increment the ID correctly for every new todo created", async () => {
      const res = await fetch(`${baseURL}/create/todo`, {
        method: "POST",
        body: JSON.stringify({ title: "Test 2", description: "Desc 2" }),
      });
      const data = await res.json();
      const newTodo = data[data.length - 1];
      expect(newTodo.id).toBe(2);
    });

    it("3. Should return the newly resulting list of all todos in the response body as JSON array", async () => {
      const res = await fetch(`${baseURL}/create/todo`, {
        method: "POST",
        body: JSON.stringify({ title: "Test 3", description: "Desc 3" }),
      });
      const data = await res.json();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThanOrEqual(3);
    });

    it("4. Should correctly parse body parameters into the resulting data", async () => {
      const res = await fetch(`${baseURL}/create/todo`, {
        method: "POST",
        body: JSON.stringify({ title: "Test 4", description: "Desc 4" }),
      });
      const data = await res.json();
      const newTodo = data[data.length - 1];
      expect(newTodo.title).toBe("Test 4");
      expect(newTodo.description).toBe("Desc 4");
    });

    it("5. Should handle sequential creation reliably", async () => {
      const res = await fetch(`${baseURL}/create/todo`, {
        method: "POST",
        body: JSON.stringify({ title: "Test 5", description: "Desc 5" }),
      });
      const data = await res.json();
      const newTodo = data[data.length - 1];
      expect(newTodo.id).toBeGreaterThanOrEqual(1);
    });
  });

  describe("GET /todos", () => {
    it("1. Should return a 200 status code", async () => {
      const res = await fetch(`${baseURL}/todos`);
      expect(res.status).toBe(200);
    });

    it("2. Should return an array", async () => {
      const res = await fetch(`${baseURL}/todos`);
      const data = await res.json();
      expect(Array.isArray(data)).toBe(true);
    });

    it("3. Should return JSON matching the structure of created todos", async () => {
      const res = await fetch(`${baseURL}/todos`);
      const data = await res.json();
      expect(data[0]).toHaveProperty("id");
      expect(data[0]).toHaveProperty("title");
      expect(data[0]).toHaveProperty("description");
    });

    it("4. Should return the correct Content-Type header set to application/json", async () => {
      const res = await fetch(`${baseURL}/todos`);
      expect(res.headers.get("content-type")).toMatch(/application\/json/i);
    });

    it("5. Should reflect updates correctly containing previously created items", async () => {
      const res = await fetch(`${baseURL}/todos`);
      const data = await res.json();
      expect(data.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe("GET /todo?id=", () => {
    it("1. Should return status 200 when a valid, existing ID is requested", async () => {
      const res = await fetch(`${baseURL}/todo?id=1`);
      expect(res.status).toBe(200);
    });

    it("2. Should return the correct todo object containing correct id", async () => {
      const res = await fetch(`${baseURL}/todo?id=1`);
      const data = await res.json();
      expect(data.id).toBe(1);
    });

    it("3. Should return a 404 status code when requesting an ID that has not been created", async () => {
      const res = await fetch(`${baseURL}/todo?id=999`);
      expect(res.status).toBe(404);
    });

    it("4. Should return a JSON error object exactly matching {'error': 'Todo not found'} for non-existent IDs", async () => {
      const res = await fetch(`${baseURL}/todo?id=999`);
      const data = await res.json();
      expect(data.error).toBe("Todo not found");
    });

    it("5. Should return 404 when an invalid ID format is passed in the query", async () => {
      const res = await fetch(`${baseURL}/todo?id=abcd`);
      expect(res.status).toBe(404);
    });
  });

  describe("DELETE /todo?id=", () => {
    it("1. Should return a 200 status code upon successful deletion of a valid ID", async () => {
      const res = await fetch(`${baseURL}/todo?id=2`, { method: "DELETE" });
      expect(res.status).toBe(200);
    });

    it("2. Should successfully eliminate the item from subsequent GET requests", async () => {
      const getRes = await fetch(`${baseURL}/todo?id=2`);
      expect(getRes.status).toBe(404);
    });

    it("3. Should decrease the sequence length of the TODO array by 1 upon successful deletion", async () => {
      const prevRes = await fetch(`${baseURL}/todos`);
      const before = await prevRes.json();

      await fetch(`${baseURL}/todo?id=3`, { method: "DELETE" });

      const newRes = await fetch(`${baseURL}/todos`);
      const after = await newRes.json();

      expect(after.length).toBe(before.length - 1);
    });

    it("4. Should return a 404 status code if the user attempts to delete an ID that doesn't exist", async () => {
      const res = await fetch(`${baseURL}/todo?id=999`, { method: "DELETE" });
      expect(res.status).toBe(404);
    });

    it("5. Should return a 404 error if trying to delete an invalid ID format", async () => {
      const res = await fetch(`${baseURL}/todo?id=something`, {
        method: "DELETE",
      });
      expect(res.status).toBe(404);
    });
  });
});
