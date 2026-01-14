// API utility functions for leaderboard
const API_BASE_URL = "https://lk-where.vercel.app";

export const submitScore = async (playerName, score) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/store-result`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        playerName,
        score,
        timestamp: Date.now(),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error submitting score:", error);
    throw error;
  }
};

export const getLeaderboard = async (limit = 100) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/get-leaderboard?limit=${limit}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.leaderboard || [];
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    throw error;
  }
};

// Local storage utilities
const PLAYER_NAME_KEY = "lk_where_player_name";

export const savePlayerName = (name) => {
  localStorage.setItem(PLAYER_NAME_KEY, name);
};

export const getPlayerName = () => {
  return localStorage.getItem(PLAYER_NAME_KEY) || "";
};
