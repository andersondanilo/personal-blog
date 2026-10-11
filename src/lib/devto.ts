import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import { siteConfig } from "./config";

const API = "https://dev.to/api";
const headers = { Accept: "application/vnd.forem.api-v1+json" };

export type Article = {
  id: number;
  title: string;
  description: string;
  slug: string;
  url: string;
  cover_image: string | null;
  social_image: string | null;
  published_at: string;
  reading_time_minutes: number;
  tag_list: string[];
  public_reactions_count: number;
  comments_count: number;
};

export type ArticleWithBody = Omit<Article, "tag_list"> & {
  // The single-article endpoint swaps the fields: `tags` is the array here.
  tags: string[];
  body_html: string;
};

export async function getArticles(): Promise<Article[]> {
  "use cache";
  cacheLife("hours");

  const res = await fetch(
    `${API}/articles?username=${siteConfig.devtoUsername}&per_page=1000`,
    { headers },
  );
  if (!res.ok) {
    throw new Error(`dev.to API responded with ${res.status}`);
  }
  return res.json();
}

export async function getArticle(slug: string): Promise<ArticleWithBody> {
  "use cache";
  cacheLife("hours");

  const res = await fetch(
    `${API}/articles/${siteConfig.devtoUsername}/${encodeURIComponent(slug)}`,
    { headers },
  );
  if (res.status === 404) {
    notFound();
  }
  if (!res.ok) {
    throw new Error(`dev.to API responded with ${res.status}`);
  }
  return res.json();
}
