// components/Leaderboard/localStorageHandler.js

const STORAGE_KEY = 'typingTestScores';

export const getScores = () => {
  const rawScores = localStorage.getItem(STORAGE_KEY);
  if (!rawScores) {
    return [];
  }
  
  try {
    const scores = JSON.parse(rawScores);
    return scores.sort((a, b) => b.wpm - a.wpm);
  } catch (e) {
    console.error("Gagal mem-parsing skor dari LocalStorage:", e);
    return [];
  }
};

export const addScore = (wpm, accuracy) => {
  if (wpm === 0) return;
  
  const currentScores = getScores();
  
  const newScore = {
    wpm: wpm,
    accuracy: accuracy,
    timestamp: Date.now(),
  };

  currentScores.push(newScore);
  
  const updatedScores = currentScores.sort((a, b) => b.wpm - a.wpm).slice(0, 100);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedScores));
};

export const clearScores = () => {
  localStorage.removeItem(STORAGE_KEY);
};