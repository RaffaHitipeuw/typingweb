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

    const inputRef = useRef(null);

    useEffect(() => {
        if (finished) setEndTime(Date.now());
    }, [finished]);
    
    // Logic: Mengaktifkan restart dengan tombol ESC atau ENTER
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'Escape' || (finished && e.key === 'Enter')) {
                reset();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [finished]); // Dependensi [finished] agar listener tahu status tes

    function correctChars(text = typed) { 
        let correct = 0;
        for (let i = 0; i < text.length && i < sampleText.length; i++) {
            if (text[i] === sampleText[i]) correct++;
        }
        return correct;
    }

    function accuracyPercent() { 
        if (typed.length === 0) return 0;
        const correct = correctChars();
        return Math.round((correct / typed.length) * 100 * 100) / 100;
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
        const correct = correctChars();
        return Math.round((correct / 5) / minutes);
    }
    
    function handleChange(e) { 
        const value = e.target.value;
        const lastTypedChar = value[value.length - 1];
        
        // 1. Mencegah ketikan jika sudah selesai
        if (finished) return; 

        // Mencegah menghapus karakter saat sudah selesai (opsional, tapi baik untuk strict mode)
        if (value.length < typed.length) {
             setTyped(value);
             return;
        }

        // 2. Menerapkan Strict Mode (harus benar-benar sesuai)
        const expectedChar = sampleText[value.length - 1];
        
        // Cek jika karakter terakhir yang diketik tidak sesuai DENGAN KARAKTER BERIKUTNYA
        if (lastTypedChar !== expectedChar) {
            // Jika salah, jangan update state 'typed'
            return; 
        }

        // Jika sampai di sini, karakter yang diketik benar
        if (!started && value.length > 0) {
            setStarted(true);
            setStartTime(Date.now());
        }
        
        setTyped(value);
        
        // 3. Menandai Selesai saat semua karakter di sampleText sudah terketik dengan benar
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
                correctChars={correctChars()}
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