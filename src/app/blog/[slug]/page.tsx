import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ReactMarkdown from "react-markdown";

type Props = {
  params: { slug: string };
};

// 📌 Generate Dynamic Metadata (SEO Optimized)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blogDir = path.join(process.cwd(), "src/content/blog");
  const filePath = path.join(blogDir, `${params.slug}.md`);

  if (!fs.existsSync(filePath)) {
    return {};
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(fileContent);

  return {
    title: data.title + " | Reduce Image Size Online",
    description:
      data.description ||
      "Learn how to reduce image size online without losing quality.",
    openGraph: {
      title: data.title,
      description: data.description,
      url: `https://reduceimagesizeonline.com/blog/${params.slug}`,
      type: "article",
    },
  };
}

// 📌 Static Generation for All Blog Slugs
export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), "src/content/blog");

  const files = fs.readdirSync(blogDir);

  return files.map((file) => ({
    slug: file.replace(".md", ""),
  }));
}

export default function BlogPost({ params }: Props) {
  const blogDir = path.join(process.cwd(), "src/content/blog");
  const filePath = path.join(blogDir, `${params.slug}.md`);

  if (!fs.existsSync(filePath)) {
    return notFound();
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(fileContent);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 60 }}>
      <h1 style={{ fontSize: 40, marginBottom: 20 }}>
        {data.title || params.slug}
      </h1>

      <p style={{ color: "#666", marginBottom: 30 }}>
        {data.description}
      </p>

      <article style={{ lineHeight: 1.8 }}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>
    </div>
  );
}
