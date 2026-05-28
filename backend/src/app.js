const express        = require("express");
const cors           = require("cors");
const loggerMiddleware = require("./middlewares/logger.middleware");
const errorMiddleware  = require("./middlewares/error.middleware");

// ── Route imports ─────────────────────────────────────────────────
const authRoutes      = require("./routes/auth.routes");
const problemRoutes   = require("./routes/problem.routes");
const topicRoutes     = require("./routes/topic.routes");
const solutionRoutes  = require("./routes/solution.routes");
const datasetRoutes   = require("./routes/dataset.routes");
const jwtRoutes       = require("./routes/jwt.routes");
const adminRoutes     = require("./routes/admin.routes");
const protectedRoutes = require("./routes/protected.routes");
const searchRoutes    = require("./routes/search.routes");

// ── Service imports (for stats routes) ───────────────────────────
const problemService = require("./services/problem.service");
const topicService   = require("./services/topic.service");
const Dataset        = require("./models/dataset.model");

const app = express();

// ── Core middlewares ──────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

// ── Main routes ───────────────────────────────────────────────────
app.use("/auth",      authRoutes);
app.use("/problems",  problemRoutes);
app.use("/topics",    topicRoutes);
app.use("/solutions", solutionRoutes);
app.use("/datasets",  datasetRoutes);
app.use("/jwt",       jwtRoutes);
app.use("/admin",     adminRoutes);
app.use("/protected", protectedRoutes);
app.use("/search",    searchRoutes);

// ── Stats routes ──────────────────────────────────────────────────
app.get("/stats/problems", async (req, res, next) => {
  try { res.json({ success: true, data: await problemService.getProblemStats() }); } catch(e){next(e);}
});
app.get("/stats/topics", async (req, res, next) => {
  try { res.json({ success: true, data: await topicService.getTopicStats() }); } catch(e){next(e);}
});
app.get("/stats/difficulties", async (req, res, next) => {
  try { res.json({ success: true, data: await problemService.getDifficultyStats() }); } catch(e){next(e);}
});
app.get("/stats/datasets", async (req, res, next) => {
  try { res.json({ success: true, data: await Dataset.find() }); } catch(e){next(e);}
});
app.get("/stats/advanced-problems", async (req, res, next) => {
  try {
    const Problem = require("./models/problem.model");
    const count = await Problem.countDocuments({ difficulty: "advanced" });
    res.json({ success: true, data: { advancedProblems: count } });
  } catch(e){next(e);}
});
app.get("/stats/topic/:topic", async (req, res, next) => {
  try { res.json({ success: true, data: await problemService.getTopicStats(req.params.topic) }); } catch(e){next(e);}
});
app.get("/stats/source/:source", async (req, res, next) => {
  try { res.json({ success: true, data: await problemService.getSourceStats(req.params.source) }); } catch(e){next(e);}
});
app.get("/stats/total-solutions", async (req, res, next) => {
  try { res.json({ success: true, data: { total: await problemService.getTotalSolutions() } }); } catch(e){next(e);}
});

// HEAD for stats
app.head("/stats/problems", async (req, res, next) => {
  try {
    const Problem = require("./models/problem.model");
    const total = await Problem.countDocuments();
    res.set("X-Total-Count", total).end();
  } catch(e){next(e);}
});

// ── Health & System routes ────────────────────────────────────────
app.get("/health",        (req, res) => res.json({ success: true, status: "ok", uptime: process.uptime() }));
app.get("/version",       (req, res) => res.json({ success: true, version: "1.0.0", project: "Go-Epic" }));
app.get("/server-status", (req, res) => res.json({ success: true, status: "running", env: process.env.NODE_ENV }));
app.get("/metrics",       (req, res) => res.json({ success: true, memory: process.memoryUsage(), uptime: process.uptime() }));

// HEAD & OPTIONS for health
app.head("/health",    (req, res) => res.set("X-Status", "ok").end());
app.options("/health", (req, res) => res.set("Allow","GET,HEAD,OPTIONS").json({ allowedMethods:["GET","HEAD","OPTIONS"] }));

// ── 404 handler ───────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// ── Global error handler ──────────────────────────────────────────
app.use(errorMiddleware);

module.exports = app;
