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

  const processContent = (text: string) => {
    return (
      text
        // Remove markdown headers
        .replace(/#{1,6}\s/g, "")
        // Remove markdown links but keep text
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        // Remove markdown bold/italic
        .replace(/(\*\*|__)(.*?)\1/g, "$2")
        .replace(/(\*|_)(.*?)\1/g, "$2")
        // Remove code blocks
        .replace(/```[\s\S]*?```/g, "")
        .replace(/`([^`]+)`/g, "$1")
        // Remove bullet points but add pause
        .replace(/^\s*[-*+]\s/gm, ", ")
        // Add pauses for better speech flow
        .replace(/\.\s/g, ". , ")
        .replace(/\n\n/g, ". ")
        // Remove any remaining markdown symbols
        .replace(/[#*_`]/g, "")
        // Clean up multiple spaces and commas
        .replace(/\s+/g, " ")
        .replace(/,\s*,/g, ",")
        .trim()
    );
  };

  useEffect(() => {
    const processedContent = processContent(content);
    utteranceRef.current = new SpeechSynthesisUtterance(processedContent);
    utteranceRef.current.rate = 0.9;
    utteranceRef.current.pitch = 1;

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
