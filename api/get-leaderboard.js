// Vercel Serverless Function to get leaderboard results
const { kv } = require("@vercel/kv");

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const limit = parseInt(req.query.limit) || 100;

    // Get top scores from sorted set (descending order)
    const topResultIds = await kv.zrange("leaderboard", 0, limit - 1, {
      rev: true,
    });

    if (!topResultIds || topResultIds.length === 0) {
      return res.status(200).json({
        leaderboard: [],
        count: 0,
      });
    }

    // Fetch all the results
    const results = await Promise.all(
      topResultIds.map(async (id) => {
        const result = await kv.get(id);
        return result;
      })
    );

    // Filter out any null results and sort by score descending
    const validResults = results
      .filter((r) => r !== null)
      .sort((a, b) => b.score - a.score);

    return res.status(200).json({
      leaderboard: validResults,
      count: validResults.length,
    });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return res.status(500).json({
      error: "Failed to fetch leaderboard",
      message: error.message,
    });
  }
};
