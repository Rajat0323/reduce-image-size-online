import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  date: string;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

const blogDir = path.join(process.cwd(), "src/content/blog");

function parseKeywords(rawKeywords: unknown) {
  if (Array.isArray(rawKeywords)) {
    return rawKeywords.map((keyword) => String(keyword).trim()).filter(Boolean);
  }

  return String(rawKeywords || "")
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);
}

function normalizeMeta(slug: string, data: Record<string, unknown>): BlogPostMeta {
  return {
    slug,
    title: String(data.title || slug.replace(/-/g, " ")),
    description: String(data.description || ""),
    keywords: parseKeywords(data.keywords),
    date: String(data.date || "2026-01-01"),
  };
}

export function getAllPosts() {
  return fs
    .readdirSync(blogDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(".md", "");
      const filePath = path.join(blogDir, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);

      return normalizeMeta(slug, data);
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(blogDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(fileContent);
  const meta = normalizeMeta(slug, data);

  return {
    ...meta,
    content,
  };
}
