## Course Selling App – Test Suite

This repository contains **integration test cases** for a Course Selling backend application, written using **Bun’s test runner**.

The focus of this project is **testing**, not backend implementation.

---

## Test Coverage

✅ **Authentication**

* Signup
* Login
* JWT validation
* Protected routes (`/me`)

✅ **Authorization (Role-based)**

* Students cannot create courses or lessons
* Instructors cannot purchase courses
* Ownership enforcement for updates & deletes

✅ **Courses**

* Create course (Instructor only)
* Get all courses (Public)
* Get course by ID
* Update & delete course (Owner only)

✅ **Lessons**

* Add lessons (Course instructor only)
* Get lessons for a course (Public)

✅ **Purchases**

* Student purchases a course
* Duplicate purchase prevention
* User can view only their own purchases

✅ **Negative & Edge Cases**

* Forbidden access (`403`)
* Unauthorized access (`401`)
* Ownership violations

---

## Setup

Install dependencies:

```bash
bun install
```

Update backend URL if required:

```ts
const BASE_URL = "http://localhost:3000";
```

> ⚠️ Backend implementation must be running locally before executing tests.

---

## Running Tests

Run all test suites:

```bash
bun test
```

Run a specific test file:

```bash
bun test courses.test.ts
```

---

## Demo Video

This video demonstrates the test cases being executed for the Course Selling application:

[https://gist.github.com/user-attachments/assets/442779de-9c68-4f97-8868-3f1ee3456376](https://gist.github.com/user-attachments/assets/442779de-9c68-4f97-8868-3f1ee3456376)

---

## Notes

* Tests are **integration tests** (real API, real auth, real database)
* No mocking is used
* Tests are self-contained and safe to re-run

---

## Requirements Validated

✅ JWT-based authentication
✅ Role-based authorization (Student vs Instructor)
✅ Ownership checks for courses & lessons
✅ Purchase flow integrity
✅ Correct HTTP status codes

---

This project was created using `bun init` with **Bun v1.2.x**.
[Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.


