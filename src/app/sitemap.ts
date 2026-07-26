import { MetadataRoute } from "next";

import { getAllIndexableUrls } from "@/lib/indexableUrls";

/**
 * Sitemap must only list final 200 URLs.
 * Do not include /blog/*, /articles/*, or legacy tool URLs (they 301 to /).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return getAllIndexableUrls().map(({ url, lastModified, changeFrequency, priority }) => ({
    url,
    lastModified,
    changeFrequency,
    priority,
  }));
}
