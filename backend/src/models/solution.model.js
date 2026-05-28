const mongoose = require("mongoose");

// Solutions are the "output" field extracted from problems
// This gives solutions their own collection for independent querying
const solutionSchema = new mongoose.Schema(
  {
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
      index: true,
    },
    topic: {
      type: String,
      trim: true,
      index: true,
    },
    difficulty: {
      type: String,
      enum: ["beginner", "easy", "intermediate", "medium", "advanced", "hard"],
      index: true,
    },
    dataset_source: {
      type: String,
      enum: ["previous-ultimate-dataset", "go-source-code"],
    },
    source: {
      type: String,
      enum: ["go.dev", "leetcode"],
    },
    // The full solution output (code + explanation)
    content: {
      type: String,
      required: true,
    },
    // Extracted language (most are Go)
    language: {
      type: String,
      default: "go",
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Solution", solutionSchema);
