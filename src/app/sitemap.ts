import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { intentPages } from "@/lib/intentPages";
import { toolPages } from "@/lib/toolCatalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.reduceimagesizeonline.com";
  const blogSlugs = getAllPosts().map((post) => post.slug);
  const lastModified = new Date("2026-04-02");

  const staticPages = [
    "",
    "/image-compressor",
    "/image-resizer",
    "/image-converter",
    "/background-remover",
    "/blog",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
  ];

  return [
    ...staticPages.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified,
      changeFrequency: route === "" ? ("daily" as const) : ("weekly" as const),
      priority:
        route === ""
          ? 1
          : ["/image-compressor", "/image-resizer", "/image-converter", "/background-remover", "/blog"].includes(route)
            ? 0.9
            : 0.7,
    })),

    ...blogSlugs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: slug === "complete-guide-to-image-tools-india" ? 0.85 : 0.72,
    })),

    ...[...intentPages, ...toolPages].map((page) => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: page.slug === "compress-image-to-20kb" ? 0.95 : 0.8,
    })),
  ];
}
