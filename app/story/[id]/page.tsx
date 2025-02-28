import type { Story } from "@/types/Story";
import Link from "next/link";
import Image from "next/image";
import { loadStories } from "@/lib/loadStories";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/formatDate";
import { TextReader } from "@/lib/TextReader";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import BackButton from "@/components/BackButton";

async function getStory(id: string): Promise<Story> {
  const stories = await loadStories();
  const story = stories.find((s) => s.id === id);
  if (!story) notFound();
  return story;
}

export default async function StoryPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { from?: string };
}) {
  const story = await getStory(params.id);
  const companyLogo = `/${story.company?.file}`;

  const backLink = searchParams.from === "companies" ? "/companies" : "/";
  const backLabel =
    searchParams.from === "companies" ? "Back to companies" : "Back to stories";

  return (
    <main className="container mx-auto px-4 py-8">
      <BackButton href={backLink} label={backLabel} />
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {story.company?.file && (
          <div className="p-4 flex justify-center bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            {story.company?.homepage ? (
              <a
                href={story.company.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
              >
                <Image
                  src={companyLogo || "/placeholder.svg"}
                  alt="Company Logo"
                  width={200}
                  height={60}
                  className="h-[60px] w-auto object-contain cursor-pointer"
                  priority
                />
              </a>
            ) : (
              <Image
                src={companyLogo || "/placeholder.svg"}
                alt="Company Logo"
                width={200}
                height={60}
                className="h-[60px] w-auto object-contain"
                priority
              />
            )}
          </div>
        )}
        <div className="bg-gray-200 dark:bg-gray-700 p-2 flex items-center">
          <div className="flex items-center mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <h1 className="text-lg font-mono font-semibold dark:text-gray-100">
            {story.title}
          </h1>
        </div>
        <div className="p-4 bg-white dark:bg-gray-900">
          <div className="mb-6">
            <TextReader content={story.content} />
          </div>
          <div className="font-mono text-sm whitespace-pre-wrap">
            <div className="mb-4 text-gray-500 dark:text-gray-400">
              // Created:{" "}
              {formatDate({
                startDate: story.startDate,
                endDate: story.endDate,
              })}
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown
                rehypePlugins={[rehypeSlug]}
                components={{
                  p: ({ node, ...props }) => (
                    <p className="my-1 leading-normal" {...props} />
                  ),
                  h1: ({ node, ...props }) => (
                    <h1 className="mt-3 mb-1 text-2xl font-bold" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2
                      className="mt-2 mb-1 text-xl font-semibold"
                      {...props}
                    />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="my-1 pl-4 list-disc" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="my-1 pl-4 list-decimal" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="my-0.5" {...props} />
                  ),
                }}
              >
                {story.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
