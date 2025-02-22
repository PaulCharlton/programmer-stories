"use client";

import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Play, Pause, Square } from "lucide-react";

interface TextReaderProps {
  content: string;
}

export const TextReader: React.FC<TextReaderProps> = ({ content }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVoice, setCurrentVoice] = useState<SpeechSynthesisVoice | null>(
    null
  );
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [playbackRate, setPlaybackRate] = useState("1.0");
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
      window.speechSynthesis.pause();
      setIsPlaying(false);
      return;
    }

    if (!utteranceRef.current) {
      utteranceRef.current = new SpeechSynthesisUtterance(content);
      utteranceRef.current.voice = currentVoice;
      utteranceRef.current.rate = parseFloat(playbackRate);
      utteranceRef.current.onend = () => {
        setIsPlaying(false);
        utteranceRef.current = null;
      };
      utteranceRef.current.onerror = (event) => {
        console.error("Speech synthesis error:", event);
        setIsPlaying(false);
        utteranceRef.current = null;
      };
      window.speechSynthesis.speak(utteranceRef.current);
    } else {
      window.speechSynthesis.resume();
    }
    setIsPlaying(true);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    utteranceRef.current = null;
  };

  const handleSpeedChange = (value: string) => {
    setPlaybackRate(value);
    if (utteranceRef.current) {
      utteranceRef.current.rate = parseFloat(value);
    }
  };

  const handleVoiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedVoice = voices.find(
      (voice) => voice.name === event.target.value
    );
    if (selectedVoice) {
      setCurrentVoice(selectedVoice);
      if (utteranceRef.current) {
        handleStop();
      }
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="outline" size="icon" onClick={handlePlay}>
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>

          <Button variant="outline" size="icon" onClick={handleStop}>
            <Square className="h-4 w-4" />
          </Button>

          <Select value={playbackRate} onValueChange={handleSpeedChange}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Speed" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0.5">0.5x</SelectItem>
              <SelectItem value="0.75">0.75x</SelectItem>
              <SelectItem value="1.0">1.0x</SelectItem>
              <SelectItem value="1.25">1.25x</SelectItem>
              <SelectItem value="1.5">1.5x</SelectItem>
              <SelectItem value="2.0">2.0x</SelectItem>
            </SelectContent>
          </Select>

          <select
            value={currentVoice?.name}
            onChange={handleVoiceChange}
            className="px-3 py-2 rounded border bg-background ml-auto"
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
