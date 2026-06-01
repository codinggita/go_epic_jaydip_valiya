const datasetService = require("../services/dataset.service");

const getAll = async (req, res, next) => {
  try {
    const result = await datasetService.getAllDatasets(req.query);
    res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

const getById = async (req, res, next) => {
  try {
    const dataset = await datasetService.getDatasetById(req.params.datasetId);
    if (!dataset) return res.status(404).json({ success: false, message: "Dataset not found" });
    res.json({ success: true, data: dataset });
  } catch (err) { next(err); }
};

const getBySource = async (req, res, next) => {
  try {
    const result = await datasetService.getAllDatasets({ ...req.query, source: req.params.source });
    res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

const getByTopic = async (req, res, next) => {
  try {
    const result = await datasetService.getAllDatasets({ ...req.query, topic: req.params.topic });
    res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

const getByDifficulty = async (req, res, next) => {
  try {
    const result = await datasetService.getAllDatasets({ ...req.query, difficulty: req.params.difficulty });
    res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

const getRecent = async (req, res, next) => {
  try {
    const result = await datasetService.getAllDatasets({ sort: "-createdAt", limit: req.query.limit || 5 });
    res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

const getLatest = async (req, res, next) => {
  try {
    const result = await datasetService.getAllDatasets({ sort: "-createdAt", limit: req.query.limit || 5 });
    res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

const create = async (req, res, next) => {
  try {
    if (!req.body.source) return res.status(400).json({ success: false, message: "source is required" });
    const dataset = await datasetService.createDataset(req.body);
    res.status(201).json({ success: true, message: "Dataset created", data: dataset });
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    const dataset = await datasetService.updateDataset(req.params.datasetId, req.body);
    if (!dataset) return res.status(404).json({ success: false, message: "Dataset not found" });
    res.json({ success: true, message: "Dataset updated", data: dataset });
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    const dataset = await datasetService.deleteDataset(req.params.datasetId);
    if (!dataset) return res.status(404).json({ success: false, message: "Dataset not found" });
    res.json({ success: true, message: "Dataset deleted" });
  } catch (err) { next(err); }
};

// HEAD & OPTIONS
const headAll = async (req, res, next) => {
  try {
    const Dataset = require("../models/dataset.model");
    const total = await Dataset.countDocuments();
    res.set("X-Total-Count", total).set("X-Resource", "datasets").end();
  } catch (err) { next(err); }
};

const headById = async (req, res, next) => {
  try {
    const dataset = await datasetService.getDatasetById(req.params.datasetId);
    if (!dataset) return res.status(404).end();
    res.set("X-Resource-Id", req.params.datasetId).end();
  } catch (err) { next(err); }
};

const optionsAll = (req, res) => {
  res.set("Allow", "GET, POST, HEAD, OPTIONS").json({
    success: true, allowedMethods: ["GET", "POST", "HEAD", "OPTIONS"], endpoint: "/datasets",
  });
};

const optionsById = (req, res) => {
  res.set("Allow", "GET, PUT, PATCH, DELETE, HEAD, OPTIONS").json({
    success: true, allowedMethods: ["GET", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"], endpoint: "/datasets/:datasetId",
  });
};

module.exports = {
  getAll, getById, getBySource, getByTopic, getByDifficulty,
  getRecent, getLatest, create, update, remove,
  headAll, headById, optionsAll, optionsById,
};
