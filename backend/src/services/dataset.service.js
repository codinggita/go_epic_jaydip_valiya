const Dataset = require("../models/dataset.model");

const getAllDatasets = async (query) => {
  const { source, topic, difficulty, sort, page = 1, limit = 10 } = query;
  const filter = {};
  if (source) filter.source = { $regex: source, $options: "i" };
  if (topic) filter.topic = topic;
  if (difficulty) filter.difficulty = difficulty;
  const skip = (Number(page) - 1) * Number(limit);
  const sortObj = sort ? { [sort.replace("-", "")]: sort.startsWith("-") ? -1 : 1 } : {};
  const [datasets, total] = await Promise.all([
    Dataset.find(filter).sort(sortObj).skip(skip).limit(Number(limit)),
    Dataset.countDocuments(filter),
  ]);
  return { datasets, total };
};

const getDatasetById = async (id) => Dataset.findById(id);
const createDataset = async (data) => Dataset.create(data);
const updateDataset = async (id, data) => Dataset.findByIdAndUpdate(id, data, { new: true, runValidators: true });
const deleteDataset = async (id) => Dataset.findByIdAndDelete(id);

module.exports = { getAllDatasets, getDatasetById, createDataset, updateDataset, deleteDataset };
