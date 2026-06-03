const express    = require("express");
const router     = express.Router();
const ctrl       = require("../controllers/admin.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const { adminLimiter } = require("../middlewares/rateLimit.middleware");

const guard = [authMiddleware, roleMiddleware("admin")];

router.get("/problems",  adminLimiter, ...guard, ctrl.getProblems);
router.get("/topics",    adminLimiter, ...guard, ctrl.getTopics);
router.get("/solutions", adminLimiter, ...guard, ctrl.getSolutions);
router.get("/datasets",  adminLimiter, ...guard, ctrl.getDatasets);
router.get("/dashboard", adminLimiter, ...guard, ctrl.getDashboard);  // strict admin rate limiting

router.options("/problems",  ctrl.optionsProblems);
router.options("/topics",    ctrl.optionsTopics);
router.options("/solutions", ctrl.optionsSolutions);
router.options("/datasets",  ctrl.optionsDatasets);

module.exports = router;
