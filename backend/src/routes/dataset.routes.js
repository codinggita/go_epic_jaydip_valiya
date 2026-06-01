const express    = require("express");
const router     = express.Router();
const ctrl       = require("../controllers/dataset.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { generalLimiter, deleteLimiter } = require("../middlewares/rateLimit.middleware");

// Advanced / special (before /:datasetId)
router.get("/recent",  ctrl.getRecent);
router.get("/latest",  ctrl.getLatest);

// Route parameters
router.get("/source/:source",         ctrl.getBySource);
router.get("/topic/:topic",           ctrl.getByTopic);
router.get("/difficulty/:difficulty", ctrl.getByDifficulty);

// Basic CRUD
router.get("/",               generalLimiter, ctrl.getAll);
router.get("/:datasetId",     ctrl.getById);
router.post("/",              authMiddleware, ctrl.create);
router.put("/:datasetId",     authMiddleware, ctrl.update);
router.patch("/:datasetId",   authMiddleware, ctrl.update);
router.delete("/:datasetId",  deleteLimiter, authMiddleware, ctrl.remove);  // limit deletes

// HEAD & OPTIONS
router.head("/",              ctrl.headAll);
router.head("/:datasetId",    ctrl.headById);
router.options("/",           ctrl.optionsAll);
router.options("/:datasetId", ctrl.optionsById);

module.exports = router;
