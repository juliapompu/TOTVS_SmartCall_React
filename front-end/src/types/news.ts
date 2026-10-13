export interface NewsItem {
  id: number;
  slug: string;
  title: string;
  summary: string;
  category: string;
  author: string;
  publishedAt: string;
  imageUrl: string;
  paragraphs: string[];
}