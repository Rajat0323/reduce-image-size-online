import type { MetadataRoute } from "next";

import { getSitemapUrl } from "@/lib/indexableUrls";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/admin/", "/api/indexing/", "/blog/", "/articles/"],
    },
    sitemap: getSitemapUrl(),
    host: "https://www.reduceimagesizeonline.com",
  };
}
