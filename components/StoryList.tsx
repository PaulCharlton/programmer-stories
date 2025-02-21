"use client";

import { useState, useEffect } from "react";
import StoryCard from "./StoryCard";
import type { Story } from "@/types/Story";

interface StoryListProps {
  initialStories: Story[];
}

export default function StoryList({ initialStories }: StoryListProps) {
  const [stories, setStories] = useState<Story[]>(initialStories);
  const [sortBy, setSortBy] = useState<"coolest" | "date">("coolest");

  useEffect(() => {
    setStories((prev) =>
      [...prev].sort((a, b) =>
        sortBy === "coolest"
          ? a.coolness - b.coolness
          : new Date(b.startDate || "").getTime() -
            new Date(a.startDate || "").getTime()
      )
    );
  }, [sortBy]);

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
    </div>
  );
}
