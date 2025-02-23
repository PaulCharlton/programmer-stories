import Link from "next/link";

interface BackButtonProps {
  href: string;
  label: string;
}

export default function BackButton({ href, label }: BackButtonProps) {
  return (
    <Link
      href={href}
      className="text-blue-500 dark:text-blue-400 hover:underline mb-4 inline-block"
    >
      &larr; {label}
    </Link>
  );
}
