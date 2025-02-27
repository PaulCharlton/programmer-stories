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
      [...prev].sort((a, b) => {
        if (sortBy === "coolest") {
          // If coolness is equal, use id as tiebreaker
          if (b.coolness === a.coolness) {
            return a.id.localeCompare(b.id);
          }
          return b.coolness - a.coolness;
        }
        // Handle cases where either date is null
        if (!a.startDate) return 1; // null dates go to end
        if (!b.startDate) return -1; // null dates go to end

        return (
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
      })
    );
  }, [sortBy]);

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <select
          className="border dark:border-gray-700 rounded p-2 font-mono bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "coolest" | "date")}
        >
          <option value="coolest">Sort by Coolness</option>
          <option value="date">Sort by Date</option>
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
