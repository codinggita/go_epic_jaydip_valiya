const Solution = require("../models/solution.model");

const getAllSolutions = async (query) => {
  const { difficulty, topic, source, dataset_source, sort, page = 1, limit = 10 } = query;

  const filter = {};
  if (difficulty)     filter.difficulty = difficulty;
  if (topic)          filter.topic = topic;
  if (source)         filter.source = source;
  if (dataset_source) filter.dataset_source = dataset_source;

  const skip = (Number(page) - 1) * Number(limit);
  const sortObj = sort
    ? sort.startsWith("-") ? { [sort.slice(1)]: -1 } : { [sort]: 1 }
    : { createdAt: -1 };

  const [solutions, total] = await Promise.all([
    Solution.find(filter).populate("problemId", "title topic").sort(sortObj).skip(skip).limit(Number(limit)),
    Solution.countDocuments(filter),
  ]);
  return { data: solutions, total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / Number(limit)) };
};

const getSolutionById  = async (id)       => Solution.findById(id).populate("problemId");
const createSolution   = async (data)     => Solution.create(data);
const updateSolution   = async (id, data) => Solution.findByIdAndUpdate(id, data, { new: true, runValidators: true });
const deleteSolution   = async (id)       => Solution.findByIdAndDelete(id);

const getRandomSolution = async () => {
  const count = await Solution.countDocuments();
  const random = Math.floor(Math.random() * count);
  return Solution.findOne().skip(random);
};

module.exports = {
  getAllSolutions, getSolutionById, createSolution, updateSolution, deleteSolution, getRandomSolution,
};
