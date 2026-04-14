import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";

import { getSeoArticle } from "@/lib/seoAutomationApi";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getSeoArticle(params.slug);
  return {
    title: article.meta_title,
    description: article.meta_description,
    alternates: {
      canonical: `/articles/${article.slug}`,
    },
    openGraph: {
      title: article.meta_title,
      description: article.meta_description,
      url: `https://www.reduceimagesizeonline.com/articles/${article.slug}`,
      siteName: "ReduceImageSize",
      images: ["https://www.reduceimagesizeonline.com/og-image.png"],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: article.meta_title,
      description: article.meta_description,
      images: ["https://www.reduceimagesizeonline.com/og-image.png"],
    },
  };
}

export default async function PublicSeoArticlePage({ params }: Props) {
  const article = await getSeoArticle(params.slug);

  return (
    <main className="blog-shell landing">
      <div className="section-content blog-stack">
        <article className="article-shell">
          <div className="article-copy">
            <span className="eyebrow-link">Published article</span>
            <h1 className="article-title">{article.title}</h1>
            <p className="article-summary">{article.meta_description}</p>
          </div>
          <article className="article-prose">
            <ReactMarkdown>{article.content_markdown}</ReactMarkdown>
          </article>
        </article>
      </div>
    </main>
  );
}
