"use client";

import { useState, useEffect, useRef } from "react";
import StoryCard from "./StoryCard";
import type { Story } from "@/types/Story";

export default function StoryList() {
  const [stories, setStories] = useState<Story[]>([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<"coolest" | "date">("date");
  const loader = useRef(null);

  useEffect(() => {
    loadStories();
  }, [sortBy]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 1 });
    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleObserver = (entities: IntersectionObserverEntry[]) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  };

  const loadStories = async () => {
    // In a real application, you would fetch stories from an API
    // For this example, we'll simulate loading with dummy data
    const newStories = Array.from({ length: 10 }, (_, i) => ({
      id: stories.length + i + 1,
      title: `story_${stories.length + i + 1}.txt`,
      date: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      coolness: Math.floor(Math.random() * 100),
      summary: `This is a brief summary of Story ${stories.length + i + 1}...`,
      content: `This is the full content of Story ${
        stories.length + i + 1
      }...\nIt can span multiple lines.\nLike a real text file.`,
      image: `/placeholder.svg?text=Story+${stories.length + i + 1}`,
    }));

    setStories((prev) =>
      [...prev, ...newStories].sort((a, b) =>
        sortBy === "coolest"
          ? b.coolness - a.coolness
          : new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    );
  };

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <select
          className="border rounded p-2 font-mono bg-gray-100"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "coolest" | "date")}
        >
          <option value="date">Sort by Date</option>
          <option value="coolest">Sort by Coolness</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
      <div ref={loader} className="h-10 mt-4"></div>
    </div>
  );
}
