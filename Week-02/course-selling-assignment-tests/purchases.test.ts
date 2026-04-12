import { describe, it, expect } from "bun:test";

const BASE_URL = "http://localhost:3000";

let instructorToken = "";
let studentToken = "";
let courseId = "";
let studentId = "";

const instructorEmail = `instr_${Date.now()}@test.com`;
const studentEmail = `stud_${Date.now()}@test.com`;
const password = "password123";

let otherStudentId = "";
let otherStudentToken = "";

const otherStudentEmail = `other_${Date.now()}@test.com`;


describe("Purchase APIs", () => {
  it("signup + login instructor", async () => {
    await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: instructorEmail,
        password,
        name: "Instructor",
        role: "INSTRUCTOR",
      }),
    });

    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: instructorEmail, password }),
    });

    const data = await res.json();
    instructorToken = data.token;

    expect(instructorToken).toBeDefined();
  });

  it("instructor creates course", async () => {
    const res = await fetch(`${BASE_URL}/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${instructorToken}`,
      },
      body: JSON.stringify({
        title: "Purchase Test Course",
        description: "Testing purchases",
        price: 1999,
      }),
    });

    const data = await res.json();
    courseId = data.id;

    expect(courseId).toBeDefined();
  });

  it("signup + login student", async () => {
    await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: studentEmail,
        password,
        name: "Student",
        role: "STUDENT",
      }),
    });

    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: studentEmail, password }),
    });

    const data = await res.json();
    studentToken = data.token;

    expect(studentToken).toBeDefined();
  });

  it("student can purchase course", async () => {
    const res = await fetch(`${BASE_URL}/purchases`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${studentToken}`,
      },
      body: JSON.stringify({ courseId }),
    });

    expect([200, 409]).toContain(res.status);
  });

  it("student can fetch own purchases", async () => {
    // get student id from /me
    const meRes = await fetch(`${BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${studentToken}`,
      },
    });

    const me = await meRes.json();
    studentId = me.id;

    const res = await fetch(`${BASE_URL}/users/${studentId}/purchases`, {
      headers: {
        Authorization: `Bearer ${studentToken}`,
      },
    });

    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data[0].course.id).toBe(courseId);
  });

  it("instructor cannot purchase course", async () => {
    const res = await fetch(`${BASE_URL}/purchases`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${instructorToken}`,
      },
      body: JSON.stringify({ courseId }),
    });

    expect(res.status).toBe(403);
  });
  it("signup + login other student", async () => {
    await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: otherStudentEmail,
        password,
        name: "Other Student",
        role: "STUDENT",
      }),
    });

    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: otherStudentEmail, password }),
    });

    const data = await res.json();
    otherStudentToken = data.token;

    const meRes = await fetch(`${BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${otherStudentToken}`,
      },
    });

    const me = await meRes.json();
    otherStudentId = me.id;

    expect(otherStudentId).toBeDefined();
  });

  it("student cannot view other user's purchases", async () => {
    const res = await fetch(`${BASE_URL}/users/${otherStudentId}/purchases`, {
      headers: {
        Authorization: `Bearer ${studentToken}`,
      },
    });

    expect(res.status).toBe(403);
  });

});
