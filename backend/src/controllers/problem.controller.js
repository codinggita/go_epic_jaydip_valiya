const problemService = require("../services/problem.service");

// ── CRUD ──────────────────────────────────────────────────────────
const getAll = async (req, res, next) => {
  try {
    const result = await problemService.getAllProblems(req.query);
    res.json({ success: true, message: "Problems fetched", ...result });
  } catch (err) { next(err); }
};

const getById = async (req, res, next) => {
  try {
    const problem = await problemService.getProblemById(req.params.problemId);
    if (!problem) return res.status(404).json({ success: false, message: "Problem not found" });
    res.json({ success: true, data: problem });
  } catch (err) { next(err); }
};

const create = async (req, res, next) => {
  try {
    const { instruction, output, topic, dataset_source } = req.body;
    if (!instruction || !output || !topic || !dataset_source) {
      return res.status(400).json({ success: false, message: "instruction, output, topic, dataset_source are required" });
    }
    const problem = await problemService.createProblem(req.body);
    res.status(201).json({ success: true, message: "Problem created", data: problem });
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    const problem = await problemService.updateProblem(req.params.problemId, req.body);
    if (!problem) return res.status(404).json({ success: false, message: "Problem not found" });
    res.json({ success: true, message: "Problem updated", data: problem });
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    const problem = await problemService.deleteProblem(req.params.problemId);
    if (!problem) return res.status(404).json({ success: false, message: "Problem not found" });
    res.json({ success: true, message: "Problem deleted" });
  } catch (err) { next(err); }
};

// ── Route param filters ───────────────────────────────────────────
const getByTopic = async (req, res, next) => {
  try {
    const result = await problemService.getAllProblems({ ...req.query, topic: req.params.topic });
    res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

const getByDifficulty = async (req, res, next) => {
  try {
    const result = await problemService.getAllProblems({ ...req.query, difficulty: req.params.difficulty });
    res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

const getBySource = async (req, res, next) => {
  try {
    const result = await problemService.getAllProblems({ ...req.query, dataset_source: req.params.source });
    res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

const getByKeyword = async (req, res, next) => {
  try {
    const result = await problemService.getAllProblems({ ...req.query, keyword: req.params.keyword });
    res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

// ── Advanced ──────────────────────────────────────────────────────
const getRandom = async (req, res, next) => {
  try {
    const problem = await problemService.getRandomProblem(req.query);
    res.json({ success: true, data: problem });
  } catch (err) { next(err); }
};

const getRecent = async (req, res, next) => {
  try {
    const problems = await problemService.getRecentProblems(req.query.limit);
    res.json({ success: true, data: problems });
  } catch (err) { next(err); }
};

const getTrending = async (req, res, next) => {
  try {
    const problems = await problemService.getTrendingProblems(req.query.limit);
    res.json({ success: true, data: problems });
  } catch (err) { next(err); }
};

// ── Stats ─────────────────────────────────────────────────────────
const getStats = async (req, res, next) => {
  try {
    const stats = await problemService.getProblemStats();
    res.json({ success: true, data: stats });
  } catch (err) { next(err); }
};

const getDifficultyStats = async (req, res, next) => {
  try {
    const stats = await problemService.getDifficultyStats();
    res.json({ success: true, data: stats });
  } catch (err) { next(err); }
};

const getTopicStats = async (req, res, next) => {
  try {
    const stats = await problemService.getTopicStats(req.params.topic);
    res.json({ success: true, data: stats });
  } catch (err) { next(err); }
};

const getSourceStats = async (req, res, next) => {
  try {
    const stats = await problemService.getSourceStats(req.params.source);
    res.json({ success: true, data: stats });
  } catch (err) { next(err); }
};

const getTotalSolutions = async (req, res, next) => {
  try {
    const total = await problemService.getTotalSolutions();
    res.json({ success: true, data: { total } });
  } catch (err) { next(err); }
};

// ── Import JSON (bulk) ────────────────────────────────────────────
const importJson = async (req, res, next) => {
  try {
    const data = req.body;
    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ success: false, message: "Body must be a non-empty JSON array" });
    }
    const Problem = require("../models/problem.model");
    const result = await Problem.insertMany(data, { ordered: false });
    res.status(201).json({ success: true, message: `${result.length} problems imported`, count: result.length });
  } catch (err) { next(err); }
};

// ── HEAD & OPTIONS ────────────────────────────────────────────────
const headAll = async (req, res, next) => {
  try {
    const Problem = require("../models/problem.model");
    const total = await Problem.countDocuments();
    res.set("X-Total-Count", total).set("X-Resource", "problems").end();
  } catch (err) { next(err); }
};

const headById = async (req, res, next) => {
  try {
    const problem = await problemService.getProblemById(req.params.problemId);
    if (!problem) return res.status(404).end();
    res.set("X-Resource-Id", req.params.problemId).end();
  } catch (err) { next(err); }
};

const optionsAll = (req, res) => {
  res.set("Allow", "GET, POST, HEAD, OPTIONS").json({
    success: true,
    allowedMethods: ["GET", "POST", "HEAD", "OPTIONS"],
    endpoint: "/problems",
  });
};

const optionsById = (req, res) => {
  res.set("Allow", "GET, PUT, PATCH, DELETE, HEAD, OPTIONS").json({
    success: true,
    allowedMethods: ["GET", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
    endpoint: "/problems/:problemId",
  });
};

// getAdvanced handler
const getAdvanced = async (req, res, next) => {
  try {
    const result = await problemService.getAllProblems({ ...req.query, difficulty: "advanced" });
    res.json({ success: true, message: "Advanced problems fetched", ...result });
  } catch (err) { next(err); }
};

module.exports = {
  getAll, getById, create, update, remove,
  getByTopic, getByDifficulty, getBySource, getByKeyword,
  getRandom, getRecent, getTrending,
  getStats, getDifficultyStats, getTopicStats, getSourceStats, getTotalSolutions,
  importJson, getAdvanced,
  headAll, headById, optionsAll, optionsById,
};

