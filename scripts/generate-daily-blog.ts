#!/usr/bin/env npx tsx
/**
 * Daily blog generator — run via GitHub Actions at 10:00 AM IST or manually:
 *   npm run blog:daily
 */
import fs from "fs";
import path from "path";

import matter from "gray-matter";

import {
  appendPublishRecord,
  buildRecord,
  initHistoryFilesIfMissing,
} from "@/lib/blogAutomation/history";
import {
  generateBlogPost,
  pickNextTopic,
  renderBlogMarkdown,
} from "@/lib/blogAutomation/generator";
import { blogUrl } from "@/lib/blogAutomation/topics";

const blogDir = path.join(process.cwd(), "src/content/blog");

function getExistingSlugs() {
  if (!fs.existsSync(blogDir)) {
    return new Set<string>();
  }

  return new Set(
    fs
      .readdirSync(blogDir)
      .filter((file) => file.endsWith(".md"))
      .map((file) => file.replace(/\.md$/, ""))
  );
}

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

async function main() {
  initHistoryFilesIfMissing();

  const existingSlugs = getExistingSlugs();
  const topic = pickNextTopic(existingSlugs);
  const date = todayIsoDate();
  const post = generateBlogPost(topic, date);
  const filePath = path.join(blogDir, `${post.slug}.md`);

  if (fs.existsSync(filePath)) {
    console.error(`Blog already exists: ${filePath}`);
    process.exit(1);
  }

  fs.writeFileSync(filePath, renderBlogMarkdown(post));

  const record = buildRecord({
    slug: post.slug,
    title: post.title,
    wordCount: post.totalWordCount,
    faqCount: post.faqs.length,
    regions: topic.regions,
    primaryTool: topic.primaryTool.slug,
    date,
  });

  appendPublishRecord(record);

  const summary = {
    success: true,
    slug: post.slug,
    title: post.title,
    url: blogUrl(post.slug),
    wordCount: post.totalWordCount,
    faqCount: post.faqs.length,
    searchConsoleInspectUrl: record.searchConsoleInspectUrl,
    historyFile: "BLOG_PUBLISH_HISTORY.md",
    publishLogUrl: `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.reduceimagesizeonline.com"}/blog/publish-log`,
  };

  console.log(JSON.stringify(summary, null, 2));

  if (process.env.GITHUB_STEP_SUMMARY) {
    fs.appendFileSync(
      process.env.GITHUB_STEP_SUMMARY,
      `\n## Daily blog published\n\n- **Title:** ${post.title}\n- **URL:** ${summary.url}\n- **Words:** ${post.totalWordCount}\n- **FAQs:** ${post.faqs.length}\n- **Manual index:** ${record.searchConsoleInspectUrl}\n- **History:** [BLOG_PUBLISH_HISTORY.md](./BLOG_PUBLISH_HISTORY.md)\n`
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
