import fs from "fs";
import path from "path";

import { SITE_URL } from "@/constants";
import { blogUrl } from "@/lib/blogAutomation/topics";

export type BlogPublishRecord = {
  date: string;
  slug: string;
  title: string;
  url: string;
  wordCount: number;
  faqCount: number;
  regions: string[];
  primaryTool: string;
  searchConsoleInspectUrl: string;
  indexed: boolean;
  notes: string;
};

const historyJsonPath = path.join(process.cwd(), "scripts/blog-publish-history.json");
const historyMdPath = path.join(process.cwd(), "BLOG_PUBLISH_HISTORY.md");
const publicHistoryPath = path.join(process.cwd(), "public/blog-publish-history.json");

export function readPublishHistory(): BlogPublishRecord[] {
  if (!fs.existsSync(historyJsonPath)) {
    return [];
  }

  const raw = JSON.parse(fs.readFileSync(historyJsonPath, "utf-8")) as BlogPublishRecord[];
  return Array.isArray(raw) ? raw : [];
}

export function appendPublishRecord(record: BlogPublishRecord) {
  const history = readPublishHistory();
  history.unshift(record);
  fs.writeFileSync(historyJsonPath, `${JSON.stringify(history, null, 2)}\n`);
  fs.writeFileSync(publicHistoryPath, `${JSON.stringify(history, null, 2)}\n`);
  writeHistoryMarkdown(history);
}

function writeHistoryMarkdown(history: BlogPublishRecord[]) {
  const lines = [
    "# Blog Publish History — Manual Indexing Links",
    "",
    "Daily SEO blogs auto-published at **10:00 AM IST** via GitHub Actions.",
    "When you have time, request indexing in [Google Search Console](https://search.google.com/search-console).",
    "",
    "| Date | Title | Live URL | Words | FAQs | Index me |",
    "|------|-------|----------|-------|------|----------|",
  ];

  for (const row of history) {
    lines.push(
      `| ${row.date} | ${row.title.replace(/\|/g, "\\|")} | [Open blog](${row.url}) | ${row.wordCount} | ${row.faqCount} | [Search Console inspect](${row.searchConsoleInspectUrl}) |`
    );
  }

  lines.push("");
  lines.push("## Quick indexing steps");
  lines.push("");
  lines.push("1. Open the **Search Console inspect** link for the row above.");
  lines.push("2. Click **Request indexing** after the URL is fetched.");
  lines.push(`3. Confirm sitemap is submitted: ${SITE_URL}/sitemap.xml`);
  lines.push("4. Check GA4 Realtime after 30 minutes to verify traffic tracking.");
  lines.push("");
  lines.push(`_Last updated: ${new Date().toISOString()}_`);

  fs.writeFileSync(historyMdPath, `${lines.join("\n")}\n`);
}

export function buildSearchConsoleInspectUrl(pageUrl: string) {
  return `https://search.google.com/search-console/inspect?resource_id=${encodeURIComponent(SITE_URL)}&id=${encodeURIComponent(pageUrl)}`;
}

export function buildRecord(input: {
  slug: string;
  title: string;
  wordCount: number;
  faqCount: number;
  regions: string[];
  primaryTool: string;
  date: string;
}): BlogPublishRecord {
  const url = blogUrl(input.slug);
  return {
    date: input.date,
    slug: input.slug,
    title: input.title,
    url,
    wordCount: input.wordCount,
    faqCount: input.faqCount,
    regions: input.regions,
    primaryTool: input.primaryTool,
    searchConsoleInspectUrl: buildSearchConsoleInspectUrl(url),
    indexed: false,
    notes: "Request indexing manually when ready",
  };
}

export function initHistoryFilesIfMissing() {
  if (!fs.existsSync(historyJsonPath)) {
    fs.writeFileSync(historyJsonPath, "[]\n");
  }
  if (!fs.existsSync(publicHistoryPath)) {
    fs.writeFileSync(publicHistoryPath, "[]\n");
  }
  if (!fs.existsSync(historyMdPath)) {
    writeHistoryMarkdown([]);
  }
}
