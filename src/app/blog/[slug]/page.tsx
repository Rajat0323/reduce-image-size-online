import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import RelatedPosts from "../RelatedPosts";

type Props = {
  params: { slug: string };
};

const baseUrl = "https://www.reduceimagesizeonline.com";

// 📌 Get blog data
function getPostData(slug: string) {
  const blogDir = path.join(process.cwd(), "src/content/blog");
  const filePath = path.join(blogDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(fileContent);

  return { content, data };
}

// 🔥 Dynamic SEO Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostData(params.slug);
  if (!post) return {};

  return {
    title: post.data.title,
    description: post.data.description,
    keywords: post.data.keywords,
    openGraph: {
      title: post.data.title,
      description: post.data.description,
      url: `${baseUrl}/blog/${params.slug}`,
      siteName: "Reduce Image Size Online",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.data.title,
      description: post.data.description,
    },
  };
}

// 📌 Static generation
export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), "src/content/blog");
  const files = fs.readdirSync(blogDir);

  return files.map((file) => ({
    slug: file.replace(".md", ""),
  }));
}

// 📌 Blog Page
export default function BlogPost({ params }: Props) {
  const post = getPostData(params.slug);
  if (!post) return notFound();

  const { content, data } = post;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    description: data.description,
    author: {
      "@type": "Organization",
      name: "Reduce Image Size Online",
    },
    publisher: {
      "@type": "Organization",
      name: "Reduce Image Size Online",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${params.slug}`,
    },
    datePublished: new Date().toISOString(),
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 60 }}>
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <h1 style={{ fontSize: 40, marginBottom: 20 }}>
        {data.title}
      </h1>

      <p style={{ color: "#666", marginBottom: 30 }}>
        {data.description}
      </p>

      <article style={{ lineHeight: 1.8 }}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>

      <RelatedPosts currentSlug={params.slug} />
    </div>
  );
}
