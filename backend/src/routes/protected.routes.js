const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/protected.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/problems",  authMiddleware, ctrl.getProblems);
router.get("/topics",    authMiddleware, ctrl.getTopics);
router.get("/solutions", authMiddleware, ctrl.getSolutions);
router.get("/datasets",  authMiddleware, ctrl.getDatasets);

module.exports = router;
