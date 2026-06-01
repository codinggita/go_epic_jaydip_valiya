const express    = require("express");
const router     = express.Router();
const ctrl       = require("../controllers/problem.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const { generalLimiter, strictLimiter, searchLimiter, deleteLimiter, uploadLimiter } = require("../middlewares/rateLimit.middleware");

// ── MUST come before /:problemId to avoid route conflicts ─────────

// Advanced special routes
router.get("/random",   generalLimiter, ctrl.getRandom);
router.get("/recent",   generalLimiter, ctrl.getRecent);
router.get("/trending", generalLimiter, ctrl.getTrending);
router.get("/advanced", generalLimiter, ctrl.getAdvanced);  // /problems/advanced?page=1&limit=5

// Route param filters
router.get("/topic/:topic",           ctrl.getByTopic);
router.get("/difficulty/:difficulty", ctrl.getByDifficulty);
router.get("/source/:source",         ctrl.getBySource);
router.get("/instruction/:keyword",   ctrl.getByKeyword);

// Import JSON (bulk upload - rate limited + admin only)
router.post("/import-json", uploadLimiter, authMiddleware, roleMiddleware("admin"), ctrl.importJson);

// ── Basic CRUD ────────────────────────────────────────────────────
router.get("/",              generalLimiter, ctrl.getAll);
router.get("/:problemId",    ctrl.getById);
router.post("/",             strictLimiter, authMiddleware, ctrl.create);
router.put("/:problemId",    authMiddleware, ctrl.update);
router.patch("/:problemId",  authMiddleware, ctrl.update);
router.delete("/:problemId", authMiddleware, ctrl.remove);

// ── HEAD & OPTIONS ────────────────────────────────────────────────
router.head("/",              ctrl.headAll);
router.head("/:problemId",    ctrl.headById);
router.options("/",           ctrl.optionsAll);
router.options("/:problemId", ctrl.optionsById);

module.exports = router;
