import { intentPages } from "@/lib/intentPages";
import { toolPages } from "@/lib/toolCatalog";

export type SiteToolRef = {
  slug: string;
  label: string;
};

function labelFromSlug(slug: string) {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace(/Kb/g, "KB")
    .replace(/(\d+)x(\d+)/g, "$1×$2");
}

export function getAllSiteTools(): SiteToolRef[] {
  const bySlug = new Map<string, SiteToolRef>();

  for (const tool of toolPages) {
    bySlug.set(tool.slug, { slug: tool.slug, label: tool.name });
  }

  for (const page of intentPages) {
    if (!bySlug.has(page.slug)) {
      bySlug.set(page.slug, { slug: page.slug, label: labelFromSlug(page.slug) });
    }
  }

  return Array.from(bySlug.values()).sort((a, b) => a.slug.localeCompare(b.slug));
}

export function getSiteToolSlugSet() {
  return new Set(getAllSiteTools().map((tool) => tool.slug));
}

export function getSiteToolLabel(slug: string) {
  return getAllSiteTools().find((tool) => tool.slug === slug)?.label ?? labelFromSlug(slug);
}

export function assertSiteToolSlug(slug: string, context: string) {
  if (!getSiteToolSlugSet().has(slug)) {
    throw new Error(`Unknown site tool slug "${slug}" in ${context}. Blog topics must only link to live tools on reduceimagesizeonline.com.`);
  }
}

export function validateBlogTopicTools(input: {
  slug: string;
  primaryTool: { slug: string };
  relatedTools: { slug: string }[];
}) {
  assertSiteToolSlug(input.primaryTool.slug, `topic "${input.slug}" primaryTool`);
  for (const tool of input.relatedTools) {
    assertSiteToolSlug(tool.slug, `topic "${input.slug}" relatedTools`);
  }
}
