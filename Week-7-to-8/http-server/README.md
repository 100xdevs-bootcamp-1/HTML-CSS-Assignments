# Node HTTP Server Assignment

Your task is to create a TODO backend using the Node.js core `http` module. You will build a basic web server capable of handling different HTTP methods and routes to manage a list of Todo items.


### Routes to Implement

1. **`POST /create/todo`**
   - Reads the JSON body containing `title` and `description`.
   - Creates a new Todo, assigning it an automatically incremented integer `id` (starting at 1).
   - Returns the updated list of all Todos in JSON format.

2. **`GET /todos`**
   - Returns the list of all created Todos in JSON format.

3. **`GET /todo?id=XXX`**
   - Returns a single Todo object matching the numeric `id` provided in the query parameters.
   - If no Todo is found for the given `id`, it should respond with a `404` status code and the JSON body `{"error": "Todo not found"}`.

4. **`DELETE /todo?id=XXX`**
   - Deletes a specific Todo matching the numeric `id` in the query parameters from the array.
   - Responds with a `200` status code upon success.
   - If the `id` does not exist, it should respond with a `404` status code and an appropriate JSON error object (e.g., `{"error": "Todo not found"}`).

## Evaluation

You can run the provided Jest test suite to check your progress. Make sure your server is running in a separate terminal before executing the tests.

```
 npm run test
```