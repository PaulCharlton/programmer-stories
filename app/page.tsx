import StoryList from "@/components/StoryList";
import SearchBar from "@/components/SearchBar";
import { loadStories } from "@/lib/loadStories";

export default async function Home() {
  const stories = await loadStories();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center font-mono">
        Paul Charlton
      </h1>
      <SearchBar stories={stories} />
      <StoryList initialStories={stories} />
    </main>
  );
}
