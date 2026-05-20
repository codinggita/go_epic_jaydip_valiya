<div align="center">

```
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║    ██████╗  ██████╗       ███████╗██████╗ ██╗ ██████╗    ║
║   ██╔════╝ ██╔═══██╗      ██╔════╝██╔══██╗██║██╔════╝    ║
║   ██║  ███╗██║   ██║█████╗█████╗  ██████╔╝██║██║         ║
║   ██║   ██║██║   ██║╚════╝██╔══╝  ██╔═══╝ ██║██║         ║
║   ╚██████╔╝╚██████╔╝      ███████╗██║     ██║╚██████╗    ║
║    ╚═════╝  ╚═════╝       ╚══════╝╚═╝     ╚═╝ ╚═════╝    ║
║                                                           ║
║         The Go Language Challenge Platform API            ║
╚═══════════════════════════════════════════════════════════╝
```

<br/>

> **⚡ Production-Ready REST API · 3,202 Problems · 200+ Topics · Built for the Go Ecosystem**

<br/>

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![JWT](https://img.shields.io/badge/JWT-Secured-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io)
[![License](https://img.shields.io/badge/License-MIT-3DA639?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Production_Ready-00C851?style=for-the-badge)]()

<br/>

```
  3,202 Problems  ·  211 Topics  ·  JWT Auth  ·  Rate Limiting  ·  MVC Architecture
```

</div>

---

## 📖 Table of Contents

| # | Section | Description |
|---|---|---|
| 01 | [🧠 Overview](#-overview) | What is Go-Epic? |
| 02 | [⚙️ Tech Stack](#️-tech-stack) | Technologies powering the API |
| 03 | [📦 Dataset](#-dataset) | 3,202 records breakdown |
| 04 | [📁 Project Structure](#-project-structure) | Folder & file layout |
| 05 | [🚀 Quick Start](#-quick-start) | Up and running in 5 steps |
| 06 | [🔐 Environment Variables](#-environment-variables) | Configuration reference |
| 07 | [🗃️ Schema Design](#️-collections--schema-design) | Collections & relationships |
| 08 | [📡 API Reference](#-api-reference) | All endpoints at a glance |
| 09 | [🔑 Authentication Guide](#-authentication-guide) | Register, login, use tokens |
| 10 | [✅ Features Implemented](#-features-implemented) | What's built in |
| 11 | [🏗️ System Design](#️-system-design) | Architecture & scaling |

---

## 🧠 Overview

**Go-Epic** is a full-featured backend REST API powering a Go programming challenge platform — think **LeetCode, but exclusively for the Go language.**

It serves **3,202 real-world problems** complete with solutions, sourced from Go's standard library, `go.dev` documentation, and LeetCode — all backed by MongoDB with aggregation pipelines, full-text search, and JWT-based authentication.

```
  ┌─────────────────────────────────────────────────────────┐
  │  🎯  Built for Go learners — from beginner to expert    │
  │  📚  Real problems, real solutions, real data            │
  │  🔒  Secure, scalable, and production-ready             │
  │  🧩  MVC architecture — clean, maintainable, tested     │
  └─────────────────────────────────────────────────────────┘
```

---

## ⚙️ Tech Stack

<div align="center">

| Layer | Technology | Version | Purpose |
|:---:|:---:|:---:|:---|
| 🟢 Runtime | **Node.js** | `18+` | Server-side JavaScript execution |
| 🚂 Framework | **Express.js** | `4.x` | HTTP routing & middleware pipeline |
| 🍃 Database | **MongoDB + Mongoose** | `7.x` | NoSQL document storage & ODM |
| 🔑 Auth | **JWT + bcryptjs** | latest | Token-based secure authentication |
| 🛡️ Protection | **express-rate-limit** | latest | Per-route API abuse prevention |
| ⚙️ Config | **dotenv** | latest | Environment variable management |
| 🔄 Dev Tools | **nodemon** | latest | Hot-reload during development |

</div>

---

## 📦 Dataset

> A meticulously curated dataset of **3,202 Go programming records** — every single one battle-tested.

<div align="center">

| Field | Records | Description |
|:---|:---:|:---|
| `instruction` | **3,202** | The problem or challenge statement |
| `output` | **3,202** | Full, working solution with code |
| `topic` | **3,202** | 200+ categorized topic tags |
| `dataset_source` | **3,202** | `previous-ultimate-dataset` \| `go-source-code` |
| `difficulty` | **2,951** | `beginner` → `easy` → `medium` → `intermediate` → `advanced` → `hard` |
| `url` + `source` | **1,249** | Verified `go.dev` or LeetCode source links |
| `source_file`, `package`, `function` | **1,681** | Go standard library code analysis |
| `complexity_score` | **1,681** | Numeric complexity rating (0–100) |
| `problem_number` | **572** | Original LeetCode problem number |

</div>

---

## 📁 Project Structure

```
go-epic/
│
├── 📂 src/
│   │
│   ├── 📂 config/
│   │   └── db.js                    ←  MongoDB connection with error handling
│   │
│   ├── 📂 models/                   ←  Mongoose schemas (database layer)
│   │   ├── problem.model.js         ←  13 fields, indexed for performance
│   │   ├── topic.model.js           ←  Topic metadata with problem counts
│   │   ├── solution.model.js        ←  Solutions linked to problems (ref)
│   │   ├── dataset.model.js         ←  Dataset source summaries
│   │   └── user.model.js            ←  Users with role-based access
│   │
│   ├── 📂 controllers/              ←  Request / Response handlers only
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
│   ├── 📂 services/                 ←  Business logic & DB query layer
│   │   ├── problem.service.js       ←  Filter · Sort · Paginate · Aggregate
│   │   ├── topic.service.js
│   │   ├── solution.service.js
│   │   ├── dataset.service.js
│   │   └── auth.service.js
│   │
│   ├── 📂 routes/                   ←  Express route definitions
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
│   ├── 📂 middlewares/              ←  Request pipeline middleware
│   │   ├── auth.middleware.js       ←  JWT token verification
│   │   ├── role.middleware.js       ←  Role-based access (admin / user)
│   │   ├── logger.middleware.js     ←  Timestamped request logging
│   │   ├── error.middleware.js      ←  Global error handler
│   │   └── rateLimit.middleware.js  ←  5 tier rate limiting
│   │
│   ├── app.js                       ←  Express app config + route mounting
│   ├── index.js                     ←  Server entry point
│   └── seed.js                      ←  One-time database seeder script
│
├── .env                             ←  ⚠️  Never commit this file
├── .env.example                     ←  Template for new environments
├── package.json
└── README.md
```

---

## 🚀 Quick Start

> Get the API running locally in under 5 minutes.

### Prerequisites

```
✔  Node.js  v18+
✔  MongoDB  (local instance or MongoDB Atlas)
✔  go-epic.json  dataset file
```

---

### Step 1 — Clone & Install

```bash
git clone https://github.com/your-username/go-epic.git
cd go-epic
npm install
```

---

### Step 2 — Configure Environment

```bash
cp .env.example .env
# Open .env and fill in your MongoDB URI and JWT secret
```

---

### Step 3 — Add the Dataset

```
Place the downloaded dataset file at:

  go-epic/
  └── go-epic.json   ← right here
```

---

### Step 4 — Seed the Database *(run once)*

```bash
npm run seed
```

```
✔  MongoDB Connected: localhost
📦  Dataset loaded: 3202 records
🗑️   Cleared existing data
✅  Inserted 3202 problems
✅  Inserted 211 topics
✅  Inserted 2 dataset records
🎉  Seeding complete!
```

---

### Step 5 — Launch the Server

```bash
npm run dev       # Development — hot reload enabled
npm start         # Production
```

---

### Step 6 — Health Check

```bash
curl http://localhost:5000/health
# → { "success": true, "status": "ok", "uptime": 1.23 }
```

> ✅ **You're live.** The API is ready to serve requests.

---

## 🔐 Environment Variables

```env
# ─────────────────────────────────────
#   Go-Epic · Environment Configuration
# ─────────────────────────────────────

PORT=5000
MONGO_URI=mongodb://localhost:27017/go-epic
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

> ⚠️ Never commit `.env` to version control. Use `.env.example` as a reference template.

---

## 🗃️ Collections & Schema Design

### Problems Collection

```js
{
  instruction:      String   // required · indexed   → Problem statement
  output:           String   // required             → Full solution code
  topic:            String   // required · indexed   → e.g. "concurrency-patterns"
  dataset_source:   String   // required · indexed   → "previous-ultimate-dataset" | "go-source-code"
  difficulty:       String   // enum     · indexed   → beginner | easy | medium | intermediate | advanced | hard
  url:              String   //                      → Source URL
  source:           String   //                      → "go.dev" | "leetcode"
  content_type:     String   //                      → blog | tutorial | docs | ...
  source_file:      String   //                      → Go stdlib file path
  package:          String   //                      → Go package name
  function:         String   //                      → Go function name
  complexity_score: Number   //                      → Numeric complexity rating
  problem_number:   Number   // indexed              → LeetCode problem number
  createdAt:        Date     // auto-generated
  updatedAt:        Date     // auto-generated
}
```

---

### Collection Relationships

```
┌──────────────┐        topic field        ┌──────────────┐
│   Problems   │ ─────────────────────────▶│    Topics    │
└──────────────┘                           └──────────────┘

┌──────────────┐       problemId ref       ┌──────────────┐
│  Solutions   │ ─────────────────────────▶│   Problems   │
└──────────────┘                           └──────────────┘

┌──────────────┐     dataset_source        ┌──────────────┐
│   Datasets   │ ─────────────────────────▶│   Problems   │
└──────────────┘                           └──────────────┘

┌──────────────┐    role-based access      ┌──────────────┐
│    Users     │ ─────────────────────────▶│  All Routes  │
└──────────────┘   (admin routes only)     └──────────────┘
```

---

## 📡 API Reference

### Standard Response Envelope

```json
{
  "success": true,
  "message": "Problems fetched",
  "data": [ "..." ],
  "total": 3202,
  "page": 1,
  "limit": 10,
  "totalPages": 321
}
```

> All endpoints follow this consistent shape — no surprises.

---

### 🔷 Problems `/problems`

| Method | Endpoint | Auth | Description |
|:---:|:---|:---:|:---|
| `GET` | `/problems` | ❌ | Fetch all problems (filter + sort + paginate) |
| `GET` | `/problems/:problemId` | ❌ | Fetch single problem by ID |
| `POST` | `/problems` | ✅ | Create a new problem |
| `PUT` | `/problems/:problemId` | ✅ | Replace complete problem |
| `PATCH` | `/problems/:problemId` | ✅ | Partially update problem fields |
| `DELETE` | `/problems/:problemId` | ✅ | Delete problem |
| `GET` | `/problems/random` | ❌ | Serve a random problem |
| `GET` | `/problems/recent` | ❌ | Recently added problems |
| `GET` | `/problems/trending` | ❌ | Trending problems |
| `GET` | `/problems/advanced` | ❌ | All advanced problems (paginated) |
| `GET` | `/problems/topic/:topic` | ❌ | Problems filtered by topic |
| `GET` | `/problems/difficulty/:difficulty` | ❌ | Problems filtered by difficulty |
| `GET` | `/problems/source/:source` | ❌ | Problems filtered by dataset source |
| `GET` | `/problems/instruction/:keyword` | ❌ | Problems matching keyword |
| `POST` | `/problems/import-json` | 🔐 Admin | Bulk import via JSON array |
| `HEAD` | `/problems` | ❌ | Headers only (`X-Total-Count`) |
| `OPTIONS` | `/problems` | ❌ | Allowed methods |

#### Query Parameters — fully combinable

```
?difficulty=advanced
?topic=concurrency-patterns
?source=previous-ultimate-dataset
?dataset_source=go-source-code
?keyword=worker
?q=goroutine                  →  full-text search (instruction + topic + output)
?sort=topic                   →  sort ascending
?sort=-difficulty             →  sort descending
?page=1&limit=10              →  pagination
```

#### Example Requests

```bash
GET /problems?difficulty=advanced&page=1&limit=10&sort=topic
GET /problems?topic=concurrency-patterns&page=2&limit=5
GET /problems?source=previous-ultimate-dataset&sort=-difficulty
```

---

### 🔷 Topics `/topics`

| Method | Endpoint | Auth | Description |
|:---:|:---|:---:|:---|
| `GET` | `/topics` | ❌ | All topics (search + sort + paginate) |
| `GET` | `/topics/:topicName` | ❌ | Single topic by name |
| `POST` | `/topics` | ✅ | Create a new topic |
| `PUT` | `/topics/:topicName` | ✅ | Replace topic |
| `PATCH` | `/topics/:topicName` | ✅ | Update topic fields |
| `DELETE` | `/topics/:topicName` | ✅ | Delete topic |
| `GET` | `/topics/popular` | ❌ | Most popular topics |
| `GET` | `/topics/trending` | ❌ | Trending topics |
| `GET` | `/topics/name/:name` | ❌ | Topic by exact name |
| `GET` | `/topics/category/:category` | ❌ | Topics by category |
| `HEAD` | `/topics` | ❌ | Headers only |
| `OPTIONS` | `/topics` | ❌ | Allowed methods |

```bash
GET /topics?search=concurrency&page=1&limit=5
GET /topics?sort=name
GET /topics/popular?page=1&limit=10
```

---

### 🔷 Solutions `/solutions`

| Method | Endpoint | Auth | Description |
|:---:|:---|:---:|:---|
| `GET` | `/solutions` | ❌ | All solutions |
| `GET` | `/solutions/:solutionId` | ❌ | Single solution by ID |
| `POST` | `/solutions` | ✅ | Create a solution |
| `PUT` | `/solutions/:solutionId` | ✅ | Replace solution |
| `PATCH` | `/solutions/:solutionId` | ✅ | Update solution |
| `DELETE` | `/solutions/:solutionId` | ✅ | Delete solution |
| `GET` | `/solutions/random` | ❌ | Random solution |
| `GET` | `/solutions/recent` | ❌ | Recent solutions |
| `GET` | `/solutions/trending` | ❌ | Trending solutions |
| `GET` | `/solutions/topic/:topic` | ❌ | Solutions by topic |
| `GET` | `/solutions/difficulty/:difficulty` | ❌ | Solutions by difficulty |
| `GET` | `/solutions/source/:source` | ❌ | Solutions by source |
| `HEAD` | `/solutions` | ❌ | Headers only |
| `OPTIONS` | `/solutions` | ❌ | Allowed methods |

---

### 🔷 Datasets `/datasets`

| Method | Endpoint | Auth | Description |
|:---:|:---|:---:|:---|
| `GET` | `/datasets` | ❌ | All datasets |
| `GET` | `/datasets/:datasetId` | ❌ | Single dataset |
| `POST` | `/datasets` | ✅ | Create dataset |
| `PUT` | `/datasets/:datasetId` | ✅ | Replace dataset |
| `PATCH` | `/datasets/:datasetId` | ✅ | Update dataset |
| `DELETE` | `/datasets/:datasetId` | ✅ | Delete dataset *(rate limited)* |
| `GET` | `/datasets/recent` | ❌ | Recent datasets |
| `GET` | `/datasets/latest` | ❌ | Latest datasets |
| `GET` | `/datasets/source/:source` | ❌ | Filtered by source |
| `GET` | `/datasets/topic/:topic` | ❌ | Filtered by topic |
| `GET` | `/datasets/difficulty/:difficulty` | ❌ | Filtered by difficulty |
| `HEAD` | `/datasets` | ❌ | Headers only |
| `OPTIONS` | `/datasets` | ❌ | Allowed methods |

---

### 🔷 Authentication `/auth`

| Method | Endpoint | Auth | Description |
|:---:|:---|:---:|:---|
| `POST` | `/auth/register` | ❌ | Register a new user |
| `POST` | `/auth/login` | ❌ | Login and receive JWT token |
| `POST` | `/auth/logout` | ✅ | Logout current session |
| `GET` | `/auth/profile` | ✅ | View own profile |
| `PATCH` | `/auth/profile` | ✅ | Update own profile |
| `POST` | `/auth/forgot-password` | ❌ | Request password reset |
| `POST` | `/auth/reset-password` | ❌ | Reset with token |
| `POST` | `/auth/send-otp` | ❌ | Send OTP |
| `POST` | `/auth/verify-otp` | ❌ | Verify OTP |
| `POST` | `/auth/refresh-token` | ❌ | Refresh JWT token |
| `OPTIONS` | `/auth/login` | ❌ | Allowed methods |

---

### 🔷 JWT Routes `/jwt`

| Method | Endpoint | Auth | Description |
|:---:|:---|:---:|:---|
| `GET` | `/jwt/profile` | ✅ | JWT-protected profile |
| `GET` | `/jwt/dashboard` | ✅ | JWT-protected dashboard |
| `POST` | `/jwt/generate-token` | ❌ | Generate a new JWT |
| `POST` | `/jwt/verify-token` | ❌ | Verify a JWT |
| `POST` | `/jwt/refresh-token` | ❌ | Refresh JWT token |
| `GET` | `/jwt/admin` | 🔐 Admin | Admin-only route |
| `GET` | `/jwt/user` | ✅ | User-level route |
| `GET` | `/jwt/check-role/admin` | 🔐 Admin | Role verification |

---

### 🔷 Admin Routes `/admin` *(Admin JWT Required)*

| Method | Endpoint | Description |
|:---:|:---|:---|
| `GET` | `/admin/problems` | All problems — admin view |
| `GET` | `/admin/topics` | All topics — admin view |
| `GET` | `/admin/solutions` | All solutions — admin view |
| `GET` | `/admin/datasets` | All datasets — admin view |
| `GET` | `/admin/dashboard` | Admin stats dashboard |

---

### 🔷 Search Routes `/search`

| Method | Endpoint | Description |
|:---:|:---|:---|
| `GET` | `/search/problems?q=worker` | Full-text problem search |
| `GET` | `/search/problems?q=atomic` | Search atomic problems |
| `GET` | `/search/topics?q=concurrency` | Search topics |
| `GET` | `/search/topics?q=goroutines` | Search goroutine topics |
| `GET` | `/search/solutions?q=mutex` | Search solutions |
| `GET` | `/search/datasets?q=advanced` | Search datasets |

---

### 🔷 Statistics Routes `/stats` *(Aggregation Pipeline)*

| Method | Endpoint | Description |
|:---:|:---|:---|
| `GET` | `/stats/problems` | Full problem breakdown (difficulty, topic, source) |
| `GET` | `/stats/topics` | Topic stats grouped by category |
| `GET` | `/stats/difficulties` | Count by each difficulty level |
| `GET` | `/stats/datasets` | Dataset summary info |
| `GET` | `/stats/advanced-problems` | Count of advanced-only problems |
| `GET` | `/stats/topic/concurrency-patterns` | Stats for a specific topic |
| `GET` | `/stats/source/previous-ultimate-dataset` | Stats for a specific source |
| `GET` | `/stats/total-solutions` | Total solution count |
| `HEAD` | `/stats/problems` | Headers with `X-Total-Count` |

---

### 🔷 System Routes

| Method | Endpoint | Description |
|:---:|:---|:---|
| `GET` | `/health` | Server health check |
| `GET` | `/version` | API version info |
| `GET` | `/server-status` | Runtime environment status |
| `GET` | `/metrics` | Memory usage + uptime |
| `HEAD` | `/health` | Health status headers only |
| `OPTIONS` | `/health` | Allowed communication methods |

---

## 🔑 Authentication Guide

### 1 · Register a New User

```http
POST /auth/register
Content-Type: application/json
```
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

---

### 2 · Login & Receive Token

```http
POST /auth/login
Content-Type: application/json
```
```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f3a...",
    "name": "John Doe",
    "role": "user"
  }
}
```

---

### 3 · Use the Token in Protected Requests

```http
GET /auth/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> Tokens expire after `7d` by default. Use `/auth/refresh-token` to renew without re-logging in.

---

## ✅ Features Implemented

| # | Feature | Status | Notes |
|:---:|:---|:---:|:---|
| 01 | **API Response Standardization** | ✅ Done | Uniform `{ success, message, data, total, page }` on every response |
| 02 | **Request Logging Middleware** | ✅ Done | Logs `[timestamp] METHOD /route` for every incoming request |
| 03 | **Timestamp Tracking** | ✅ Done | `createdAt` + `updatedAt` auto-managed across all 5 collections |
| 04 | **Password Hashing (bcrypt)** | ✅ Done | All passwords hashed with `bcrypt.hash(password, 10)` |
| 05 | **Full-Text Search via Regex** | ✅ Done | Case-insensitive `$regex` across `instruction`, `topic`, and `output` |
| 06 | **Database Seeding Script** | ✅ Done | `npm run seed` — loads all 3,202 records in one command |
| 07 | **Role-Based Access Control** | ✅ Done | `admin` and `user` roles enforced via dedicated middleware |
| 08 | **Health Check Endpoint** | ✅ Done | `GET /health` returns uptime, status, and environment info |
| 09 | **Multi-Tier Rate Limiting** | ✅ Done | 5 separate limiters: general · strict · search · delete · upload |
| 10 | **JWT Expiry Handling** | ✅ Done | Expired tokens return `401` with a descriptive error message |

---

## 🏗️ System Design

### Monolithic MVC Architecture

```
  ┌─────────────────┐
  │  Client Request │
  └────────┬────────┘
           │
           ▼
  ┌─────────────────────────────────────┐
  │        Express Server               │
  │   CORS Middleware · Request Logger  │
  └────────┬────────────────────────────┘
           │
           ▼
  ┌─────────────────┐
  │   Rate Limiter  │ ← per-route tiers (5 levels)
  └────────┬────────┘
           │
           ▼
  ┌──────────────────┐
  │  Auth Middleware │ ← JWT token verification
  └────────┬─────────┘
           │
           ▼
  ┌──────────────────┐
  │  Role Middleware │ ← admin / user guard
  └────────┬─────────┘
           │
           ▼
  ┌──────────────────┐
  │   Controller     │ ← handles req / res only
  └────────┬─────────┘
           │
           ▼
  ┌──────────────────┐
  │    Service       │ ← all business logic & DB queries
  └────────┬─────────┘
           │
           ▼
  ┌──────────────────┐
  │  Mongoose Model  │ ← schema + validation
  └────────┬─────────┘
           │
           ▼
  ┌──────────────────┐
  │    MongoDB       │ ← persistent data storage
  └────────┬─────────┘
           │
           ▼
  ┌──────────────────┐
  │ Error Middleware │ ← global error handler
  └────────┬─────────┘
           │
           ▼
  ┌──────────────────────────────────────┐
  │  Client Response                     │
  │  { success, message, data, total }   │
  └──────────────────────────────────────┘
```

---

### Middleware Chain

```
POST /problems   →  rateLimiter  →  authMiddleware  →  controller  →  service  →  MongoDB
GET  /admin/*    →  rateLimiter  →  authMiddleware  →  roleMiddleware("admin")  →  controller
```

---

### Scaling Concepts Applied

```
🔼 Vertical Scaling    →  Increase CPU / RAM on single server instance
🔁 Horizontal Scaling  →  Multiple Node.js instances behind a load balancer
📇 Indexing            →  topic · difficulty · dataset_source · problem_number (indexed)
📄 Pagination          →  All list endpoints support ?page=&limit= out of the box
📊 Aggregation         →  MongoDB $match → $group → $project → $sort pipelines
```

---

### Aggregation Pipeline Example

```js
// Stats by difficulty — used in GET /stats/difficulties
Problem.aggregate([
  { $match: {} },
  { $group: { _id: "$difficulty", count: { $sum: 1 } } },
  { $project: { difficulty: "$_id", count: 1, _id: 0 } },
  { $sort: { count: -1 } }
])

// Sample Output:
// [
//   { difficulty: "advanced",     count: 892 },
//   { difficulty: "intermediate", count: 741 },
//   { difficulty: "medium",       count: 534 },
//   ...
// ]
```

---

<div align="center">

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Go-Epic Backend  ·  Full Stack Semester 2 Project 2026
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

*Built with precision. Documented with care. Ready for production.*

</div>
