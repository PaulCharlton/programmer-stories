import Image from "next/image";
import Link from "next/link";
import { Companies } from "@/lib/companies";
import { loadStories } from "@/lib/loadStories";
import { Story } from "@/types/Story";

export default async function CompaniesPage() {
  const stories = await loadStories();
  const companyStories = new Map();

  // Group stories by company
  stories.forEach((story) => {
    if (story.company) {
      if (!companyStories.has(story.company.name)) {
        companyStories.set(story.company.name, []);
      }
      companyStories.get(story.company.name).push(story);
    }
  });

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center font-mono">
        Companies
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(Companies).map((company) => (
          <div
            key={company.name}
            className="border dark:border-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800"
          >
            <div className="p-4 flex justify-center items-center h-32 bg-gray-50 dark:bg-gray-900">
              <Image
                src={`/${company.file}`}
                alt={`${company.name} Logo`}
                width={200}
                height={60}
                className="h-[60px] w-auto object-contain"
                priority
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">
                {company.name}
              </h2>
              {companyStories.has(company.name) ? (
                <div className="space-y-2">
                  {companyStories.get(company.name).map((story: Story) => (
                    <Link
                      key={story.id}
                      href={`/story/${story.id}`}
                      className="block text-blue-500 dark:text-blue-400 hover:underline"
                    >
                      {story.title}
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 italic">
                  No stories available
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
