import { describe, it, expect } from "bun:test";

const BASE_URL = "http://localhost:3000";

let instructorToken = "";
let courseId = "";

const instructorEmail = `instructor_${Date.now()}@test.com`;
const password = "password123";

let studentToken = "";
const studentEmail = `student_${Date.now()}@test.com`;


describe("Course APIs", () => {
  it("should signup instructor", async () => {
    const res = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: instructorEmail,
        password,
        name: "Instructor",
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
        email: instructorEmail,
        password,
      }),
    });

    const data = await res.json();
    instructorToken = data.token;

    expect(instructorToken).toBeDefined();
  });

  it("should create course", async () => {
    const res = await fetch(`${BASE_URL}/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${instructorToken}`,
      },
      body: JSON.stringify({
        title: "Test Course",
        description: "Test Description",
        price: 1999,
      }),
    });

    const data = await res.json();
    courseId = data.id;

    expect(res.status).toBe(200);
    expect(courseId).toBeDefined();
  });

  it("should get all courses", async () => {
    const res = await fetch(`${BASE_URL}/courses`);
    const data = await res.json();

    expect(Array.isArray(data)).toBe(true);
  });

  it("should get course by id", async () => {
    const res = await fetch(`${BASE_URL}/courses/${courseId}`);
    const data = await res.json();

    expect(data.id).toBe(courseId);
    expect(data.title).toBe("Test Course");
  });

  it("should update course", async () => {
    const res = await fetch(`${BASE_URL}/courses/${courseId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${instructorToken}`,
      },
      body: JSON.stringify({
        title: "Updated Course Title",
      }),
    });

    const data = await res.json();
    expect(data.title).toBe("Updated Course Title");
  });

  it("should delete course", async () => {
    const res = await fetch(`${BASE_URL}/courses/${courseId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${instructorToken}`,
      },
    });

    const data = await res.json();
    expect(data.message).toBe("Course deleted");
  });

  it("should signup student", async () => {
    const res = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: studentEmail,
        password,
        name: "Student",
        role: "STUDENT",
      }),
    });

    expect([200, 409]).toContain(res.status);
  });

  it("should login student", async () => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: studentEmail,
        password,
      }),
    });

    const data = await res.json();
    studentToken = data.token;

    expect(studentToken).toBeDefined();
  });


  it("student cannot create course", async () => {
    const res = await fetch(`${BASE_URL}/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${studentToken}`,
      },
      body: JSON.stringify({
        title: "Invalid Course",
        price: 1000,
      }),
    });

    expect(res.status).toBe(403);
  });

});
