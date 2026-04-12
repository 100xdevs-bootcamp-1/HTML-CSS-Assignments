import { describe, it, expect } from "bun:test";

const BASE_URL = "http://localhost:3000";

let token = "";

describe("Auth APIs", () => {
    const email = `test_${Date.now()}@student.com`;
    it("should signup user", async () => {
        const res = await fetch(`${BASE_URL}/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                password: "password123",
                name: "Test User",
                role: "STUDENT",
            }),
        });

        expect(res.status).toBe(200);
    });

    it("should login user", async () => {
        const res = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                password: "password123",
            }),
        });

        const data = await res.json();
        expect(data.token).toBeDefined();
        token = data.token;
    });

    it("should return /me", async () => {
        const res = await fetch(`${BASE_URL}/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();
        expect(data.email).toBe(email);
    });
});
