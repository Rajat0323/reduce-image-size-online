import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/constants";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { KEPT_SPECIALTY_SLUGS } = require("./consolidationRedirects.js") as {
  KEPT_SPECIALTY_SLUGS: Set<string>;
};

export type IndexableUrl = {
  path: string;
  url: string;
  priority: number;
  changeFrequency: "daily" | "weekly" | "monthly";
  lastModified: Date;
  category: "home" | "tool" | "intent" | "blog" | "static" | "article";
};

const staticRoutes: Omit<IndexableUrl, "url">[] = [
  { path: "", priority: 1, changeFrequency: "daily", lastModified: new Date(), category: "home" },
  { path: "/blog", priority: 0.85, changeFrequency: "weekly", lastModified: new Date(), category: "static" },
  { path: "/articles", priority: 0.6, changeFrequency: "weekly", lastModified: new Date(), category: "static" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly", lastModified: new Date(), category: "static" },
  { path: "/contact", priority: 0.5, changeFrequency: "monthly", lastModified: new Date(), category: "static" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "monthly", lastModified: new Date(), category: "static" },
  { path: "/terms", priority: 0.3, changeFrequency: "monthly", lastModified: new Date(), category: "static" },
];

const specialtyTools = Array.from(KEPT_SPECIALTY_SLUGS);

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

  // Only specialty tools remain indexable — exact-KB and intent clones redirect home.
  for (const slug of specialtyTools) {
    add({
      path: `/${slug}`,
      priority: 0.75,
      changeFrequency: "weekly",
      lastModified: new Date(),
      category: "tool",
    });
  }

  for (const post of blogPosts) {
    add({
      path: `/blog/${post.slug}`,
      priority: 0.65,
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
