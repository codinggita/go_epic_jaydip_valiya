# Go-Epic API

> A production-ready REST API for Go coding problems, topics, solutions, and datasets — built with Node.js, Express.js, and MongoDB.

[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248?logo=mongodb&logoColor=white)](https://mongodb.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
  - [Problems](#problems-routes----problems)
  - [Topics](#topics-routes----topics)
  - [Solutions](#solutions-routes----solutions)
  - [Datasets](#datasets-routes----datasets)
  - [Search](#search-routes----search)
  - [Auth](#auth-routes----auth)
  - [Stats](#stats-routes----stats)
  - [Admin](#admin-routes----admin)
  - [Utility](#utility-routes)
- [Authentication](#authentication)
- [Rate Limiting](#rate-limiting)
- [Error Handling](#error-handling)
- [Data Reference](#data-reference)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**Go-Epic** is a structured REST API that serves a curated dataset of **3,202 Go programming problems** spanning 285 unique topics — from beginner-level exercises to advanced Go source code analysis. It is designed to power learning tools, coding challenge platforms, and developer resources built around the Go language.

---

## Features

- 📦 **3,202 Go problems** seeded from a curated JSON dataset
- 🏷️ **285 unique topics** including concurrency, interfaces, generics, and more
- 🔐 **JWT authentication** with access + refresh token flow, OTP support, and role-based access control
- 🔍 **Full-text search** across problems, topics, solutions, and datasets
- 📊 **Stats endpoints** for aggregated insights by difficulty, topic, and source
- 🔄 **Pagination, sorting, and filtering** on all major list endpoints
- 🛡️ **Rate limiting** to protect the API from abuse
- 🌱 **Database seeder** to bootstrap the full dataset in one command
- 👤 **Admin panel routes** protected by JWT + admin role

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js v18+ |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Authentication | JWT (access + refresh tokens) |
| Password Hashing | bcryptjs |
| Rate Limiting | express-rate-limit |
| Dev Server | nodemon |

---

## Project Structure

```
go-epic/
||
|src/
|├── config/
|│   └── db.js                   # MongoDB connection setup
|├── models/
|│   ├── Problem.js              # Main collection (3202 records)
|│   ├── Topic.js                # 285 unique topics
|│   ├── Dataset.js              # 2 dataset source records
|│   └── User.js                 # Auth users
|├── routes/
|│   ├── problem.routes.js       # /problems
|│   ├── topic.routes.js         # /topics
|│   ├── solution.routes.js      # /solutions
|│   ├── dataset.routes.js       # /datasets
|│   ├── auth.routes.js          # /auth
|│   ├── search.routes.js        # /search
|│   ├── stats.routes.js         # /stats
|│   └── admin.routes.js         # /admin (protected)
|├── middlewares/
|│   ├── auth.middleware.js      # JWT verify + role check
|│   ├── error.middleware.js     # Global error handler
|│   └── rateLimit.middleware.js # Rate limiting
|├── services/
|│   └── pagination.service.js  # Reusable paginate utility
|├── scripts/
|│   └── seed.js                 # DB seeder from JSON
|├── data/
|│   └── go-epic.json            # Source dataset (3202 records)
|└── server.js                   # App entry point
├── .env                        # Environment variables
├── .env.example                # Example env file
├── .gitignore
|__ package.json

```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB running locally (`mongodb://localhost:27017`) or a MongoDB Atlas URI

### 1. Clone and install

```bash
git clone <your-repo-url>
cd go-epic
npm install
```

### 2. Setup environment variables

```bash
cp .env.example .env
```

Edit `.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/go-epic
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your_refresh_secret_key
JWT_REFRESH_EXPIRE=30d
```

### 3. Add the dataset

Place `go-epic.json` inside the `data/` folder:

```
go-epic/
└── data/
    └── go-epic.json
```

### 4. Seed the database

```bash
npm run seed
```

Expected output:

```
✅ MongoDB Connected: localhost
🌱 Starting seed process...
🗑️  Clearing existing collections...
   ✓ Collections cleared
📂 Reading JSON dataset...
   ✓ Loaded 3202 records
📥 Inserting problems...
   ✓ 3202 problems inserted
📥 Extracting and inserting topics...
   ✓ 285 topics inserted
📥 Inserting datasets...
   ✓ 2 datasets inserted
═══════════════════════════════════════
✅ SEED COMPLETE
   Problems : 3202
   Topics   : 285
   Datasets : 2
═══════════════════════════════════════
```

### 5. Start the server

```bash
# Development (with auto-restart)
npm run dev

# Production
npm start
```

Server runs at: `http://localhost:5000`

---

## API Reference

### Base URL

```
http://localhost:5000
```

### Standard Response Format

All successful responses follow this structure:

```json
{
  "success": true,
  "count": 10,
  "total": 3202,
  "page": 1,
  "totalPages": 321,
  "data": [...]
}
```

Single-resource responses omit pagination fields:

```json
{
  "success": true,
  "data": { ... }
}
```

Error response:

```json
{
  "success": false,
  "message": "Resource not found"
}
```

---

## Problems Routes — `/problems`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/problems` | ❌ | Get all problems (paginated) |
| GET | `/problems/:problemId` | ❌ | Get single problem by ID |
| POST | `/problems` | ✅ | Create new problem |
| PUT | `/problems/:problemId` | ✅ | Replace problem (full update) |
| PATCH | `/problems/:problemId` | ✅ | Update specific problem fields |
| DELETE | `/problems/:problemId` | ✅ | Delete problem |
| GET | `/problems/topic/:topic` | ❌ | Filter problems by topic |
| GET | `/problems/difficulty/:difficulty` | ❌ | Filter by difficulty |
| GET | `/problems/source/:source` | ❌ | Filter by dataset source |
| GET | `/problems/instruction/:keyword` | ❌ | Filter by keyword in instruction |
| GET | `/problems/random` | ❌ | Get a random problem |
| GET | `/problems/trending` | ❌ | Get trending problems |
| GET | `/problems/recent` | ❌ | Get recently added problems |
| HEAD | `/problems` | ❌ | Get response headers only |
| OPTIONS | `/problems` | ❌ | List allowed HTTP methods |

### Query Parameters for `GET /problems`

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `difficulty` | string | Filter by difficulty level | `?difficulty=advanced` |
| `topic` | string | Filter by topic slug | `?topic=concurrency-patterns` |
| `source` | string | Filter by dataset source | `?source=go-source-code` |
| `keyword` | string | Keyword search in instruction | `?keyword=worker` |
| `page` | number | Page number (default: 1) | `?page=2` |
| `limit` | number | Results per page (default: 10) | `?limit=20` |
| `sort` | string | Sort field; prefix with `-` for descending | `?sort=-difficulty` |

### POST /problems — Required fields

```json
{
  "instruction": "Build a worker pool in Go",
  "output": "package main...",
  "topic": "concurrency-patterns",
  "difficulty": "advanced",
  "dataset_source": "previous-ultimate-dataset"
}
```

### Example Requests

```bash
# Get first 5 advanced problems
GET /problems?difficulty=advanced&limit=5

# Get problems on a specific topic, sorted by difficulty
GET /problems?topic=concurrency-patterns&sort=difficulty

# Get a random problem
GET /problems/random

# Get problems from a specific source, page 2
GET /problems/source/go-source-code?page=2&limit=10
```

---

## Topics Routes — `/topics`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/topics` | ❌ | Get all topics (paginated) |
| GET | `/topics/:topicName` | ❌ | Get topic by name |
| POST | `/topics` | ✅ | Create topic |
| PUT | `/topics/:topicName` | ✅ | Replace topic (full update) |
| PATCH | `/topics/:topicName` | ✅ | Update specific topic fields |
| DELETE | `/topics/:topicName` | ✅ | Delete topic |
| GET | `/topics/name/:name` | ❌ | Find by exact name |
| GET | `/topics/category/:category` | ❌ | Filter by category |
| GET | `/topics/popular` | ❌ | Most popular topics by problem count |
| GET | `/topics/trending` | ❌ | Trending topics |

### Query Parameters for `GET /topics`

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `search` | string | Search topics by name | `?search=concurrency` |
| `sort` | string | Sort field | `?sort=name` or `?sort=-problemCount` |
| `page` | number | Page number | `?page=1` |
| `limit` | number | Results per page | `?limit=20` |

### Example Requests

```bash
# Search for concurrency-related topics
GET /topics?search=concurrency

# Get most popular topics
GET /topics/popular

# Get topics in a category
GET /topics/category/standard-library
```

---

## Solutions Routes — `/solutions`

Solutions are problems with their `output` field exposed — same underlying data, different projection.

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/solutions` | ❌ | Get all solutions (paginated) |
| GET | `/solutions/:solutionId` | ❌ | Get single solution by ID |
| POST | `/solutions` | ✅ | Create solution |
| PUT | `/solutions/:solutionId` | ✅ | Replace solution (full update) |
| PATCH | `/solutions/:solutionId` | ✅ | Update specific solution fields |
| DELETE | `/solutions/:solutionId` | ✅ | Delete solution |
| GET | `/solutions/topic/:topic` | ❌ | Filter solutions by topic |
| GET | `/solutions/difficulty/:difficulty` | ❌ | Filter by difficulty |
| GET | `/solutions/source/:source` | ❌ | Filter by source |
| GET | `/solutions/random` | ❌ | Get a random solution |
| GET | `/solutions/trending` | ❌ | Get trending solutions |
| GET | `/solutions/recent` | ❌ | Get recently added solutions |

---

## Datasets Routes — `/datasets`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/datasets` | ❌ | Get all datasets |
| GET | `/datasets/:datasetId` | ❌ | Get single dataset by ID |
| POST | `/datasets` | ✅ | Create dataset |
| PUT | `/datasets/:datasetId` | ✅ | Replace dataset (full update) |
| PATCH | `/datasets/:datasetId` | ✅ | Update specific dataset fields |
| DELETE | `/datasets/:datasetId` | ✅ | Delete dataset |
| GET | `/datasets/source/:source` | ❌ | Filter by source |
| GET | `/datasets/topic/:topic` | ❌ | Filter by topic |
| GET | `/datasets/difficulty/:difficulty` | ❌ | Filter by difficulty |
| GET | `/datasets/recent` | ❌ | Get recently added datasets |
| GET | `/datasets/latest` | ❌ | Get latest datasets (paginated) |

---

## Search Routes — `/search`

All search endpoints accept a `q` query parameter and perform case-insensitive regex matching across relevant text fields.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/search/problems?q=worker` | Search problems by instruction, topic, or output |
| GET | `/search/topics?q=concurrency` | Search topics by name or description |
| GET | `/search/solutions?q=mutex` | Search solutions by content |
| GET | `/search/datasets?q=advanced` | Search datasets by metadata |

### Example Requests

```bash
# Search for problems mentioning "goroutine"
GET /search/problems?q=goroutine

# Search for topics related to "channel"
GET /search/topics?q=channel

# Search for solutions using mutex
GET /search/solutions?q=mutex
```

---

## Auth Routes — `/auth`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | ❌ | Register a new user |
| POST | `/auth/login` | ❌ | Login and receive JWT tokens |
| POST | `/auth/logout` | ✅ | Logout and clear refresh token |
| GET | `/auth/profile` | ✅ | Get the logged-in user's profile |
| PATCH | `/auth/profile` | ✅ | Update profile details |
| POST | `/auth/forgot-password` | ❌ | Request a password reset link |
| POST | `/auth/reset-password` | ❌ | Reset password with token |
| POST | `/auth/send-otp` | ❌ | Send OTP to email |
| POST | `/auth/verify-otp` | ❌ | Verify submitted OTP |
| POST | `/auth/refresh-token` | ❌ | Exchange refresh token for new access token |

### Register

```json
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

Response:

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "64f1a...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Login

```json
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "secret123"
}
```

Response:

```json
{
  "success": true,
  "token": "eyJhbGci...",
  "refreshToken": "eyJhbGci...",
  "data": {
    "id": "64f1a...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Refresh Token

```json
POST /auth/refresh-token
Content-Type: application/json

{
  "refreshToken": "eyJhbGci..."
}
```

Response:

```json
{
  "success": true,
  "token": "eyJhbGci..."
}
```

---

## Stats Routes — `/stats`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/stats/problems` | Problem counts grouped by difficulty, topic, and source |
| GET | `/stats/topics` | Topic counts grouped by category |
| GET | `/stats/difficulties` | Total count per difficulty level |
| GET | `/stats/datasets` | All dataset metadata |
| GET | `/stats/advanced-problems` | Count of advanced-difficulty problems |
| GET | `/stats/topic/:topicName` | Stats for a specific topic |
| GET | `/stats/source/:sourceName` | Stats for a specific dataset source |
| GET | `/stats/total-solutions` | Total solution count |

### Example Response — `GET /stats/difficulties`

```json
{
  "success": true,
  "data": [
    { "difficulty": "beginner", "count": 1884 },
    { "difficulty": "intermediate", "count": 381 },
    { "difficulty": "medium", "count": 268 },
    { "difficulty": "hard", "count": 158 },
    { "difficulty": "easy", "count": 146 },
    { "difficulty": "advanced", "count": 114 },
    { "difficulty": null, "count": 251 }
  ]
}
```

---

## Admin Routes — `/admin`

> **Requires:** Valid JWT token with `role: "admin"`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/problems` | Admin view of all problems |
| GET | `/admin/topics` | Admin view of all topics |
| GET | `/admin/solutions` | Admin view of all solutions |
| GET | `/admin/datasets` | Admin view of all datasets |

To grant admin access, update the user's role directly in the database:

```javascript
db.users.updateOne({ email: "admin@example.com" }, { $set: { role: "admin" } })
```

---

## Utility Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Server health check |
| GET | `/version` | API version and environment info |

### Example Response — `GET /health`

```json
{
  "success": true,
  "status": "ok",
  "uptime": 3600,
  "timestamp": "2024-01-15T10:00:00.000Z"
}
```

---

## Authentication

Go-Epic uses **JWT-based authentication** with a dual-token strategy:

| Token | Expiry | Purpose |
|-------|--------|---------|
| Access Token | 7 days (`JWT_EXPIRE`) | Used in `Authorization` header for protected routes |
| Refresh Token | 30 days (`JWT_REFRESH_EXPIRE`) | Used to obtain a new access token without re-login |

### Using JWT in Requests

Include the access token in the `Authorization` header for all protected routes:

```bash
Authorization: Bearer <your_access_token>
```

Example with curl:

```bash
curl -H "Authorization: Bearer eyJhbGci..." \
     http://localhost:5000/auth/profile
```

### Token Lifecycle

```
Register/Login → Access Token + Refresh Token
     ↓
Access Token expires → POST /auth/refresh-token → New Access Token
     ↓
Refresh Token expires → Re-login required
```

---

## Rate Limiting

The API uses `express-rate-limit` to prevent abuse. Default limits (configurable via `rateLimit.middleware.js`):

| Scope | Limit | Window |
|-------|-------|--------|
| Global | 100 requests | 15 minutes |
| Auth routes | 10 requests | 15 minutes |

When exceeded, the API returns:

```json
{
  "success": false,
  "message": "Too many requests, please try again later."
}
```

HTTP Status: `429 Too Many Requests`

---

## Error Handling

All errors are processed by the global `error.middleware.js` and returned in a consistent format.

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| `200` | Success |
| `201` | Resource created |
| `400` | Bad request / validation error |
| `401` | Unauthorized — missing or invalid token |
| `403` | Forbidden — valid token but insufficient role |
| `404` | Resource not found |
| `409` | Conflict — resource already exists |
| `429` | Too many requests (rate limited) |
| `500` | Internal server error |

### Error Response Format

```json
{
  "success": false,
  "message": "Detailed error message here",
  "stack": "..." // Only shown in development (NODE_ENV=development)
}
```

### Validation Errors

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "instruction", "message": "instruction is required" },
    { "field": "difficulty", "message": "difficulty must be one of: beginner, intermediate, medium, hard, easy, advanced" }
  ]
}
```

---

## Data Reference

### Collections

| Collection | Documents | Description |
|------------|-----------|-------------|
| `problems` | 3,202 | All Go coding problems and their solutions |
| `topics` | 285 | Unique topic categories |
| `datasets` | 2 | Dataset source metadata |
| `users` | dynamic | Registered users |

### Difficulty Levels

| Value | Records | Description |
|-------|---------|-------------|
| `beginner` | 1,884 | Introductory Go concepts |
| `intermediate` | 381 | Core Go patterns |
| `medium` | 268 | Moderate complexity |
| `hard` | 158 | Complex challenges |
| `easy` | 146 | Simple exercises |
| `advanced` | 114 | Expert-level Go |
| `null` | 251 | Not yet classified |

### Dataset Sources

| Value | Records | Description |
|-------|---------|-------------|
| `previous-ultimate-dataset` | 1,521 | Core Go problems, LeetCode, and go.dev |
| `go-source-code` | 1,681 | Go standard library source code analysis |

### Problem Schema

```json
{
  "_id": "ObjectId",
  "instruction": "string",
  "output": "string",
  "topic": "string",
  "difficulty": "string",
  "dataset_source": "string",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Topic Schema

```json
{
  "_id": "ObjectId",
  "name": "string",
  "category": "string",
  "problemCount": "number",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

---

## Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `PORT` | ✅ | Server port | `5000` |
| `MONGO_URI` | ✅ | MongoDB connection string | `mongodb://localhost:27017/go-epic` |
| `NODE_ENV` | ✅ | Environment mode | `development` \| `production` |
| `JWT_SECRET` | ✅ | Secret key for signing access tokens | `your_super_secret_key` |
| `JWT_EXPIRE` | ✅ | Access token expiry duration | `7d` |
| `JWT_REFRESH_SECRET` | ✅ | Secret key for signing refresh tokens | `your_refresh_secret` |
| `JWT_REFRESH_EXPIRE` | ✅ | Refresh token expiry duration | `30d` |

> ⚠️ **Never commit `.env` to version control.** Use `.env.example` to document required variables.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with nodemon (auto-restart on changes) |
| `npm start` | Start production server |
| `npm run seed` | Seed the database from `data/go-epic.json` |

---

## Deployment

### Deploy to a VPS (e.g. Ubuntu + PM2)

```bash
# Install PM2 globally
npm install -g pm2

# Start the app with PM2
pm2 start server.js --name go-epic

# Enable auto-restart on reboot
pm2 startup
pm2 save
```

### Deploy to Railway / Render / Fly.io

1. Push your repo to GitHub.
2. Connect it to your hosting provider.
3. Set all environment variables from `.env.example` in the dashboard.
4. Set the start command to `npm start`.
5. Run `npm run seed` from the provider's shell or a one-off job after deployment.

### Using MongoDB Atlas

Replace the `MONGO_URI` in your `.env` with your Atlas connection string:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/go-epic?retryWrites=true&w=majority
```

---

## Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes and commit: `git commit -m 'feat: add my feature'`
4. Push to your fork: `git push origin feature/my-feature`
5. Open a pull request

### Commit Message Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new endpoint
fix: resolve pagination bug
docs: update README
refactor: clean up auth middleware
test: add unit tests for pagination service
```

---

## License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">Built with ❤️ for the Go developer community</p>