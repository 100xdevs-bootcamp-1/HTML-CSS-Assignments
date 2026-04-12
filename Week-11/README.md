# Assignment: Payments Backend + Frontend

## Tech Stack

* Node.js
* Express
* MongoDB (Mongoose)
* JWT
* Zod

---

## Folder Structure

```
backend/
  ├── config.js
  ├── db.js
  ├── index.js
  ├── middleware.js
  └── routes/
      ├── user.js
      ├── account.js
      └── index.js
```

---

## Base Route

```
/api/v1
```

---

## Schemas

### User

```
{
  username: String,   // email, unique
  password: String,
  firstName: String,
  lastName: String
}
```

### Account

```
{
  userId: ObjectId,   // reference to User
  balance: Number
}
```

---

## What to Build

### User Routes

* POST `/user/signup`
* POST `/user/signin`
* PUT `/user/` (protected)
* GET `/user/bulk?filter=`

### Account Routes

* GET `/account/balance` (protected)
* POST `/account/transfer` (protected)

---

## Requirements

* JWT auth middleware
* Attach `userId` from token
* Create account on signup with random balance
* Use MongoDB transactions for transfer
* Validate inputs using Zod

---

## Frontend (Required)

Build a simple frontend for this system.

Guidelines:

* Must support:

  * Signup / Signin
  * View balance
  * Search users
  * Send money
* UI/UX is up to you — design it your way

---

## Output

* Working backend
* Functional frontend connected to backend

