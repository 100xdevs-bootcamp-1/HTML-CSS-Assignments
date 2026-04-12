import { describe, it, expect } from "bun:test";

const BASE_URL = "http://localhost:3000";

let instructorToken = "";
let courseId = "";
let lessonId = "";

const email = `lesson_instructor_${Date.now()}@test.com`;
const password = "password123";

describe("Lesson APIs", () => {
  it("should signup instructor", async () => {
    const res = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        name: "Lesson Instructor",
        role: "INSTRUCTOR",
      }),
    });

    expect([200, 409]).toContain(res.status);
  });

  it("should login instructor", async () => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();
    instructorToken = data.token;

    expect(instructorToken).toBeDefined();
  });

  it("should create a course", async () => {
    const res = await fetch(`${BASE_URL}/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${instructorToken}`,
      },
      body: JSON.stringify({
        title: "Lesson Test Course",
        description: "Course for lesson testing",
        price: 2999,
      }),
    });

    const data = await res.json();
    courseId = data.id;

    expect(courseId).toBeDefined();
  });

  it("should create a lesson", async () => {
    const res = await fetch(`${BASE_URL}/lessons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${instructorToken}`,
      },
      body: JSON.stringify({
        title: "Lesson 1",
        content: "Lesson content",
        courseId,
      }),
    });

    const data = await res.json();
    lessonId = data.id;

    expect(res.status).toBe(200);
    expect(lessonId).toBeDefined();
  });

  it("should get lessons for a course (public)", async () => {
    const res = await fetch(`${BASE_URL}/courses/${courseId}/lessons`);
    const data = await res.json();

    expect(Array.isArray(data)).toBe(true);
    expect(data[0].courseId).toBe(courseId);
  });
});
