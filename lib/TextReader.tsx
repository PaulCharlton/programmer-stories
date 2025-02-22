"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Square } from "lucide-react";

interface TextReaderProps {
  content: string;
}

export function TextReader({ content }: TextReaderProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    utteranceRef.current = new SpeechSynthesisUtterance(content);
    return () => {
      if (utteranceRef.current) {
        speechSynthesis.cancel();
      }
    };
  }, [content]);

  const play = () => {
    if (isPaused) {
      speechSynthesis.resume();
    } else {
      speechSynthesis.cancel();
      if (utteranceRef.current) {
        speechSynthesis.speak(utteranceRef.current);
      }
    }
    setIsPlaying(true);
    setIsPaused(false);
  };

  const pause = () => {
    speechSynthesis.pause();
    setIsPlaying(false);
    setIsPaused(true);
  };

  const stop = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  return (
    <div className="flex items-center space-x-2">
      <Button onClick={play} disabled={isPlaying && !isPaused}>
        <Play className="h-4 w-4" />
        <span className="sr-only">Play</span>
      </Button>
      <Button onClick={pause} disabled={!isPlaying || isPaused}>
        <Pause className="h-4 w-4" />
        <span className="sr-only">Pause</span>
      </Button>
      <Button onClick={stop} disabled={!isPlaying && !isPaused}>
        <Square className="h-4 w-4" />
        <span className="sr-only">Stop</span>
      </Button>
    </div>
  );
}
