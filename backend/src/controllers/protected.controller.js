const Problem  = require("../models/problem.model");
const Topic    = require("../models/topic.model");
const Solution = require("../models/solution.model");
const Dataset  = require("../models/dataset.model");

const getProblems = async (req, res, next) => {
  try {
    const problems = await Problem.find().limit(20);
    res.json({ success: true, message: "Protected: problems", user: req.user, data: problems });
  } catch (err) { next(err); }
};

const getTopics = async (req, res, next) => {
  try {
    const topics = await Topic.find().limit(20);
    res.json({ success: true, message: "Protected: topics", user: req.user, data: topics });
  } catch (err) { next(err); }
};

const getSolutions = async (req, res, next) => {
  try {
    const solutions = await Solution.find().limit(20);
    res.json({ success: true, message: "Protected: solutions", user: req.user, data: solutions });
  } catch (err) { next(err); }
};

const getDatasets = async (req, res, next) => {
  try {
    const datasets = await Dataset.find();
    res.json({ success: true, message: "Protected: datasets", user: req.user, data: datasets });
  } catch (err) { next(err); }
};

module.exports = { getProblems, getTopics, getSolutions, getDatasets };
