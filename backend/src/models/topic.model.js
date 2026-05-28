const mongoose = require("mongoose");

// Topics are derived from the dataset's "topic" field
// This collection stores metadata about each unique topic
const topicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    category: {
      // e.g. "leetcode", "concurrency", "stdlib", "devops"
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    problemCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Topic", topicSchema);
