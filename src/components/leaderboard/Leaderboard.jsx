"use client";

import React, { useState, useEffect } from 'react';
import { getScores } from './localStorageHandler'; 
import './Leaderboard.css';

function Leaderboard({ latestScore }) {
  const [scores, setScores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchScores = async () => {
    setIsLoading(true);
    const data = await getScores();
    setScores(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchScores();
  }, []);

  useEffect(() => {
    if (latestScore && latestScore.wpm > 0) {
      fetchScores();
    }
  }, [latestScore]);


  const handleClearScores = () => {
    alert("Fitur hapus dinonaktifkan untuk Leaderboard publik.");
  };

  if (isLoading) {
      return <div className="leaderboard-container"><p>Memuat Leaderboard...</p></div>;
  }

  return (
    <div className="leaderboard-container">
      <h2>🏆 Global Leaderboard 🏆</h2>
      
      {scores.length === 0 ? (
        <p>Belum ada skor global. Jadilah yang pertama!</p>
      ) : (
        <ol className="score-list">
          {scores.map((score, index) => (
            <li key={score._id || index} className="score-item">
              <span className="wpm-display">{score.wpm} WPM</span>
              <span className="accuracy-display">
                  {score.username} ({score.accuracy}% Akurasi)
              </span>
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