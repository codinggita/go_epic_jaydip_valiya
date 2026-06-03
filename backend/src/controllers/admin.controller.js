const Problem = require("../models/problem.model");
const Topic   = require("../models/topic.model");
const Solution = require("../models/solution.model");
const Dataset  = require("../models/dataset.model");

const getProblems = async (req, res, next) => {
  try {
    const problems = await Problem.find().sort({ createdAt: -1 }).limit(50);
    const total = await Problem.countDocuments();
    res.json({ success: true, message: "Admin: problems fetched", total, data: problems });
  } catch (err) { next(err); }
};

const getTopics = async (req, res, next) => {
  try {
    const topics = await Topic.find().sort({ problemCount: -1 });
    res.json({ success: true, message: "Admin: topics fetched", data: topics });
  } catch (err) { next(err); }
};

const getSolutions = async (req, res, next) => {
  try {
    const solutions = await Solution.find().sort({ createdAt: -1 }).limit(50);
    res.json({ success: true, message: "Admin: solutions fetched", data: solutions });
  } catch (err) { next(err); }
};

const getDatasets = async (req, res, next) => {
  try {
    const datasets = await Dataset.find();
    res.json({ success: true, message: "Admin: datasets fetched", data: datasets });
  } catch (err) { next(err); }
};

const getDashboard = async (req, res, next) => {
  try {
    const [problems, topics, solutions, datasets] = await Promise.all([
      Problem.countDocuments(),
      Topic.countDocuments(),
      Solution.countDocuments(),
      Dataset.countDocuments(),
    ]);
    res.json({
      success: true,
      message: "Admin dashboard",
      data: { problems, topics, solutions, datasets, uptime: process.uptime() },
    });
  } catch (err) { next(err); }
};

// OPTIONS handlers
const optionsProblems  = (req, res) => res.set("Allow","GET,OPTIONS").json({ allowedMethods:["GET","OPTIONS"] });
const optionsTopics    = (req, res) => res.set("Allow","GET,OPTIONS").json({ allowedMethods:["GET","OPTIONS"] });
const optionsSolutions = (req, res) => res.set("Allow","GET,OPTIONS").json({ allowedMethods:["GET","OPTIONS"] });
const optionsDatasets  = (req, res) => res.set("Allow","GET,OPTIONS").json({ allowedMethods:["GET","OPTIONS"] });

module.exports = {
  getProblems, getTopics, getSolutions, getDatasets, getDashboard,
  optionsProblems, optionsTopics, optionsSolutions, optionsDatasets,
};
