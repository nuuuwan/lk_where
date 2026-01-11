// Vercel Serverless Function to store a game result
const { put } = require("@vercel/blob");

const BLOB_STORE = "lk-where-blob";
const RESULTS_PREFIX = "results/";

module.exports = async (req, res) => {
  // Enable CORS for all responses
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", "86400");

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

    // Create the result object
    const resultTimestamp = timestamp || Date.now();
    const result = {
      playerName: playerName.trim().substring(0, 50), // Limit name length
      score: parseInt(score),
      timestamp: resultTimestamp,
    };

    // Store each result as a separate file with timestamp-based filename
    const fileName = `${RESULTS_PREFIX}${resultTimestamp}-${Math.random()
      .toString(36)
      .substring(7)}.json`;

    await put(`${BLOB_STORE}/${fileName}`, JSON.stringify(result), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
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
