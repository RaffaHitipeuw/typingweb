"use client"; // Tambahkan ini di atas jika belum ada

import React, { useState, useEffect } from 'react';
// Ganti impor ke file handler yang baru
import { getScores, clearScores } from './scoreApiHandler'; 
import './Leaderboard.css';

function Leaderboard({ latestScore }) {
  const [scores, setScores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fungsi fetch data asinkron
  const fetchScores = async () => {
    setIsLoading(true);
    const data = await getScores();
    setScores(data);
    setIsLoading(false);
  };

  // Memuat skor saat komponen pertama kali di-render
  useEffect(() => {
    fetchScores();
  }, []);

  // Memperbarui skor jika ada skor baru dari props (dipicu dari page.jsx)
  useEffect(() => {
    if (latestScore && latestScore.wpm > 0) {
      fetchScores();
    }
  }, [latestScore]);

  // Handler untuk menghapus semua skor (dipertahankan dari logika lama, tapi sekarang hanya menghapus data di klien)
  const handleClearScores = () => {
    // Catatan: Dalam proyek publik, tombol ini harus dihapus atau dimodifikasi
    // untuk menghapus hanya skor pengguna yang login.
    alert("Untuk leaderboard publik, fitur hapus riwayat harus diimplementasikan di sisi server dengan otentikasi.");
  };

  if (isLoading) {
      return <div className="leaderboard-container"><p>Memuat Leaderboard...</p></div>;
  }

  return (
    <div className="leaderboard-container">
      <h2>🏆 Global Leaderboard 🏆</h2>
      
      {/* Tombol clear di-disable atau diubah pesannya untuk leaderboard publik */}
      <button onClick={handleClearScores} className="clear-button" disabled>
        Hapus Riwayat (Disabled)
      </button>
      
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