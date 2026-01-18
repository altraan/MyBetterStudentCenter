"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Volume2, X, Loader2 } from "lucide-react";
import { useTheme } from "./ThemeContext";

export default function TTSButton() {
    const { dyslexiaMode } = useTheme();
    const [selectedText, setSelectedText] = useState("");
    const [buttonPosition, setButtonPosition] = useState<{ x: number; y: number } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handleSelection = useCallback(() => {
        if (!dyslexiaMode) return;

        const selection = window.getSelection();
        const text = selection?.toString().trim();

        if (text && text.length > 0) {
            setSelectedText(text);

            // Get position from selection
            const range = selection?.getRangeAt(0);
            if (range) {
                const rect = range.getBoundingClientRect();
                setButtonPosition({
                    x: rect.left + rect.width / 2,
                    y: rect.top - 50,
                });
            }
        } else {
            setSelectedText("");
            setButtonPosition(null);
        }
    }, [dyslexiaMode]);

    useEffect(() => {
        if (!dyslexiaMode) {
            setSelectedText("");
            setButtonPosition(null);
            return;
        }

        document.addEventListener("mouseup", handleSelection);
        document.addEventListener("keyup", handleSelection);

        return () => {
            document.removeEventListener("mouseup", handleSelection);
            document.removeEventListener("keyup", handleSelection);
        };
    }, [dyslexiaMode, handleSelection]);

    const speakText = async () => {
        if (!selectedText || isLoading) return;

        setIsLoading(true);

        try {
            const response = await fetch("/api/tts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: selectedText }),
            });

            if (!response.ok) {
                throw new Error("TTS request failed");
            }

            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);

            // Stop any existing audio
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }

            const audio = new Audio(audioUrl);
            audioRef.current = audio;

            audio.onplay = () => setIsPlaying(true);
            audio.onended = () => {
                setIsPlaying(false);
                URL.revokeObjectURL(audioUrl);
            };
            audio.onerror = () => {
                setIsPlaying(false);
                URL.revokeObjectURL(audioUrl);
            };

            await audio.play();
        } catch (error) {
            console.error("TTS error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const stopAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current = null;
            setIsPlaying(false);
        }
    };

    const closeButton = () => {
        setSelectedText("");
        setButtonPosition(null);
        stopAudio();
    };

    if (!dyslexiaMode || !buttonPosition || !selectedText) {
        return null;
    }

    return (
        <div
            className="fixed z-[9999] animate-in fade-in-0 zoom-in-95 duration-200"
            style={{
                left: `${buttonPosition.x}px`,
                top: `${buttonPosition.y}px`,
                transform: "translateX(-50%)",
            }}
        >
            <div className="flex items-center gap-1 bg-green-600 rounded-full shadow-lg px-2 py-1">
                <button
                    onClick={speakText}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-3 py-2 text-white font-medium text-sm hover:bg-green-700 rounded-l-full transition-colors disabled:opacity-50"
                >
                    {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : isPlaying ? (
                        <Volume2 className="w-4 h-4 animate-pulse" />
                    ) : (
                        <Volume2 className="w-4 h-4" />
                    )}
                    {isLoading ? "Loading..." : isPlaying ? "Speaking..." : "Read Aloud"}
                </button>
                <button
                    onClick={closeButton}
                    className="p-2 text-white/80 hover:text-white hover:bg-green-700 rounded-r-full transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            {/* Arrow pointing down */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full -mt-1">
                <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-green-600" />
            </div>
        </div>
    );
}
