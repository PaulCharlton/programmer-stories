import fs from "fs/promises";
import path from "path";
import type { Story } from "@/types/Story";
import { storyRankings } from "./storyRankings";

export async function loadStories(): Promise<Story[]> {
  const storiesDir = path.join(process.cwd(), "lib/cv/stories");
  const files = await fs.readdir(storiesDir);
  const storyFiles = files.filter(
    (file) => file.endsWith(".txt") || file.endsWith(".md")
  );

  const stories = await Promise.all(
    storyFiles.map(async (file, index) => {
      const content = await fs.readFile(path.join(storiesDir, file), "utf-8");
      const lines = content.split("\n");

      // Remove the first line (metadata) from content
      const storyContent = lines.join("\n").trim();

      const { date, title, summary, company } = storyRankings.find(
        (ranking) => ranking.filename === file
      ) || {
        date: null,
        title: null,
        summary: null,
      };
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

      const coolness =
        storyRankings.findIndex((ranking) => ranking.filename === file) + 1 ||
        999;

      return {
        id: index + 1,
        title: title?.trim() || file,
        startDate,
        endDate,
        coolness,
        summary,
        content: storyContent,
        image: `/placeholder.svg?text=Story+${index + 1}`,
        isMarkdown: file.endsWith(".md"),
        company,
      };
    })
  );

  return stories;
}
