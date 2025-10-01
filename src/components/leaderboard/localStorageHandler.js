// components/Leaderboard/localStorageHandler.js

// Konstanta untuk path API Anda
const API_URL = '/api/scores';

export const getScores = async () => {
    try {
        const response = await fetch(API_URL, { 
            method: 'GET', 
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store'
        });
        if (!response.ok) throw new Error('Failed to fetch scores');
        return await response.json();
    } catch (e) {
        console.error("Gagal mengambil skor dari API:", e);
        return [];
    }
};

export const addScore = async (wpm, accuracy, username) => {
    if (wpm === 0 || !username) return;
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ wpm, accuracy, username }),
        });
        if (!response.ok) throw new Error('Failed to save score');
        return await response.json();
    } catch (e) {
        console.error("Gagal mengirim skor ke API:", e);
    }
};

// Fungsi ini tidak diimplementasikan untuk leaderboard publik
// export const clearScores = () => {};