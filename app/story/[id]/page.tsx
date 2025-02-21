import type { Story } from "@/types/Story"
import Link from "next/link"

async function getStory(id: string): Promise<Story> {
  // In a real application, you would fetch the story from an API
  // For this example, we'll return dummy data
  return {
    id: Number.parseInt(id),
    title: `story_${id}.txt`,
    date: new Date().toISOString(),
    coolness: Math.floor(Math.random() * 100),
    summary: `This is a brief summary of Story ${id}...`,
    content: `This is the full content of Story ${id}. 
It would typically be much longer and contain the entire text file provided by your friend.

You can add multiple lines here to simulate a longer story.

Each line will be displayed with its own line number in the text editor view.`,
    image: `/placeholder.svg?text=Story+${id}`,
  }
}

export default async function StoryPage({ params }: { params: { id: string } }) {
  const story = await getStory(params.id)

  return (
    <main className="container mx-auto px-4 py-8">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to stories
      </Link>
      <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden">
        <div className="bg-gray-200 p-2 flex items-center">
          <div className="flex items-center mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <h1 className="text-lg font-mono font-semibold">{story.title}</h1>
        </div>
        <div className="p-4 bg-white">
          <div className="font-mono text-sm whitespace-pre-wrap">
            <div className="mb-4 text-gray-500">
              // Created: {new Date(story.date).toLocaleDateString()}
              // Coolness: {story.coolness}
            </div>
            {story.content.split("\n").map((line, index) => (
              <div key={index} className="flex">
                <span className="text-gray-400 mr-4 select-none w-8 text-right">{index + 1}</span>
                <span>{line}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

