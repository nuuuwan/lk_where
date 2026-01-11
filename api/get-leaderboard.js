// Vercel Serverless Function to get leaderboard results
const { list } = require("@vercel/blob");

const BLOB_STORE = "lk-where-blob";
const RESULTS_PREFIX = "results/";

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

    // List all result files from blob storage
    let leaderboardData = [];
    try {
      const { blobs } = await list({
        prefix: `${BLOB_STORE}/${RESULTS_PREFIX}`,
      });

      // Fetch and parse each result file
      const fetchPromises = blobs.map(async (blob) => {
        try {
          const response = await fetch(blob.url);
          return await response.json();
        } catch (error) {
          console.error(`Error fetching blob ${blob.pathname}:`, error);
          return null;
        }
      });

      const results = await Promise.all(fetchPromises);
      leaderboardData = results.filter((r) => r !== null);
    } catch (error) {
      console.error("Error listing blobs:", error);
      // If listing fails, return empty array
      return res.status(200).json({
        leaderboard: [],
        count: 0,
      });
    }

    // Sort by score descending and limit results
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
