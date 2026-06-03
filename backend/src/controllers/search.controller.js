const Problem  = require("../models/problem.model");
const Topic    = require("../models/topic.model");
const Solution = require("../models/solution.model");
const Dataset  = require("../models/dataset.model");

const searchProblems = async (req, res, next) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;
    if (!q) return res.status(400).json({ success: false, message: "Query param ?q= is required" });
    const filter = {
      $or: [
        { instruction: { $regex: q, $options: "i" } },
        { topic:       { $regex: q, $options: "i" } },
        { output:      { $regex: q, $options: "i" } },
      ],
    };
    const skip = (Number(page) - 1) * Number(limit);
    const [data, total] = await Promise.all([
      Problem.find(filter).skip(skip).limit(Number(limit)),
      Problem.countDocuments(filter),
    ]);
    res.json({ success: true, query: q, total, page: Number(page), data });
  } catch (err) { next(err); }
};

const searchTopics = async (req, res, next) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;
    if (!q) return res.status(400).json({ success: false, message: "Query param ?q= is required" });
    const filter = { name: { $regex: q, $options: "i" } };
    const skip = (Number(page) - 1) * Number(limit);
    const [data, total] = await Promise.all([
      Topic.find(filter).skip(skip).limit(Number(limit)),
      Topic.countDocuments(filter),
    ]);
    res.json({ success: true, query: q, total, page: Number(page), data });
  } catch (err) { next(err); }
};

const searchSolutions = async (req, res, next) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;
    if (!q) return res.status(400).json({ success: false, message: "Query param ?q= is required" });
    const filter = {
      $or: [
        { content: { $regex: q, $options: "i" } },
        { topic:   { $regex: q, $options: "i" } },
      ],
    };
    const skip = (Number(page) - 1) * Number(limit);
    const [data, total] = await Promise.all([
      Solution.find(filter).skip(skip).limit(Number(limit)),
      Solution.countDocuments(filter),
    ]);
    res.json({ success: true, query: q, total, page: Number(page), data });
  } catch (err) { next(err); }
};

const searchDatasets = async (req, res, next) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;
    if (!q) return res.status(400).json({ success: false, message: "Query param ?q= is required" });
    const filter = {
      $or: [
        { source:      { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ],
    };
    const skip = (Number(page) - 1) * Number(limit);
    const [data, total] = await Promise.all([
      Dataset.find(filter).skip(skip).limit(Number(limit)),
      Dataset.countDocuments(filter),
    ]);
    res.json({ success: true, query: q, total, page: Number(page), data });
  } catch (err) { next(err); }
};

const optionsProblems = (req, res) => {
  res.set("Allow", "GET, OPTIONS").json({
    success: true, allowedMethods: ["GET", "OPTIONS"], endpoint: "/search/problems",
  });
};

module.exports = { searchProblems, searchTopics, searchSolutions, searchDatasets, optionsProblems };
