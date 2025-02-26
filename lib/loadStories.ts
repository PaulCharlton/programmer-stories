import fs from "fs/promises";
import path from "path";
import type { Story } from "@/types/Story";
import { storyRankings } from "./storyRankings";

const IdMap = {
  "EnterNet.md": 1,
  "IdeaLab.md": 2,
  "Intuit.md": 3,
  "JavaFX.md": 4,
  "JavaSoft.md": 5,
  "Myarc.md": 6,
  "USCGAux.md": 8,
  "PaperRoute.md": 7,
  "acuity brands.md": 10,
  "UVA.md": 9,
  "apple.md": 11,
  "asic1.md": 12,
  "asic2.md": 13,
  "best_day.md": 14,
  "beyondnews.md": 15,
  "c2btech.md": 16,
  "chasebank.md": 17,
  "cinnovations.md": 18,
  "ciq.md": 19,
  "cisco_ios.md": 20,
  "codereports.md": 21,
  "compuserve.md": 22,
  "cyber currency 101.md": 23,
  "dax.md": 24,
  "deshaw.md": 25,
  "digitalinsight.md": 26,
  "electrofiberoptic.md": 27,
  "element analytics.md": 28,
  "f5_networks.md": 29,
  "fastterm.md": 30,
  "forticom.md": 31,
  "genasm.md": 32,
  "genlib.md": 33,
  "genlink.md": 34,
  "genmake.md": 35,
  "genref.md": 36,
  "gimps.md": 37,
  "hewlettpackard.md": 38,
  "home construction.md": 39,
  "independa.md": 40,
  "intacct.md": 41,
  "introduction.md": 42,
  "iot4ai.md": 43,
  "laser-printer.md": 44,
  "magnifi.md": 45,
  "miracleofvirginia.md": 46,
  "national merit.md": 47,
  "neustar.md": 49,
  "netflix_prize.md": 48,
  "open source.md": 50,
  "permissionTV.md": 51,
  "recommendations_summary.md": 53,
  "resultsbyiq.md": 54,
  "recommendations_raw.md": 52,
  "rpi.md": 55,
  "swiftboot.md": 56,
  "valueclick.md": 57,
  "wikipedia.md": 58,
};

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

      const id = (IdMap as any)[file];

      if (!id) {
        throw new Error(`No id found for file: ${file}`);
      }

      return {
        id,
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
