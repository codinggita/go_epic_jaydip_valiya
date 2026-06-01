const Topic = require("../models/topic.model");

const getAllTopics = async (query) => {
  const { search, sort, page = 1, limit = 10, category } = query;

  const filter = {};
  if (search)   filter.name = { $regex: search, $options: "i" };
  if (category) filter.category = category;

  const skip = (Number(page) - 1) * Number(limit);
  const sortObj = sort
    ? sort.startsWith("-") ? { [sort.slice(1)]: -1 } : { [sort]: 1 }
    : { problemCount: -1 };

  const [topics, total] = await Promise.all([
    Topic.find(filter).sort(sortObj).skip(skip).limit(Number(limit)),
    Topic.countDocuments(filter),
  ]);
  return { data: topics, total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / Number(limit)) };
};

const getTopicByName    = async (name) => Topic.findOne({ name });
const createTopic       = async (data) => Topic.create(data);
const updateTopic       = async (name, data) => Topic.findOneAndUpdate({ name }, data, { new: true, runValidators: true });
const deleteTopic       = async (name) => Topic.findOneAndDelete({ name });

const getPopularTopics  = async (query) => {
  const { page = 1, limit = 10 } = query;
  const skip = (Number(page) - 1) * Number(limit);
  const [topics, total] = await Promise.all([
    Topic.find().sort({ problemCount: -1 }).skip(skip).limit(Number(limit)),
    Topic.countDocuments(),
  ]);
  return { data: topics, total, page: Number(page) };
};

const getTrendingTopics = async (query) => {
  const { page = 1, limit = 10 } = query;
  const skip = (Number(page) - 1) * Number(limit);
  const [topics, total] = await Promise.all([
    Topic.find({ category: { $ne: "leetcode" } }).sort({ problemCount: -1 }).skip(skip).limit(Number(limit)),
    Topic.countDocuments(),
  ]);
  return { data: topics, total, page: Number(page) };
};

const getTopicStats = async () =>
  Topic.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 }, totalProblems: { $sum: "$problemCount" } } },
    { $sort: { totalProblems: -1 } },
  ]);

module.exports = {
  getAllTopics, getTopicByName, createTopic, updateTopic, deleteTopic,
  getPopularTopics, getTrendingTopics, getTopicStats,
};
