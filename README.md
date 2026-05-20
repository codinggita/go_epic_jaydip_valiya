<div align="center">

```
  ██████╗  ██████╗        ███████╗██████╗ ██╗ ██████╗
 ██╔════╝ ██╔═══██╗       ██╔════╝██╔══██╗██║██╔════╝
 ██║  ███╗██║   ██║ █████╗█████╗  ██████╔╝██║██║
 ██║   ██║██║   ██║ ╚════╝██╔══╝  ██╔═══╝ ██║██║
 ╚██████╔╝╚██████╔╝       ███████╗██║     ██║╚██████╗
  ╚═════╝  ╚═════╝        ╚══════╝╚═╝     ╚═╝ ╚═════╝
```

### 🚀 Production-Ready REST API for Go Programming Challenges
**3,202 Problems · 200+ Topics · JWT Auth · MongoDB Aggregation · Rate Limiting**

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Dataset](#-dataset)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Environment Variables](#-environment-variables)
- [Collections & Schema Design](#-collections--schema-design)
- [API Reference](#-api-reference)
- [Authentication Guide](#-authentication-guide)
- [Good to Have Features](#-good-to-have-features-implemented)
- [System Design](#-system-design)

---

## 🧠 Overview

**Go-Epic** is a full-featured backend REST API built for a Go programming challenge platform — similar to LeetCode, but focused entirely on the Go language. It serves **3,202 real problems** with solutions, sourced from Go's standard library, go.dev documentation, and LeetCode.

The API follows **MVC architecture** with clean separation between routes, controllers, services, and models — making it scalable, maintainable, and production-ready.

---

## ⚙️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Runtime | Node.js 18+ | Server-side JavaScript |
| Framework | Express.js 4.x | HTTP routing & middleware |
| Database | MongoDB + Mongoose | NoSQL data storage |
| Auth | JWT + bcryptjs | Secure authentication |
| Rate Limiting | express-rate-limit | API abuse protection |
| Config | dotenv | Environment management |
| Dev Tool | nodemon | Hot reloading |

---

## 📦 Dataset

The dataset contains **3,202 Go programming records** with the following structure:

| Field | Count | Description |
|---|---|---|
| `instruction` | 3,202 | The problem or question |
| `output` | 3,202 | Full solution with code |
| `topic` | 3,202 | 200+ topic categories |
| `dataset_source` | 3,202 | `previous-ultimate-dataset` or `go-source-code` |
| `difficulty` | 2,951 | beginner / easy / medium / intermediate / advanced / hard |
| `url` + `source` | 1,249 | go.dev or LeetCode links |
| `source_file`, `package`, `function` | 1,681 | Go stdlib code analysis |
| `complexity_score` | 1,681 | Numeric complexity rating |
| `problem_number` | 572 | LeetCode problem number |

---

## 📁 Project Structure

```
go-epic/
├── src/
│   ├── config/
│   │   └── db.js                    ← MongoDB connection with error handling
│   │
│   ├── models/                      ← Mongoose schemas (database structure)
│   │   ├── problem.model.js         ← 13 fields, indexed for performance
│   │   ├── topic.model.js           ← Topic metadata with problem counts
│   │   ├── solution.model.js        ← Solutions linked to problems (ref)
│   │   ├── dataset.model.js         ← Dataset source summaries
│   │   └── user.model.js            ← Users with role-based access
│   │
│   ├── controllers/                 ← Request/Response handlers only
│   │   ├── problem.controller.js
│   │   ├── topic.controller.js
│   │   ├── solution.controller.js
│   │   ├── dataset.controller.js
│   │   ├── auth.controller.js
│   │   ├── jwt.controller.js
│   │   ├── admin.controller.js
│   │   ├── protected.controller.js
│   │   └── search.controller.js
│   │
│   ├── services/                    ← Business logic & DB query layer
│   │   ├── problem.service.js       ← Filter, sort, paginate, aggregate
│   │   ├── topic.service.js
│   │   ├── solution.service.js
│   │   ├── dataset.service.js
│   │   └── auth.service.js
│   │
│   ├── routes/                      ← Express route definitions
│   │   ├── problem.routes.js
│   │   ├── topic.routes.js
│   │   ├── solution.routes.js
│   │   ├── dataset.routes.js
│   │   ├── auth.routes.js
│   │   ├── jwt.routes.js
│   │   ├── admin.routes.js
│   │   ├── protected.routes.js
│   │   └── search.routes.js
│   │
│   ├── middlewares/                 ← Request pipeline middleware
│   │   ├── auth.middleware.js       ← JWT token verification
│   │   ├── role.middleware.js       ← Role-based access (admin/user)
│   │   ├── logger.middleware.js     ← Request logging with timestamp
│   │   ├── error.middleware.js      ← Global error handler
│   │   └── rateLimit.middleware.js  ← Rate limiting per route type
│   │
│   ├── app.js                       ← Express app config + route mounting
│   ├── index.js                     ← Server entry point
│   └── seed.js                      ← Database seeder script
│
├── .env                             ← Environment variables (never commit)
├── .env.example                     ← Template for setup
├── package.json
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Step 1 — Install dependencies
```bash
npm install
```

### Step 2 — Configure environment
```bash
cp .env.example .env
# Edit .env and add your MongoDB URI
```

### Step 3 — Add dataset
```
Place the downloaded go-epic JSON file at:
  go-epic/go-epic.json
```

### Step 4 — Seed the database *(run once)*
```bash
npm run seed
```
Expected output:
```
MongoDB Connected: localhost
📦 Dataset loaded: 3202 records
🗑️  Cleared existing data
✅ Inserted 3202 problems
✅ Inserted 211 topics
✅ Inserted 2 dataset records
🎉 Seeding complete!
```

### Step 5 — Start the server
```bash
npm run dev        # Development (hot reload)
npm start          # Production
```

### Step 6 — Verify it's running
```bash
curl http://localhost:5000/health
# { "success": true, "status": "ok", "uptime": 1.23 }
```

---

## 🔐 Environment Variables

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/go-epic
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

---

## 🗃️ Collections & Schema Design

### Problems Collection
```js
{
  instruction:     String  (required, indexed)    // The problem statement
  output:          String  (required)             // Full solution
  topic:           String  (required, indexed)    // e.g. "concurrency-patterns"
  dataset_source:  String  (required, indexed)    // "previous-ultimate-dataset" | "go-source-code"
  difficulty:      String  (enum, indexed)        // beginner → hard
  url:             String                         // Source URL
  source:          String                         // "go.dev" | "leetcode"
  content_type:    String                         // blog | tutorial | docs ...
  source_file:     String                         // Go stdlib file path
  package:         String                         // Go package name
  function:        String                         // Go function name
  complexity_score:Number                         // Numeric complexity
  problem_number:  Number  (indexed)              // LeetCode number
  createdAt:       Date    (auto)
  updatedAt:       Date    (auto)
}
```

### Relationships
```
Problems  ──────────────────→  Topics    (topic field → topic.name)
Solutions ──[ ref ]──────────→ Problems  (problemId → problem._id)
Datasets  ──[ summary ]──────→ Problems  (source → dataset_source)
Users     ──[ role-based ]───→ All       (admin routes protected)
```

---

## 📡 API Reference

### Standard Response Format
```json
{
  "success": true,
  "message": "Problems fetched",
  "data": [...],
  "total": 3202,
  "page": 1,
  "limit": 10,
  "totalPages": 321
}
```

---

### 🔷 Problems

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/problems` | ❌ | Fetch all problems (filter + sort + paginate) |
| GET | `/problems/:problemId` | ❌ | Fetch single problem by ID |
| POST | `/problems` | ✅ | Create new problem |
| PUT | `/problems/:problemId` | ✅ | Replace complete problem |
| PATCH | `/problems/:problemId` | ✅ | Update problem fields |
| DELETE | `/problems/:problemId` | ✅ | Delete problem |
| GET | `/problems/random` | ❌ | Random problem |
| GET | `/problems/recent` | ❌ | Recently added problems |
| GET | `/problems/trending` | ❌ | Trending problems |
| GET | `/problems/advanced` | ❌ | All advanced problems (paginated) |
| GET | `/problems/topic/:topic` | ❌ | Problems by topic |
| GET | `/problems/difficulty/:difficulty` | ❌ | Problems by difficulty |
| GET | `/problems/source/:source` | ❌ | Problems by dataset source |
| GET | `/problems/instruction/:keyword` | ❌ | Problems by keyword in instruction |
| POST | `/problems/import-json` | 🔐 Admin | Bulk import JSON array |
| HEAD | `/problems` | ❌ | Headers only (X-Total-Count) |
| HEAD | `/problems/:problemId` | ❌ | Headers for single problem |
| OPTIONS | `/problems` | ❌ | Allowed methods |
| OPTIONS | `/problems/:problemId` | ❌ | Allowed methods |

**Query Parameters (all combinable):**
```
?difficulty=advanced
?topic=concurrency-patterns
?source=previous-ultimate-dataset
?dataset_source=go-source-code
?keyword=worker
?q=goroutine              → full-text search (instruction + topic + output)
?sort=topic               → sort ascending
?sort=-difficulty         → sort descending
?page=1&limit=10          → pagination
```

**Example Requests:**
```bash
GET /problems?difficulty=advanced&page=1&limit=10&sort=topic
GET /problems?topic=concurrency-patterns&page=2&limit=5
GET /problems?source=previous-ultimate-dataset&sort=-difficulty
```

---

### 🔷 Topics

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/topics` | ❌ | All topics (search + sort + paginate) |
| GET | `/topics/:topicName` | ❌ | Single topic |
| POST | `/topics` | ✅ | Create topic |
| PUT | `/topics/:topicName` | ✅ | Replace topic |
| PATCH | `/topics/:topicName` | ✅ | Update topic |
| DELETE | `/topics/:topicName` | ✅ | Delete topic |
| GET | `/topics/popular` | ❌ | Most popular topics |
| GET | `/topics/trending` | ❌ | Trending topics |
| GET | `/topics/name/:name` | ❌ | Topic by exact name |
| GET | `/topics/category/:category` | ❌ | Topics by category |
| HEAD | `/topics` | ❌ | Headers only |
| HEAD | `/topics/:topicName` | ❌ | Single topic headers |
| OPTIONS | `/topics` | ❌ | Allowed methods |
| OPTIONS | `/topics/:topicName` | ❌ | Allowed methods |

```bash
GET /topics?search=concurrency&page=1&limit=5
GET /topics?sort=name
GET /topics/popular?page=1&limit=10
```

---

### 🔷 Solutions

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/solutions` | ❌ | All solutions |
| GET | `/solutions/:solutionId` | ❌ | Single solution |
| POST | `/solutions` | ✅ | Create solution |
| PUT | `/solutions/:solutionId` | ✅ | Replace solution |
| PATCH | `/solutions/:solutionId` | ✅ | Update solution |
| DELETE | `/solutions/:solutionId` | ✅ | Delete solution |
| GET | `/solutions/random` | ❌ | Random solution |
| GET | `/solutions/recent` | ❌ | Recent solutions |
| GET | `/solutions/trending` | ❌ | Trending solutions |
| GET | `/solutions/topic/:topic` | ❌ | Solutions by topic |
| GET | `/solutions/difficulty/:difficulty` | ❌ | Solutions by difficulty |
| GET | `/solutions/source/:source` | ❌ | Solutions by source |
| HEAD | `/solutions` | ❌ | Headers only |
| HEAD | `/solutions/:solutionId` | ❌ | Single solution headers |
| OPTIONS | `/solutions` | ❌ | Allowed methods |
| OPTIONS | `/solutions/:solutionId` | ❌ | Allowed methods |

---

### 🔷 Datasets

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/datasets` | ❌ | All datasets |
| GET | `/datasets/:datasetId` | ❌ | Single dataset |
| POST | `/datasets` | ✅ | Create dataset |
| PUT | `/datasets/:datasetId` | ✅ | Replace dataset |
| PATCH | `/datasets/:datasetId` | ✅ | Update dataset |
| DELETE | `/datasets/:datasetId` | ✅ | Delete dataset (rate limited) |
| GET | `/datasets/recent` | ❌ | Recent datasets |
| GET | `/datasets/latest` | ❌ | Latest datasets |
| GET | `/datasets/source/:source` | ❌ | By source |
| GET | `/datasets/topic/:topic` | ❌ | By topic |
| GET | `/datasets/difficulty/:difficulty` | ❌ | By difficulty |
| HEAD | `/datasets` | ❌ | Headers only |
| HEAD | `/datasets/:datasetId` | ❌ | Single dataset headers |
| OPTIONS | `/datasets` | ❌ | Allowed methods |
| OPTIONS | `/datasets/:datasetId` | ❌ | Allowed methods |

---

### 🔷 Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | ❌ | Register new user |
| POST | `/auth/login` | ❌ | Login (returns JWT token) |
| POST | `/auth/logout` | ✅ | Logout |
| GET | `/auth/profile` | ✅ | Get own profile |
| PATCH | `/auth/profile` | ✅ | Update own profile |
| POST | `/auth/forgot-password` | ❌ | Request password reset |
| POST | `/auth/reset-password` | ❌ | Reset password with token |
| POST | `/auth/send-otp` | ❌ | Send OTP |
| POST | `/auth/verify-otp` | ❌ | Verify OTP |
| POST | `/auth/refresh-token` | ❌ | Refresh JWT token |
| OPTIONS | `/auth/login` | ❌ | Allowed methods |

---

### 🔷 JWT Routes

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/jwt/profile` | ✅ | JWT-protected profile |
| GET | `/jwt/dashboard` | ✅ | JWT-protected dashboard |
| POST | `/jwt/generate-token` | ❌ | Generate a JWT token |
| POST | `/jwt/verify-token` | ❌ | Verify a JWT token |
| POST | `/jwt/refresh-token` | ❌ | Refresh JWT token |
| GET | `/jwt/admin` | 🔐 Admin | Admin-only route |
| GET | `/jwt/user` | ✅ | User route |
| GET | `/jwt/check-role/admin` | 🔐 Admin | Verify admin role |
| OPTIONS | `/jwt/profile` | ❌ | Allowed methods |

---

### 🔷 Admin Routes *(Admin JWT required)*

| Method | Endpoint | Description |
|---|---|---|
| GET | `/admin/problems` | All problems (admin view) |
| GET | `/admin/topics` | All topics (admin view) |
| GET | `/admin/solutions` | All solutions (admin view) |
| GET | `/admin/datasets` | All datasets (admin view) |
| GET | `/admin/dashboard` | Admin dashboard stats |
| OPTIONS | `/admin/problems` | Allowed methods |
| OPTIONS | `/admin/topics` | Allowed methods |
| OPTIONS | `/admin/solutions` | Allowed methods |
| OPTIONS | `/admin/datasets` | Allowed methods |

---

### 🔷 Protected Routes *(Any JWT required)*

| Method | Endpoint | Description |
|---|---|---|
| GET | `/protected/problems` | JWT-protected problems |
| GET | `/protected/topics` | JWT-protected topics |
| GET | `/protected/solutions` | JWT-protected solutions |
| GET | `/protected/datasets` | JWT-protected datasets |

---

### 🔷 Search Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/search/problems?q=worker` | Full-text search problems |
| GET | `/search/problems?q=atomic` | Search atomic problems |
| GET | `/search/problems?q=token` | Search token bucket problems |
| GET | `/search/topics?q=concurrency` | Search topics |
| GET | `/search/topics?q=goroutines` | Search goroutine topics |
| GET | `/search/solutions?q=mutex` | Search solutions |
| GET | `/search/solutions?q=channel` | Search channel solutions |
| GET | `/search/datasets?q=advanced` | Search datasets |
| OPTIONS | `/search/problems` | Allowed methods |

---

### 🔷 Statistics Routes *(Aggregation Pipeline)*

| Method | Endpoint | Description |
|---|---|---|
| GET | `/stats/problems` | Full problem breakdown (by difficulty, topic, source) |
| GET | `/stats/topics` | Topic stats grouped by category |
| GET | `/stats/difficulties` | Count by difficulty level |
| GET | `/stats/datasets` | Dataset summary info |
| GET | `/stats/advanced-problems` | Count of advanced problems only |
| GET | `/stats/topic/concurrency-patterns` | Stats for specific topic |
| GET | `/stats/source/previous-ultimate-dataset` | Stats for specific source |
| GET | `/stats/total-solutions` | Total solution count |
| HEAD | `/stats/problems` | Headers with X-Total-Count |

---

### 🔷 System Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Server health check |
| GET | `/version` | API version info |
| GET | `/server-status` | Runtime environment status |
| GET | `/metrics` | Memory usage + uptime |
| HEAD | `/health` | Health status headers only |
| OPTIONS | `/health` | Allowed communication methods |

---

## 🔐 Authentication Guide

### Register
```bash
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

### Login → Get Token
```bash
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "secret123"
}

# Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { "id": "...", "name": "John", "role": "user" }
}
```

### Use Token in Protected Requests
```bash
GET /auth/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## ✅ Good to Have Features (Implemented)

| # | Feature | Status | Details |
|---|---|---|---|
| 1 | API Response Standardization | ✅ | All responses: `{ success, message, data, total, page }` |
| 2 | Request Logging Middleware | ✅ | Logs `[timestamp] METHOD /route` for every request |
| 3 | Timestamp Tracking | ✅ | `createdAt` + `updatedAt` on all 5 collections |
| 4 | Password Hashing (bcrypt) | ✅ | All passwords hashed with `bcrypt.hash(password, 10)` |
| 5 | Advanced Search using Regex | ✅ | Case-insensitive `$regex` search on instruction + topic + output |
| 6 | Database Seeding Script | ✅ | `npm run seed` — loads all 3,202 records automatically |
| 7 | Role-Based Access Control | ✅ | `admin` and `user` roles, protected via middleware |
| 8 | Health Check API | ✅ | `GET /health` with uptime and status |
| 9 | Basic Rate Limiting | ✅ | 5 different limiters (general, strict, search, delete, upload) |
| 10 | JWT Token Expiry Handling | ✅ | Expired tokens return `401` with clear error message |

---

## 🏗️ System Design

### Architecture — Monolithic MVC
```
Client Request
     │
     ▼
[ Express Server ] ← CORS + Logger Middleware
     │
     ▼
[ Rate Limiter ] ← per-route limits
     │
     ▼
[ Auth Middleware ] ← JWT verification (protected routes)
     │
     ▼
[ Role Middleware ] ← admin/user check
     │
     ▼
[ Controller ] ← handles req/res only
     │
     ▼
[ Service ] ← all business logic + DB queries
     │
     ▼
[ Mongoose Model ] ← MongoDB schema + validation
     │
     ▼
[ MongoDB ] ← data storage
     │
     ▼
[ Error Middleware ] ← global error handler
     │
     ▼
Client Response { success, message, data }
```

### Middleware Chain Example
```
POST /problems  →  rateLimiter  →  authMiddleware  →  controller  →  service  →  MongoDB
GET  /admin/*   →  rateLimiter  →  authMiddleware  →  roleMiddleware("admin")  →  controller
```

### Scaling Concepts Understood
- **Vertical Scaling** — increase CPU/RAM on single server
- **Horizontal Scaling** — run multiple Node.js instances behind a load balancer
- **Indexing** — `topic`, `difficulty`, `dataset_source`, `problem_number` are indexed for fast queries
- **Pagination** — all list endpoints support `?page=&limit=` to avoid large payload transfers
- **Aggregation** — MongoDB `$match → $group → $project → $sort` pipelines for stats

---

## 📊 Aggregation Pipeline Example

```js
// Stats by difficulty — used in GET /stats/difficulties
Problem.aggregate([
  { $match: {} },                                     // match all
  { $group: { _id: "$difficulty", count: { $sum: 1 } } }, // group by difficulty
  { $project: { difficulty: "$_id", count: 1, _id: 0 } }, // rename fields
  { $sort: { count: -1 } }                            // sort by most common
])

// Result:
[
  { difficulty: "advanced", count: 892 },
  { difficulty: "intermediate", count: 741 },
  { difficulty: "medium", count: 534 },
  ...
]
```

---

<div align="center">

**Go-Epic Backend · Built for Sem 2 Full Stack Project 2026**

</div>
