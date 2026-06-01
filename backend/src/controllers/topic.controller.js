const topicService = require("../services/topic.service");

const getAll = async (req, res, next) => {
  try {
    const result = await topicService.getAllTopics(req.query);
    res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

const getByTopicName = async (req, res, next) => {
  try {
    const topic = await topicService.getTopicByName(req.params.topicName);
    if (!topic) return res.status(404).json({ success: false, message: "Topic not found" });
    res.json({ success: true, data: topic });
  } catch (err) { next(err); }
};

// /topics/name/:name
const getByName = async (req, res, next) => {
  try {
    const topic = await topicService.getTopicByName(req.params.name);
    if (!topic) return res.status(404).json({ success: false, message: "Topic not found" });
    res.json({ success: true, data: topic });
  } catch (err) { next(err); }
};

// /topics/category/:category
const getByCategory = async (req, res, next) => {
  try {
    const result = await topicService.getAllTopics({ ...req.query, category: req.params.category });
    res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

const getPopular = async (req, res, next) => {
  try {
    const result = await topicService.getPopularTopics(req.query);
    res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

const getTrending = async (req, res, next) => {
  try {
    const result = await topicService.getTrendingTopics(req.query);
    res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

const create = async (req, res, next) => {
  try {
    if (!req.body.name) return res.status(400).json({ success: false, message: "Topic name is required" });
    const topic = await topicService.createTopic(req.body);
    res.status(201).json({ success: true, message: "Topic created", data: topic });
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ success: false, message: "No update fields provided" });
    }
    const topic = await topicService.updateTopic(req.params.topicName, req.body);
    if (!topic) return res.status(404).json({ success: false, message: "Topic not found" });
    res.json({ success: true, message: "Topic updated", data: topic });
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    const topic = await topicService.deleteTopic(req.params.topicName);
    if (!topic) return res.status(404).json({ success: false, message: "Topic not found" });
    res.json({ success: true, message: "Topic deleted" });
  } catch (err) { next(err); }
};

// HEAD & OPTIONS
const headAll = async (req, res, next) => {
  try {
    const Topic = require("../models/topic.model");
    const total = await Topic.countDocuments();
    res.set("X-Total-Count", total).set("X-Resource", "topics").end();
  } catch (err) { next(err); }
};

const headByName = async (req, res, next) => {
  try {
    const topic = await topicService.getTopicByName(req.params.topicName);
    if (!topic) return res.status(404).end();
    res.set("X-Resource-Name", req.params.topicName).end();
  } catch (err) { next(err); }
};

const optionsAll = (req, res) => {
  res.set("Allow", "GET, POST, HEAD, OPTIONS").json({
    success: true, allowedMethods: ["GET", "POST", "HEAD", "OPTIONS"], endpoint: "/topics",
  });
};

const optionsByName = (req, res) => {
  res.set("Allow", "GET, PUT, PATCH, DELETE, HEAD, OPTIONS").json({
    success: true, allowedMethods: ["GET", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"], endpoint: "/topics/:topicName",
  });
};

module.exports = {
  getAll, getByTopicName, getByName, getByCategory,
  getPopular, getTrending, create, update, remove,
  headAll, headByName, optionsAll, optionsByName,
};
