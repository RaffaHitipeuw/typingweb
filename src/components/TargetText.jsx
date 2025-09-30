// File: TargetText.jsx
import React from 'react';
import styles from './TargetText.module.css'; 

export default function TargetText({ sampleText, typed, finished, errorActive }) {

    function renderText() {
        return Array.from(sampleText).map((char, index) => {
            let className = styles.charPending;
            
            if (index < typed.length) {
                className = styles.charCorrect; 
            } else if (index === typed.length && !finished) {
                className += ' ' + (errorActive ? styles.charCursorError : styles.charCursor); 
            }

            return (
                <span key={index} className={className}>
                    {char}
                </span>
            );
        });
    }

    return (
        <div className={styles.textContainer}>
            {renderText()}
        </div>
    );
}