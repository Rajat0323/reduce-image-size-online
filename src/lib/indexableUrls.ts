import { SITE_URL } from "@/constants";

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
  { path: "/about", priority: 0.5, changeFrequency: "monthly", lastModified: new Date(), category: "static" },
  { path: "/contact", priority: 0.4, changeFrequency: "monthly", lastModified: new Date(), category: "static" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "monthly", lastModified: new Date(), category: "static" },
  { path: "/terms", priority: 0.3, changeFrequency: "monthly", lastModified: new Date(), category: "static" },
];

export function getAllIndexableUrls(): IndexableUrl[] {
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

  return Array.from(urls.values()).sort((a, b) => b.priority - a.priority);
}

export function getSitemapUrl() {
  return `${SITE_URL}/sitemap.xml`;
}

export const INDEXNOW_KEY = "8f3c2a1e9d4b7c6f5a0e";

export function getIndexNowKeyLocation() {
  return `${SITE_URL}/${INDEXNOW_KEY}.txt`;
}
