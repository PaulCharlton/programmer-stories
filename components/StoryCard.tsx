import Link from "next/link";
import type { Story } from "@/types/Story";
import { formatDate } from "@/lib/formatDate";

interface StoryCardProps {
  story: Story;
}

export default function StoryCard({ story }: StoryCardProps) {
  return (
    <Link href={`/story/${story.id}`} className="block">
      <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-gray-100 p-4">
        <div className="flex items-center mb-2">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="bg-white p-4 rounded border border-gray-200">
          <h2 className="text-xl font-mono font-semibold mb-2 truncate">
            {story.title}
          </h2>
          <p className="text-gray-600 text-sm mb-2 font-mono">
            // Created:{" "}
            {formatDate({
              startDate: story.startDate,
              endDate: story.endDate,
            })}
          </p>
          <p className="text-gray-700 font-mono line-clamp-3">
            {story.summary}
          </p>
        </div>
        <div className="mt-2 text-right text-xs text-gray-500 font-mono">
          {story.content.split("\n").length} lines | {story.content.length}{" "}
          characters
        </div>
      </div>
    </Link>
  );
}
