import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.reduceimagesizeonline.com";

  const blogDir = path.join(process.cwd(), "src/content/blog");

  const blogFiles = fs.readdirSync(blogDir);

  const blogSlugs = blogFiles.map((file) =>
    file.replace(".md", "")
  );

  const staticPages = [
    "",
    "/reduce-image-size",
    "/blog",
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
  ];
}
