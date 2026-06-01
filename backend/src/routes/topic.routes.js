const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/topic.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// ── Advanced / special (before /:topicName) ───────────────────────
router.get("/popular",  ctrl.getPopular);
router.get("/trending", ctrl.getTrending);

// Route parameters
router.get("/name/:name",         ctrl.getByName);
router.get("/category/:category", ctrl.getByCategory);

// ── Basic CRUD ────────────────────────────────────────────────────
router.get("/",             ctrl.getAll);
router.get("/:topicName",   ctrl.getByTopicName);
router.post("/",            authMiddleware, ctrl.create);
router.put("/:topicName",   authMiddleware, ctrl.update);
router.patch("/:topicName", authMiddleware, ctrl.update);
router.delete("/:topicName",authMiddleware, ctrl.remove);

// ── HEAD & OPTIONS ────────────────────────────────────────────────
router.head("/",            ctrl.headAll);
router.head("/:topicName",  ctrl.headByName);
router.options("/",         ctrl.optionsAll);
router.options("/:topicName", ctrl.optionsByName);

module.exports = router;
