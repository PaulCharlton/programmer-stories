import StoryList from "@/components/StoryList"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center font-mono">Programmer Stories</h1>
      <StoryList />
    </main>
  )
}

