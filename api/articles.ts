import {Article} from './types';
import client from './client';

export async function getArticles() {
  const response = await client.get<Article[]>('/articles');
  return response.data;
}
export async function getArticle(id: number) {
  const response = await client.get<Article>(`/articles/${id}`);
  return response.data;
}
