// File: TargetText.jsx
import React from 'react';
import styles from './TargetText.module.css'; 

export default function TargetText({ sampleText, typed, finished, errorActive }) {

    function renderText() {
        return Array.from(sampleText).map((char, index) => {
            let className = styles.charPending;
            
            if (index < typed.length) {
                // Di Strict Mode, ini harus selalu benar (kecuali ada logic backspace)
                className = styles.charCorrect; 
            } else if (index === typed.length && !finished) {
                // Gunakan class error jika errorActive true, jika tidak, gunakan class normal
                className += ' ' + (errorActive ? styles.charCursorError : styles.charCursor); 
            }

            return (
                <span key={index} className={className}>
                    {char}
                </span>
            );
        });
        // Karena ini Strict Mode, kita tidak perlu logic untuk kelebihan ketikan
    }

    return (
        <div className={styles.textContainer}>
            {renderText()}
        </div>
    );
}