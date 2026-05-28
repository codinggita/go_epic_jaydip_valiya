const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
  {
    // ── Core fields (present in ALL 3202 records) ──────────────────
    instruction: {
      type: String,
      required: true,
      trim: true,
    },
    output: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    dataset_source: {
      type: String,
      required: true,
      enum: ["previous-ultimate-dataset", "go-source-code"],
      index: true,
    },

    // ── Difficulty (present in 2951 records) ───────────────────────
    difficulty: {
      type: String,
      enum: ["beginner", "easy", "intermediate", "medium", "advanced", "hard"],
      index: true,
    },

    // ── Web / blog / docs fields (present in 1249 records) ─────────
    url: {
      type: String,
      trim: true,
    },
    source: {
      type: String,
      enum: ["go.dev", "leetcode"],
      trim: true,
    },
    content_type: {
      type: String,
      enum: [
        "blog",
        "package_docs",
        "tutorial",
        "documentation",
        "specification",
        "case_studies",
        "faq",
        "security",
        "other",
      ],
    },

    // ── Go source code fields (present in 1681 records) ────────────
    source_file: {
      type: String,
      trim: true,
    },
    package: {
      type: String,
      trim: true,
    },
    function: {
      type: String,
      trim: true,
    },
    complexity_score: {
      type: Number,
    },

    // ── LeetCode fields (present in 572 records) ───────────────────
    problem_number: {
      type: Number,
      index: true,
    },
  },
  { timestamps: true }
);

// Text index for full-text search across instruction and output
problemSchema.index({ instruction: "text", output: "text" });

module.exports = mongoose.model("Problem", problemSchema);
