import { Company } from "@/lib/companies";

export interface Story {
  id: string;
  title: string;
  startDate: string | null;
  endDate: string | null;
  coolness: number;
  summary: string | null;
  content: string;
  image: string;
  company: Company | undefined;
}
