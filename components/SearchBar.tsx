"use client";

import { useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Story } from "@/types/Story";

interface SearchBarProps {
  stories: Story[];
}

export default function SearchBar({ stories }: SearchBarProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full max-w-lg mx-auto flex items-center border dark:border-gray-700 rounded-lg px-3 py-2 text-sm hover:border-gray-400 dark:hover:border-gray-500 transition-colors mb-8 text-gray-500 dark:text-gray-400 dark:bg-gray-800"
      >
        <Search className="mr-2 h-4 w-4" />
        <span>Search stories...</span>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Search stories..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Stories">
              {stories.map((story) => (
                <CommandItem
                  key={story.id}
                  onSelect={() => {
                    router.push(`/story/${story.id}`);
                    setOpen(false);
                  }}
                >
                  <span>{story.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
