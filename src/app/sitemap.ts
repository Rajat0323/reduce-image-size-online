import { MetadataRoute } from "next";

import { getAllIndexableUrls } from "@/lib/indexableUrls";
import { getSeoArticles } from "@/lib/seoAutomationApi";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const publishedArticles = await getSeoArticles().catch(() => []);

  const coreEntries = getAllIndexableUrls().map(({ url, lastModified, changeFrequency, priority }) => ({
    url,
    lastModified,
    changeFrequency,
    priority,
  }));

  const articleEntries = publishedArticles
    .filter((article) => article.status === "published")
    .map((article) => ({
      url: `https://www.reduceimagesizeonline.com/articles/${article.slug}`,
      lastModified: article.published_at ? new Date(article.published_at) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  return [...coreEntries, ...articleEntries];
}
