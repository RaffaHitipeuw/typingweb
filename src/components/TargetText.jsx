// File: TargetText.jsx
import React from 'react';
import styles from './TargetText.module.css'; 

export default function TargetText({ sampleText, typed, finished }) {

    function renderText() {
        return Array.from(sampleText).map((char, index) => {
            let className = styles.charPending;
            
            if (index < typed.length) {
                className = typed[index] === char ? styles.charCorrect : styles.charIncorrect;
            } else if (index === typed.length && !finished) {
                className += ' ' + styles.charCursor; 
            }

            return (
                <span key={index} className={className}>
                    {char}
                </span>
            );
        }).concat(
            typed.length > sampleText.length 
              ? <span key="extra" className={styles.charIncorrect}>
                  {typed.substring(sampleText.length)}
                </span>
              : null
        );
    }

    return (
        <div className={styles.textContainer}>
            {renderText()}
        </div>
    );
}