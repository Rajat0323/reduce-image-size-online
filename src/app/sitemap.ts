import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { intentPages } from "@/lib/intentPages";
import { getSeoArticles } from "@/lib/seoAutomationApi";
import { toolPages } from "@/lib/toolCatalog";

const baseUrl = "https://www.reduceimagesizeonline.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = getAllPosts();
  const excludedLegacyIntentSlugs = new Set([
    "compress-to-20kb",
    "compress-to-50kb",
    "compress-to-100kb",
    "compress-to-200kb",
  ]);

  const staticPages: { route: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" }[] = [
    { route: "", priority: 1, changeFrequency: "daily" },
    { route: "/image-compressor", priority: 0.9, changeFrequency: "weekly" },
    { route: "/image-resizer", priority: 0.9, changeFrequency: "weekly" },
    { route: "/image-converter", priority: 0.9, changeFrequency: "weekly" },
    { route: "/background-remover", priority: 0.9, changeFrequency: "weekly" },
    { route: "/compress-image-to-20kb", priority: 0.95, changeFrequency: "weekly" },
    { route: "/blog", priority: 0.85, changeFrequency: "weekly" },
    { route: "/articles", priority: 0.75, changeFrequency: "weekly" },
    { route: "/about", priority: 0.6, changeFrequency: "monthly" },
    { route: "/contact", priority: 0.6, changeFrequency: "monthly" },
    { route: "/privacy-policy", priority: 0.4, changeFrequency: "monthly" },
    { route: "/terms", priority: 0.4, changeFrequency: "monthly" },
  ];

  const publishedArticles = await getSeoArticles().catch(() => []);

  return [
    ...staticPages.map(({ route, priority, changeFrequency }) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    })),

    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "weekly" as const,
      priority: post.slug === "complete-guide-to-image-tools-india" ? 0.85 : 0.72,
    })),

    ...[
      ...intentPages.filter((page) => !excludedLegacyIntentSlugs.has(page.slug)),
      ...toolPages.filter((page) => page.slug !== "compress-image-to-20kb"),
    ].map((page) => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),

    ...publishedArticles
      .filter((article) => article.status === "published")
      .map((article) => ({
        url: `${baseUrl}/articles/${article.slug}`,
        lastModified: article.published_at ? new Date(article.published_at) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),
  ];
}
