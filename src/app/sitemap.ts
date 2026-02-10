import { MetadataRoute } from "next";

// अगर future में blog dynamic होगा तो यहाँ से fetch कर सकते हो
async function getBlogPosts() {
  // Example static (later you can connect database or files)
  return [
    {
      slug: "reduce-image-size-in-kb",
    },
    {
      slug: "compress-jpg-online",
    },
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://reduceimagesizeonline.com";

  const blogPosts = await getBlogPosts();

  const blogUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/reduce-image-size`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...blogUrls,
  ];
}
