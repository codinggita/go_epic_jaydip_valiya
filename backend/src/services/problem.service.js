const Problem = require("../models/problem.model");

const getAllProblems = async (query) => {
  const {
    difficulty, topic, source, dataset_source,
    keyword, q, content_type, package: pkg,
    sort, page = 1, limit = 10,
  } = query;

  const filter = {};

  // Filters
  if (difficulty)      filter.difficulty = difficulty;
  if (topic)           filter.topic = topic;
  if (source)          filter.source = source;
  if (dataset_source)  filter.dataset_source = dataset_source;
  if (content_type)    filter.content_type = content_type;
  if (pkg)             filter.package = pkg;

  // Keyword search on instruction (route param style)
  if (keyword) filter.instruction = { $regex: keyword, $options: "i" };

  // Full search (query param ?q=) — searches instruction + topic
  if (q) {
    filter.$or = [
      { instruction: { $regex: q, $options: "i" } },
      { topic:       { $regex: q, $options: "i" } },
      { output:      { $regex: q, $options: "i" } },
    ];
  }

  // Sorting
  const sortObj = sort
    ? sort.startsWith("-")
      ? { [sort.slice(1)]: -1 }
      : { [sort]: 1 }
    : { createdAt: -1 };

  const skip = (Number(page) - 1) * Number(limit);

  const [problems, total] = await Promise.all([
    Problem.find(filter).sort(sortObj).skip(skip).limit(Number(limit)),
    Problem.countDocuments(filter),
  ]);

  return {
    data: problems,
    total,
    page: Number(page),
    limit: Number(limit),
    totalPages: Math.ceil(total / Number(limit)),
  };
};

const getProblemById = async (id) => Problem.findById(id);

const createProblem = async (data) => Problem.create(data);

const updateProblem = async (id, data) =>
  Problem.findByIdAndUpdate(id, data, { new: true, runValidators: true });

const deleteProblem = async (id) => Problem.findByIdAndDelete(id);

const getRandomProblem = async (query = {}) => {
  const filter = {};
  if (query.difficulty) filter.difficulty = query.difficulty;
  if (query.topic)      filter.topic = query.topic;
  const count = await Problem.countDocuments(filter);
  const random = Math.floor(Math.random() * count);
  return Problem.findOne(filter).skip(random);
};

const getRecentProblems = async (limit = 10) =>
  Problem.find().sort({ createdAt: -1 }).limit(Number(limit));

const getTrendingProblems = async (limit = 10) =>
  Problem.find({ difficulty: "advanced" }).limit(Number(limit));

// ── Aggregation ───────────────────────────────────────────────────

const getProblemStats = async () => {
  const [byDifficulty, byTopic, bySource, byDatasetSource, total] = await Promise.all([
    Problem.aggregate([
      { $group: { _id: "$difficulty", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),
    Problem.aggregate([
      { $group: { _id: "$topic", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 20 },
    ]),
    Problem.aggregate([
      { $match: { source: { $exists: true } } },
      { $group: { _id: "$source", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),
    Problem.aggregate([
      { $group: { _id: "$dataset_source", count: { $sum: 1 } } },
    ]),
    Problem.countDocuments(),
  ]);

  return { total, byDifficulty, byTopic, bySource, byDatasetSource };
};

const getDifficultyStats = async () =>
  Problem.aggregate([
    { $group: { _id: "$difficulty", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

const getTopicStats = async (topicName) =>
  Problem.aggregate([
    { $match: { topic: topicName } },
    { $group: { _id: "$difficulty", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

const getSourceStats = async (source) =>
  Problem.aggregate([
    { $match: { dataset_source: source } },
    { $group: { _id: "$topic", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

const getTotalSolutions = async () => Problem.countDocuments();

module.exports = {
  getAllProblems, getProblemById, createProblem, updateProblem, deleteProblem,
  getRandomProblem, getRecentProblems, getTrendingProblems,
  getProblemStats, getDifficultyStats, getTopicStats, getSourceStats, getTotalSolutions,
};
