const solutionService = require("../services/solution.service");

const getAll = async (req, res, next) => {
  try {
    const result = await solutionService.getAllSolutions(req.query);
    res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

const getById = async (req, res, next) => {
  try {
    const solution = await solutionService.getSolutionById(req.params.solutionId);
    if (!solution) return res.status(404).json({ success: false, message: "Solution not found" });
    res.json({ success: true, data: solution });
  } catch (err) { next(err); }
};

const getByTopic = async (req, res, next) => {
  try {
    const result = await solutionService.getAllSolutions({ ...req.query, topic: req.params.topic });
    res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

const getByDifficulty = async (req, res, next) => {
  try {
    const result = await solutionService.getAllSolutions({ ...req.query, difficulty: req.params.difficulty });
    res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

const getBySource = async (req, res, next) => {
  try {
    const result = await solutionService.getAllSolutions({ ...req.query, source: req.params.source });
    res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

const getRandom = async (req, res, next) => {
  try {
    const solution = await solutionService.getRandomSolution();
    res.json({ success: true, data: solution });
  } catch (err) { next(err); }
};

const getRecent = async (req, res, next) => {
  try {
    const result = await solutionService.getAllSolutions({ ...req.query, sort: "-createdAt" });
    res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

const getTrending = async (req, res, next) => {
  try {
    const result = await solutionService.getAllSolutions({ ...req.query, difficulty: "advanced" });
    res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

const create = async (req, res, next) => {
  try {
    if (!req.body.problemId || !req.body.content) {
      return res.status(400).json({ success: false, message: "problemId and content are required" });
    }
    const solution = await solutionService.createSolution(req.body);
    res.status(201).json({ success: true, message: "Solution created", data: solution });
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    const solution = await solutionService.updateSolution(req.params.solutionId, req.body);
    if (!solution) return res.status(404).json({ success: false, message: "Solution not found" });
    res.json({ success: true, message: "Solution updated", data: solution });
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    const solution = await solutionService.deleteSolution(req.params.solutionId);
    if (!solution) return res.status(404).json({ success: false, message: "Solution not found" });
    res.json({ success: true, message: "Solution deleted" });
  } catch (err) { next(err); }
};

// HEAD & OPTIONS
const headAll = async (req, res, next) => {
  try {
    const Solution = require("../models/solution.model");
    const total = await Solution.countDocuments();
    res.set("X-Total-Count", total).set("X-Resource", "solutions").end();
  } catch (err) { next(err); }
};

const headById = async (req, res, next) => {
  try {
    const solution = await solutionService.getSolutionById(req.params.solutionId);
    if (!solution) return res.status(404).end();
    res.set("X-Resource-Id", req.params.solutionId).end();
  } catch (err) { next(err); }
};

const optionsAll = (req, res) => {
  res.set("Allow", "GET, POST, HEAD, OPTIONS").json({
    success: true, allowedMethods: ["GET", "POST", "HEAD", "OPTIONS"], endpoint: "/solutions",
  });
};

const optionsById = (req, res) => {
  res.set("Allow", "GET, PUT, PATCH, DELETE, HEAD, OPTIONS").json({
    success: true, allowedMethods: ["GET", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"], endpoint: "/solutions/:solutionId",
  });
};

module.exports = {
  getAll, getById, getByTopic, getByDifficulty, getBySource,
  getRandom, getRecent, getTrending, create, update, remove,
  headAll, headById, optionsAll, optionsById,
};
