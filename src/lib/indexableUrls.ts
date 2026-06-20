import { getAllPosts } from "@/lib/blog";
import { intentPages } from "@/lib/intentPages";
import { toolPages } from "@/lib/toolCatalog";
import { SITE_URL } from "@/constants";

export type IndexableUrl = {
  path: string;
  url: string;
  priority: number;
  changeFrequency: "daily" | "weekly" | "monthly";
  lastModified: Date;
  category: "home" | "tool" | "intent" | "blog" | "static" | "article";
};

const excludedSlugs = new Set([
  "compress-to-20kb",
  "compress-to-50kb",
  "compress-to-100kb",
  "compress-to-200kb",
  "compress-image-for-ssc-form",
  "compress-image-for-upsc-form",
]);

const staticRoutes: Omit<IndexableUrl, "url">[] = [
  { path: "", priority: 1, changeFrequency: "daily", lastModified: new Date(), category: "home" },
  { path: "/blog", priority: 0.85, changeFrequency: "weekly", lastModified: new Date(), category: "static" },
  { path: "/articles", priority: 0.75, changeFrequency: "weekly", lastModified: new Date(), category: "static" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly", lastModified: new Date(), category: "static" },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly", lastModified: new Date(), category: "static" },
  { path: "/privacy-policy", priority: 0.4, changeFrequency: "monthly", lastModified: new Date(), category: "static" },
  { path: "/terms", priority: 0.4, changeFrequency: "monthly", lastModified: new Date(), category: "static" },
];

export function getAllIndexableUrls(): IndexableUrl[] {
  const blogPosts = getAllPosts();
  const urls = new Map<string, IndexableUrl>();

  const add = (entry: Omit<IndexableUrl, "url">) => {
    const normalizedPath = entry.path || "/";
    const key = normalizedPath === "/" ? "/" : entry.path;
    if (urls.has(key)) {
      return;
    }
    urls.set(key, {
      ...entry,
      path: key,
      url: key === "/" ? SITE_URL : `${SITE_URL}${entry.path}`,
    });
  };

  for (const route of staticRoutes) {
    add(route);
  }

  for (const tool of toolPages) {
    add({
      path: `/${tool.slug}`,
      priority: tool.slug.includes("compress") ? 0.9 : 0.85,
      changeFrequency: "daily",
      lastModified: new Date(),
      category: "tool",
    });
  }

  for (const page of intentPages) {
    if (excludedSlugs.has(page.slug)) {
      continue;
    }
    add({
      path: `/${page.slug}`,
      priority: page.slug.includes("compress") ? 0.9 : 0.85,
      changeFrequency: "daily",
      lastModified: new Date(),
      category: "intent",
    });
  }

  for (const post of blogPosts) {
    add({
      path: `/blog/${post.slug}`,
      priority: post.slug === "complete-guide-to-image-tools-india" ? 0.85 : 0.72,
      changeFrequency: "weekly",
      lastModified: new Date(post.date),
      category: "blog",
    });
  }

  return Array.from(urls.values()).sort((a, b) => b.priority - a.priority);
}

export function getSitemapUrl() {
  return `${SITE_URL}/sitemap.xml`;
}

export const INDEXNOW_KEY = "8f3c2a1e9d4b7c6f5a0e";

export function getIndexNowKeyLocation() {
  return `${SITE_URL}/${INDEXNOW_KEY}.txt`;
}
