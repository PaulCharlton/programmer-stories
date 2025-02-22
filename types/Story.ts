export interface Story {
  id: number;
  title: string;
  startDate: string | null;
  endDate: string | null;
  coolness: number;
  summary: string | null;
  content: string;
  image: string;
  isMarkdown: boolean;
}
