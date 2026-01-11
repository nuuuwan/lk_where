// Vercel Serverless Function to get leaderboard results
const { head } = require("@vercel/blob");

const BLOB_STORE = "lk-where-blob";
const LEADERBOARD_FILE = "leaderboard.json";

module.exports = async (req, res) => {
  // Enable CORS for all responses
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", "86400");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const limit = parseInt(req.query.limit) || 100;

    // Fetch leaderboard data from blob storage
    let leaderboardData = [];
    try {
      const blobExists = await head(`${BLOB_STORE}/${LEADERBOARD_FILE}`);
      if (blobExists) {
        const response = await fetch(blobExists.url);
        leaderboardData = await response.json();
      }
    } catch (error) {
      // File doesn't exist yet, return empty array
      return res.status(200).json({
        leaderboard: [],
        count: 0,
      });
    }

    // Limit results and ensure sorted by score descending
    const limitedResults = leaderboardData
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    return res.status(200).json({
      leaderboard: limitedResults,
      count: limitedResults.length,
    });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return res.status(500).json({
      error: "Failed to fetch leaderboard",
      message: error.message,
    });
  }
};
