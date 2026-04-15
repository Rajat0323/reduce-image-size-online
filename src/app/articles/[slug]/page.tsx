import type { Metadata } from "next";
import Link from "next/link";
import { Children, isValidElement, type ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";

import { getSeoArticle } from "@/lib/seoAutomationApi";

type Props = {
  params: { slug: string };
};

type HeadingItem = {
  level: 2 | 3;
  text: string;
  id: string;
};

const relatedArticleLinks = [
  { href: "/articles", label: "Automation article hub", description: "See the latest published SEO articles." },
  { href: "/blog", label: "SEO blog library", description: "Explore human-written guides and internal linking opportunities." },
  {
    href: "/image-compressor",
    label: "Launch image compressor",
    description: "Open the main tool that supports the strongest compression intents.",
  },
];

function toAnchorId(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function stripLeadingTitle(markdown: string) {
  return markdown.replace(/^#\s.+?(\r?\n){1,2}/, "");
}

function extractHeadings(markdown: string) {
  return markdown
    .split(/\r?\n/)
    .map((line) => line.trim())
    .flatMap((line) => {
      const match = /^(##|###)\s+(.+)$/.exec(line);
      if (!match) {
        return [];
      }

      const level = match[1].length as 2 | 3;
      const text = match[2].trim();
      return [{ level, text, id: toAnchorId(text) }];
    });
}

function getWordCount(markdown: string) {
  return markdown
    .split(/\s+/)
    .map((word) => word.trim())
    .filter(Boolean).length;
}

function getPrimaryCta(slug: string) {
  const normalized = slug.toLowerCase();
  if (normalized.includes("jpg") || normalized.includes("png") || normalized.includes("webp") || normalized.includes("convert")) {
    return {
      href: "/image-converter",
      label: "Open image converter",
      description: "Switch formats quickly when file type matters more than file size.",
    };
  }

  if (normalized.includes("resize")) {
    return {
      href: "/image-resizer",
      label: "Open image resizer",
      description: "Resize dimensions before compression for cleaner results.",
    };
  }

  return {
    href: "/image-compressor",
    label: "Open image compressor",
    description: "Apply the workflow from this article inside the live compression tool.",
  };
}

function flattenNodeText(children: ReactNode): string {
  return Children.toArray(children)
    .map((child) => {
      if (typeof child === "string") {
        return child;
      }

      if (typeof child === "number") {
        return String(child);
      }

      if (isValidElement<{ children?: ReactNode }>(child)) {
        return flattenNodeText(child.props.children);
      }

      return "";
    })
    .join("");
}

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
  const cleanedMarkdown = stripLeadingTitle(article.content_markdown);
  const headings = extractHeadings(cleanedMarkdown);
  const readTime = Math.max(4, Math.round(getWordCount(cleanedMarkdown) / 220));
  const primaryCta = getPrimaryCta(article.slug);
  const publishedLabel = article.published_at
    ? new Date(article.published_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Fresh draft";

  const markdownComponents: Components = {
    h1: ({ children }) => {
      const text = flattenNodeText(children);
      return <h2 id={toAnchorId(text)}>{children}</h2>;
    },
    h2: ({ children }) => {
      const text = flattenNodeText(children);
      return <h2 id={toAnchorId(text)}>{children}</h2>;
    },
    h3: ({ children }) => {
      const text = flattenNodeText(children);
      return <h3 id={toAnchorId(text)}>{children}</h3>;
    },
  };

  return (
    <main className="blog-shell landing">
      <div className="section-content blog-stack">
        <article className="article-shell article-shell-premium">
          <div className="article-layout article-layout-premium">
            <div className="article-main">
              <header className="article-copy article-hero-premium">
                <span className="eyebrow-link">Published article</span>
                <h1 className="article-title">{article.title}</h1>
                <p className="article-summary">{article.meta_description}</p>

                <div className="article-meta">
                  <span>{publishedLabel}</span>
                  <span>{readTime} min read</span>
                  <span>{headings.length} helpful sections</span>
                </div>

                <div className="article-actions">
                  <Link className="btn btn-primary" href={primaryCta.href}>
                    {primaryCta.label}
                  </Link>
                  <Link className="btn btn-ghost" href="/articles">
                    Browse all articles
                  </Link>
                </div>
              </header>

              <section className="article-highlight-band">
                <div className="article-highlight-card">
                  <strong>Best for</strong>
                  <p>Upload limits, exam forms, KYC images, passport photos, and mobile-first workflows.</p>
                </div>
                <div className="article-highlight-card">
                  <strong>Core promise</strong>
                  <p>Clear steps, real-world trade-offs, and a direct path back to the live tool when you are ready.</p>
                </div>
                <div className="article-highlight-card">
                  <strong>Next move</strong>
                  <p>{primaryCta.description}</p>
                </div>
              </section>

              <article className="article-prose article-prose-premium">
                <ReactMarkdown components={markdownComponents}>{cleanedMarkdown}</ReactMarkdown>
              </article>

              <section className="article-link-grid">
                {relatedArticleLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="article-cta">
                    <h3>{link.label}</h3>
                    <p>{link.description}</p>
                  </Link>
                ))}
              </section>
            </div>

            <aside className="article-sidebar">
              <div className="article-sidebar-card">
                <h3>On this page</h3>
                <ul className="article-link-list article-toc-list">
                  {headings.slice(0, 8).map((heading) => (
                    <li key={heading.id}>
                      <a href={`#${heading.id}`} data-level={heading.level}>
                        <strong>{heading.text}</strong>
                        <span>{heading.level === 2 ? "Main section" : "Supporting detail"}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="article-sidebar-card">
                <h3>Why this article helps</h3>
                <div className="article-stat">
                  <strong>Search intent aligned</strong>
                  <span>Built around a real user task, not filler content.</span>
                </div>
                <div className="article-stat">
                  <strong>Tool-ready CTA</strong>
                  <span>Guides readers from learning into using your live converter or compressor.</span>
                </div>
                <div className="article-stat">
                  <strong>Internal link support</strong>
                  <span>Helps search engines connect your articles, tool pages, and conversion workflows.</span>
                </div>
              </div>
            </aside>
          </div>
        </article>
      </div>
    </main>
  );
}
