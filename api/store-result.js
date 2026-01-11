// Vercel Serverless Function to store a game result
const { kv } = require("@vercel/kv");

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { playerName, score, timestamp } = req.body;

    if (!playerName || score === undefined) {
      return res
        .status(400)
        .json({ error: "playerName and score are required" });
    }

    // Create a unique ID for this result
    const resultId = `result:${timestamp || Date.now()}:${Math.random()
      .toString(36)
      .substring(7)}`;

    // Store the result
    const result = {
      playerName: playerName.trim().substring(0, 50), // Limit name length
      score: parseInt(score),
      timestamp: timestamp || Date.now(),
    };

    await kv.set(resultId, result);

    // Also add to a sorted set for easy leaderboard retrieval
    await kv.zadd("leaderboard", {
      score: result.score,
      member: resultId,
    });

    return res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Error storing result:", error);
    return res.status(500).json({
      error: "Failed to store result",
      message: error.message,
    });
  }
};
