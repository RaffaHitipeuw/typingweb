import React from 'react';
import styles from './StatsDisplay.module.css'; 

export default function StatsDisplay({ wpm, accuracyPercent, elapsedSeconds, correctChars, sampleLength }) {
    return (
        <div className={styles.statsContainer}>
            <div className={styles.statItem}>
                <div className={styles.statValue}>{wpm}</div>
                <div className={styles.statLabel}>WPM</div>
            </div>
            <div className={styles.statItem}>
                <div className={styles.statValue}>{elapsedSeconds}</div>
                <div className={styles.statLabel}>Detik</div>
            </div>
            <div className={styles.statItem}>
                <div className={styles.statValue}>{accuracyPercent} %</div>
                <div className={styles.statLabel}>Akurasi</div>
            </div>
            <div className={styles.statItem}>
                <div className={styles.statValue}>{correctChars} / {sampleLength}</div>
                <div className={styles.statLabel}>Karakter Benar</div>
            </div>
        </div>
    );
}