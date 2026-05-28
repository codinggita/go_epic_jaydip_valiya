const mongoose = require("mongoose");

// Datasets represent grouped collections of problems by source
// Each document = one dataset source group with its stats
const datasetSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      required: true,
      enum: ["previous-ultimate-dataset", "go-source-code"],
      unique: true,
      index: true,
    },
    description: {
      type: String,
      trim: true,
    },
    totalProblems: {
      type: Number,
      default: 0,
    },
    topics: [{ type: String }],
    difficulties: [{ type: String }],
    // Breakdown stats stored as mixed object
    stats: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Dataset", datasetSchema);
