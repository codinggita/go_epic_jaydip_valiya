const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/solution.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// ── Advanced / special (before /:solutionId) ──────────────────────
router.get("/random",   ctrl.getRandom);
router.get("/recent",   ctrl.getRecent);
router.get("/trending", ctrl.getTrending);

// Route parameters
router.get("/topic/:topic",           ctrl.getByTopic);
router.get("/difficulty/:difficulty", ctrl.getByDifficulty);
router.get("/source/:source",         ctrl.getBySource);

// ── Basic CRUD ────────────────────────────────────────────────────
router.get("/",               ctrl.getAll);
router.get("/:solutionId",    ctrl.getById);
router.post("/",              authMiddleware, ctrl.create);
router.put("/:solutionId",    authMiddleware, ctrl.update);
router.patch("/:solutionId",  authMiddleware, ctrl.update);
router.delete("/:solutionId", authMiddleware, ctrl.remove);

// ── HEAD & OPTIONS ────────────────────────────────────────────────
router.head("/",              ctrl.headAll);
router.head("/:solutionId",   ctrl.headById);
router.options("/",           ctrl.optionsAll);
router.options("/:solutionId",ctrl.optionsById);

module.exports = router;
