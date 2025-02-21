export interface Story {
  id: number;
  title: string;
  startDate: string | null;
  endDate: string | null;
  coolness: number;
  summary: string;
  content: string;
  image: string;
}
