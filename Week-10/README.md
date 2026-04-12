# ShelfLife Household Inventory Tracker

**Stack:** MongoDB · Express · Node.js · React (MERN)

---

## Assignment Overview

Build a collaborative expiry tracking application for shared households. Roommates manage groceries together, receive expiration alerts, and compete to reduce waste.

---

## Core Requirements

### 1. Authentication & User Management
- [ ] User registration and login with JWT
- [ ] Protected routes middleware
- [ ] User profile with joined household display

### 2. Household System
- [ ] Create household with auto-generated invite code (6 characters)
- [ ] Join household using invite code
- [ ] View all household members
- [ ] Leave household functionality

### 3. Inventory Management
- [ ] Add items with: name, category, expiry date, quantity
- [ ] Auto-assign status: `fresh`, `expiring-soon` (≤3 days), `expired`
- [ ] Edit and delete items (only by creator or household admin)
- [ ] Barcode scanner integration (browser-based)

### 4. Dashboard & Alerts
- [ ] Visual shelf display: Fresh (green) / Expiring Soon (yellow) / Expired (red)
- [ ] Count badges for each status category
- [ ] Sort and filter by category or expiry date

### 5. Waste Tracking
- [ ] Mark items as `used` or `wasted`
- [ ] Calculate household waste score: `(used / total) × 100`
- [ ] Simple leaderboard showing top contributors

### 6. Automated Notifications
- [ ] Daily cron job checking expiring items
- [ ] Email digest to all household members (Nodemailer)
- [ ] List items expiring within 24 hours

---

## Technical Constraints

| Rule | Implementation |
|------|---------------|
| **No AI services** | Use date math and database queries only |
| **No external APIs** | Except open barcode database for product names |
| **MongoDB only** | All data persistence via Mongoose |
| **React functional components** | Hooks only, no class components |

---

## Database Schema

```javascript
// User
{
  _id: ObjectId,
  name: String,           // required, 2-30 chars
  email: String,          // required, unique
  password: String,       // hashed, min 6 chars
  householdId: ObjectId,  // nullable
  createdAt: Date
}

// Household
{
  _id: ObjectId,
  name: String,           // required, 3-30 chars
  inviteCode: String,     // unique, 6 chars uppercase
  members: [ObjectId],  // user references
  wasteScore: Number,     // 0-100, default 0
  createdAt: Date
}

// Item
{
  _id: ObjectId,
  householdId: ObjectId,  // required
  addedBy: ObjectId,      // user reference
  name: String,           // required
  category: String,       // enum: produce, dairy, meat, pantry, frozen, other
  quantity: Number,       // default 1
  expiryDate: Date,       // required
  status: String,         // enum: fresh, expiring-soon, expired, used, wasted
  createdAt: Date,
  updatedAt: Date
}
```

## API Specification

### Authentication
| Method | Endpoint | Body | Response |
|--------|----------|------|----------|
| POST | /api/auth/register | {name, email, password} | {token, user} |
| POST | /api/auth/login | {email, password} | {token, user} |

### Households
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/households | Yes | Create new household |
| POST | /api/households/join | Yes | {inviteCode} → join existing |
| GET | /api/households/me | Yes | Get current user's household |
| GET | /api/households/:id/members | Yes | List all members |

### Items
| Method | Endpoint | Query Params | Description |
|--------|----------|--------------|-------------|
| GET | /api/items | ?status=&category= | List household items |
| POST | /api/items | — | Create new item |
| PUT | /api/items/:id | — | Update item details |
| PATCH | /api/items/:id/status | {status} | Mark used/wasted |
| DELETE | /api/items/:id | — | Remove item |

### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/dashboard/stats | Waste score, counts by status |
| GET | /api/dashboard/expiring | Items expiring in 24h |

---

## Frontend Requirements

### Routes
| Path | Component | Access |
|------|-----------|--------|
| /login | LoginForm | Public |
| /register | RegisterForm | Public |
| /dashboard | Dashboard | Private |
| /household | HouseholdManager | Private |
| /items | InventoryList | Private |
| /add | AddItemForm | Private |
