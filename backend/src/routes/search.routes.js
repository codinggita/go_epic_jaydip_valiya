const express = require("express");
const router  = express.Router();
const ctrl    = require("../controllers/search.controller");
const { searchLimiter } = require("../middlewares/rateLimit.middleware");

router.get("/problems",  searchLimiter, ctrl.searchProblems);   // limit excessive searches
router.get("/topics",    searchLimiter, ctrl.searchTopics);
router.get("/solutions", searchLimiter, ctrl.searchSolutions);
router.get("/datasets",  searchLimiter, ctrl.searchDatasets);

router.options("/problems", ctrl.optionsProblems);

module.exports = router;
