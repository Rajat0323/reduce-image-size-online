import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { intentPages } from "@/lib/intentPages";
import { toolPages } from "@/lib/toolCatalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.reduceimagesizeonline.com";
  const blogSlugs = getAllPosts().map((post) => post.slug);

  const staticPages = [
    "",
    "/image-compressor",
    "/blog",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
  ];

  return [
    ...staticPages.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),

    ...blogSlugs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),

    ...[...intentPages, ...toolPages].map((page) => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
  ];
}
