// Vercel Serverless Function to store a game result
const { put, head } = require("@vercel/blob");

const BLOB_STORE = "lk-where-blob";
const LEADERBOARD_FILE = "leaderboard.json";

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

    // Store the result
    const result = {
      playerName: playerName.trim().substring(0, 50), // Limit name length
      score: parseInt(score),
      timestamp: timestamp || Date.now(),
    };

    // Fetch existing leaderboard data
    let leaderboardData = [];
    try {
      const blobExists = await head(`${BLOB_STORE}/${LEADERBOARD_FILE}`);
      if (blobExists) {
        const response = await fetch(blobExists.url);
        leaderboardData = await response.json();
      }
    } catch (error) {
      // File doesn't exist yet, start with empty array
      leaderboardData = [];
    }

    // Add new result
    leaderboardData.push(result);

    // Sort by score descending
    leaderboardData.sort((a, b) => b.score - a.score);

    // Store updated leaderboard
    await put(
      `${BLOB_STORE}/${LEADERBOARD_FILE}`,
      JSON.stringify(leaderboardData),
      {
        access: "public",
        contentType: "application/json",
      }
    );

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
