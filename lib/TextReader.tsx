"use client";

import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface TextReaderProps {
  content: string;
}

export const TextReader: React.FC<TextReaderProps> = ({ content }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVoice, setCurrentVoice] = useState<SpeechSynthesisVoice | null>(
    null
  );
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Load available voices
  React.useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      // Prefer English voices
      const englishVoice = availableVoices.find(
        (voice) => voice.lang.startsWith("en") && voice.localService
      );
      setCurrentVoice(englishVoice || availableVoices[0]);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const handlePlay = () => {
    if (!currentVoice) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    utteranceRef.current = new SpeechSynthesisUtterance(content);
    utteranceRef.current.voice = currentVoice;
    utteranceRef.current.rate = 1;
    utteranceRef.current.pitch = 1;

    utteranceRef.current.onend = () => {
      setIsPlaying(false);
    };

    utteranceRef.current.onerror = (event) => {
      console.error("Speech synthesis error:", event);
      setIsPlaying(false);
    };

    window.speechSynthesis.speak(utteranceRef.current);
    setIsPlaying(true);
  };

  const handleVoiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedVoice = voices.find(
      (voice) => voice.name === event.target.value
    );
    if (selectedVoice) {
      setCurrentVoice(selectedVoice);
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={handlePlay}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            {isPlaying ? "Stop" : "Play"}
          </button>

          <select
            value={currentVoice?.name}
            onChange={handleVoiceChange}
            className="px-3 py-2 rounded border bg-background"
          >
            {voices.map((voice) => (
              <option key={voice.name} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </div>

        <div className="text-sm text-muted-foreground">
          {isPlaying ? "Reading..." : "Ready to read"}
        </div>
      </CardContent>
    </Card>
  );
};
