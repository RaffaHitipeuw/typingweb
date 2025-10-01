// components/Leaderboard/Leaderboard.jsx

"use client";

import React, { useState, useEffect } from 'react';
// Pastikan nama file handler Anda (misalnya localStorageHandler) di-import di sini
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

  // Tombol Hapus dinonaktifkan untuk Leaderboard publik
  const handleClearScores = () => {
    alert("Fitur hapus dinonaktifkan untuk Leaderboard publik.");
  };

  if (isLoading) {
      return <div className="leaderboard-container"><p>Memuat Leaderboard...</p></div>;
  }

  return (
    <div className="leaderboard-container">
      <h2>🏆 Global Leaderboard 🏆</h2>
      
      <button onClick={handleClearScores} className="clear-button" disabled>
        Hapus Riwayat (Disabled)
      </button>
      
      {scores.length === 0 ? (
        <p>Belum ada skor global. Jadilah yang pertama!</p>
      ) : (
        <ol className="score-list">
          {scores.map((score, index) => (
            // Menggunakan score._id dari MongoDB jika ada, jika tidak pakai index
            <li key={score._id || index} className="score-item">
              <span className="wpm-display">{score.wpm} WPM</span>
              {/* Menampilkan username yang diambil dari database */}
              <span className="accuracy-display">
                  {score.username} ({score.accuracy}% Akurasi)
              </span>
              <span className="date-display">
                {/* Kita biarkan ini karena Leaderboard dimuat ssr:false, jadi ini aman */}
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