// File: page.jsx (atau src/app/page.jsx)
"use client";

import React, { useState, useEffect, useRef } from "react";
import TargetText from "../components/TargetText"; 
import StatsDisplay from "../components/StatsDisplay"; 
import sharedStyles from "../components/SharedStyles.module.css"; 

const sampleTexts = [
    "the quick brown fox jumps over the lazy dog",
    "programming language is a formal constructed language designed to communicate",
    "a computer program is a collection of instructions that can be executed by a computer",
    "she sees the sun and knows that time will bring them home to the main area",
    "they are known to follow the great white shark across the wide open sea",
];

function getRandomText() {
    return sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
}

export default function Page() {
    const [sampleText, setSampleText] = useState(getRandomText());
    const [typed, setTyped] = useState('');
    const [started, setStarted] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [finished, setFinished] = useState(false);
    const [errorActive, setErrorActive] = useState(false); // State baru untuk error visual
    const [mistakeCount, setMistakeCount] = useState(0); 

    const inputRef = useRef(null);

    useEffect(() => {
        if (finished) setEndTime(Date.now());
    }, [finished]);
    
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'Escape' || (finished && e.key === 'Enter')) {
                reset();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [finished]);

    function correctChars(text = typed) { 
        return text.length;
    }

    function accuracyPercent() { 
        const totalKeystrokes = typed.length + mistakeCount;
        if (totalKeystrokes === 0) return 0;
        
        const correct = typed.length;
        return Math.round((correct / totalKeystrokes) * 100 * 100) / 100;
    }

    function elapsedSeconds() { 
        if (!started) return 0;
        const end = endTime || Date.now();
        return Math.max(0, Math.floor((end - startTime) / 1000));
    }

    function wpm() { 
        const seconds = elapsedSeconds();
        if (seconds === 0) return 0;
        const minutes = seconds / 60;
        const correct = typed.length; 
        return Math.round((correct / 5) / minutes);
    }
    
    function handleChange(e) { 
        const value = e.target.value;
        const lastTypedChar = value[value.length - 1];
        
        if (finished) return; 

        if (value.length < typed.length) {
             setTyped(value);
             setErrorActive(false); // Reset error jika backspace
             return;
        }

        if (typed.length >= sampleText.length) {
            return;
        }

        const expectedChar = sampleText[value.length - 1];
        
        if (lastTypedChar !== expectedChar) {
            // Mencegah input, mengaktifkan visual error, dan mencatat kesalahan
            setMistakeCount(prev => prev + 1);
            setErrorActive(true);
            return; 
        }

        // Jika benar:
        setErrorActive(false); 
        
        if (!started && value.length > 0) {
            setStarted(true);
            setStartTime(Date.now());
        }
        
        setTyped(value);
        
        if (value.length === sampleText.length) {
            setFinished(true);
        }
    }

    function reset() { 
        setTyped('');
        setStarted(false);
        setStartTime(null);
        setEndTime(null);
        setFinished(false);
        setMistakeCount(0); 
        setErrorActive(false); 
        setSampleText(getRandomText());
        if (inputRef.current) inputRef.current.focus();
    }
    
    return (
        <div 
            className={sharedStyles.container}
            onClick={() => {
                if (inputRef.current) {
                    inputRef.current.focus();
                }
            }}
        >
            <h1 className={sharedStyles.header}>typing test</h1> 
            
            <TargetText 
                sampleText={sampleText} 
                typed={typed} 
                finished={finished} 
                errorActive={errorActive} // Teruskan state error
            />

            <textarea
                ref={inputRef}
                value={typed}
                onChange={handleChange}
                className={`${sharedStyles.textArea} ${finished ? sharedStyles.textAreaDisabled : ''}`}
                rows={6}
                cols={60}
                style={{ opacity: 0, height: '1px', width: '1px', overflow: 'hidden' }}
                autoFocus 
                disabled={finished}
            />

            <StatsDisplay 
                wpm={wpm()}
                accuracyPercent={accuracyPercent()}
                elapsedSeconds={elapsedSeconds()}
                correctChars={typed.length}
                sampleLength={sampleText.length}
            />

            <button 
                onClick={reset} 
                className={sharedStyles.button}
            >
                {finished ? "RESTART (ENTER)" : "RESTART (ESC)"}
            </button>
        </div>
    );
}