import React, { useState, useEffect } from 'react';
import { getScores, clearScores } from './localStorageHandler';
import './Leaderboard.css';

function Leaderboard({ latestScore }) {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    setScores(getScores());
  }, []);

  useEffect(() => {
    if (latestScore && latestScore.wpm > 0) {
      setScores(getScores());
    }
  }, [latestScore]);

  const handleClearScores = () => {
    clearScores();
    setScores([]);
  };

  return (
    <div className="leaderboard-container">
      <h2>🏆 Riwayat Skor Mengetik 🏆</h2>
      <button onClick={handleClearScores} className="clear-button">
        Hapus Semua Riwayat
      </button>
      
      {scores.length === 0 ? (
        <p>Belum ada riwayat skor. Silakan mulai tes!</p>
      ) : (
        <ol className="score-list">
          {scores.map((score, index) => (
            <li key={index} className="score-item">
              <span className="wpm-display">{score.wpm} WPM</span>
              <span className="accuracy-display">{score.accuracy}% Akurasi</span>
              <span className="date-display">
                {new Date(score.timestamp).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default Leaderboard;