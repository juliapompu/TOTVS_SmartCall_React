import { ApiError } from './apiErrors';
import { apiRequest } from './api';
import type { NewsItem } from '../types/news';

export const newsService = {
  async getAllNews(): Promise<NewsItem[]> {
    return apiRequest<NewsItem[]>('/news');
  },

  async getNewsById(id: number): Promise<NewsItem | undefined> {
    try {
      return await apiRequest<NewsItem>(`/news/${id}`);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        return undefined;
      }
      throw error;
    }
  },
};
