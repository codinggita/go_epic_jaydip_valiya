/**
 * SEED SCRIPT — Go-Epic
 * ─────────────────────
 * Run once to load dataset into MongoDB:
 *   node src/seed.js
 *
 * Place your downloaded JSON file at the project root as: go-epic.json
 */

require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Problem = require("./models/problem.model");
const Topic = require("./models/topic.model");
const Dataset = require("./models/dataset.model");

// ── Adjust this path to your downloaded JSON file ─────────────────
const RAW_DATA = require("../go-epic.json");

const seed = async () => {
  await connectDB();

  console.log(`📦 Dataset loaded: ${RAW_DATA.length} records`);

  // ── 1. Clear existing data ──────────────────────────────────────
  await Promise.all([
    Problem.deleteMany(),
    Topic.deleteMany(),
    Dataset.deleteMany(),
  ]);
  console.log("🗑️  Cleared existing data");

  // ── 2. Insert all problems ──────────────────────────────────────
  const problems = await Problem.insertMany(RAW_DATA, { ordered: false });
  console.log(`✅ Inserted ${problems.length} problems`);

  // ── 3. Build Topics collection from unique topic values ─────────
  const topicMap = {};
  RAW_DATA.forEach((item) => {
    if (!item.topic) return;
    if (!topicMap[item.topic]) topicMap[item.topic] = 0;
    topicMap[item.topic]++;
  });

  const topicDocs = Object.entries(topicMap).map(([name, count]) => ({
    name,
    problemCount: count,
    category: name.startsWith("leetcode")
      ? "leetcode"
      : name.includes("devops") || name.toLowerCase().includes("DevOps")
      ? "devops"
      : name.includes("domain")
      ? "domain"
      : "general",
  }));

  await Topic.insertMany(topicDocs, { ordered: false });
  console.log(`✅ Inserted ${topicDocs.length} topics`);

  // ── 4. Build Datasets collection from dataset_source values ─────
  const datasetSources = ["previous-ultimate-dataset", "go-source-code"];

  for (const src of datasetSources) {
    const records = RAW_DATA.filter((i) => i.dataset_source === src);
    const uniqueTopics = [...new Set(records.map((i) => i.topic).filter(Boolean))];
    const uniqueDifficulties = [...new Set(records.map((i) => i.difficulty).filter(Boolean))];

    // Aggregated stats
    const byDifficulty = {};
    records.forEach((r) => {
      if (r.difficulty) byDifficulty[r.difficulty] = (byDifficulty[r.difficulty] || 0) + 1;
    });

    await Dataset.create({
      source: src,
      description:
        src === "go-source-code"
          ? "Go standard library source code analysis and explanations"
          : "Curated Go programming problems across multiple topics",
      totalProblems: records.length,
      topics: uniqueTopics,
      difficulties: uniqueDifficulties,
      stats: { byDifficulty },
    });
  }
  console.log("✅ Inserted 2 dataset records");

  console.log("\n🎉 Seeding complete! Summary:");
  console.log(`   Problems : ${problems.length}`);
  console.log(`   Topics   : ${topicDocs.length}`);
  console.log(`   Datasets : ${datasetSources.length}`);

  await mongoose.disconnect();
  process.exit(0);
};

seed().catch((err) => {
  console.error("❌ Seed failed:", err.message);
  process.exit(1);
});
