import fs from "fs/promises";
import path from "path";
import type { Story } from "@/types/Story";
import { storyRankings } from "./storyRankings";

export async function loadStories(): Promise<Story[]> {
  const storiesDir = path.join(process.cwd(), "lib/stories");
  const files = await fs.readdir(storiesDir);
  const txtFiles = files.filter((file) => file.endsWith(".txt"));

  const stories = await Promise.all(
    txtFiles.map(async (file, index) => {
      const content = await fs.readFile(path.join(storiesDir, file), "utf-8");
      const lines = content.split("\n");

      // Parse the first line for title and date
      const [title, date] = (lines[0] || "").split(";");

      // Remove the first line (metadata) from content
      const storyContent = lines.slice(1).join("\n").trim();

      // Use first 3 non-empty lines for summary
      const summary = lines
        .slice(1) // Skip metadata line
        .filter((line) => line.trim()) // Remove empty lines
        .slice(0, 3) // Take first 3 non-empty lines
        .join("\n")
        .trim();

      // Handle date parsing
      let startDate = null;
      let endDate = null;
      if (date && date.trim() !== "Unknown") {
        const trimmedDate = date.trim();
        try {
          if (trimmedDate.includes("-")) {
            const [startYear, endYear] = trimmedDate.split("-");
            startDate = new Date(startYear).toISOString();
            endDate = new Date(endYear).toISOString();
          } else {
            startDate = new Date(trimmedDate).toISOString();
          }
        } catch (e) {
          console.warn(
            `Could not parse date "${date}" for story "${title}", using current date`
          );
        }
      }

      // Get coolness from story rankings (position in array + 1)
      const coolness = storyRankings.indexOf(file) + 1 || 999;

      return {
        id: index + 1,
        title: title?.trim() || file,
        startDate,
        endDate,
        coolness,
        summary,
        content: storyContent,
        image: `/placeholder.svg?text=Story+${index + 1}`,
      };
    })
  );

  return stories;
}
