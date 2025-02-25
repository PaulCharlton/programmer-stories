import StoryList from "@/components/StoryList";
import SearchBar from "@/components/SearchBar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { loadStories } from "@/lib/loadStories";
import Link from "next/link";

export default async function Home() {
  const stories = await loadStories();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center font-mono">
        Paul Charlton
      </h1>
      <div className="flex justify-center mb-8">
        <Link
          href="/companies"
          className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          View Companies
        </Link>
      </div>
      <SearchBar stories={stories} />
      <StoryList initialStories={stories} />
      <ThemeToggle />
    </main>
  );
}
