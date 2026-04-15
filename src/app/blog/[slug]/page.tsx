import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import "../../../styles/hub.css";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

const baseUrl = "https://www.reduceimagesizeonline.com";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${params.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${baseUrl}/blog/${params.slug}`,
      siteName: "Reduce Image Size Online",
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${post.title} | ReduceImageSize`,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`${baseUrl}/og-image.png`],
    },
  };
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPost({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) return notFound();

  const { content, title, description, date } = post;
  const lowerSlug = params.slug.toLowerCase();
  const lowerKeywords = post.keywords.map((keyword) => keyword.toLowerCase());
  const toolLinks = [
    {
      href: "/image-compressor",
      title: "Open image compressor",
      copy: "Compress JPG, PNG, and WebP with live size reduction stats.",
    },
    {
      href: "/image-resizer",
      title: "Resize image online",
      copy: "Adjust width, height, or percentage without leaving the browser.",
    },
    {
      href: "/image-converter",
      title: "Convert image formats",
      copy: "Switch between JPG, PNG, and WebP for the right workflow.",
    },
    {
      href: "/background-remover",
      title: "Background remover",
      copy: "Create transparent cutouts for listings, profile photos, and cards.",
    },
    {
      href: "/ml-to-oz-calculator",
      title: "ML to oz calculator",
      copy: "Convert milliliters to ounces quickly for US recipes, bottle labels, and kitchen prep.",
    },
  ];
  const contextualToolLinks = toolLinks.filter((item) => {
    if (lowerSlug.includes("ml-to-oz")) {
      return item.href === "/ml-to-oz-calculator";
    }

    if (lowerSlug.includes("convert") || lowerKeywords.some((keyword) => keyword.includes("png") || keyword.includes("jpg") || keyword.includes("webp"))) {
      return item.href === "/image-converter" || item.href === "/image-compressor";
    }

    if (lowerSlug.includes("quality") || lowerSlug.includes("kb") || lowerSlug.includes("compress")) {
      return item.href === "/image-compressor" || item.href === "/image-resizer";
    }

    return true;
  });
  const activeToolLinks = contextualToolLinks.length > 0 ? contextualToolLinks : toolLinks.slice(0, 4);
  const popularTargets = [
    { href: "/compress-image-to-20kb", title: "Compress to 20KB" },
    { href: "/compress-image-to-50kb", title: "Compress to 50KB" },
    { href: "/compress-image-to-100kb", title: "Compress to 100KB" },
    { href: "/compress-image-to-200kb", title: "Compress to 200KB" },
  ];
  const relatedToolJourneys = [
    {
      href: "/jpg-to-webp-converter",
      title: "JPG to WEBP converter",
      copy: "Pair file-size guides with modern format conversion when website speed matters.",
    },
    {
      href: "/png-to-jpg-converter",
      title: "PNG to JPG converter",
      copy: "Useful when PNG files stay too large and you need a smaller upload-friendly format.",
    },
    {
      href: "/compress-image-to-20kb",
      title: "Exact 20KB workflow",
      copy: "Jump into the preset landing page when your form or portal needs a hard 20KB target.",
    },
    {
      href: "/compress-image-to-50kb",
      title: "Exact 50KB workflow",
      copy: "Use the 50KB route when you need a slightly higher quality ceiling for forms or profile photos.",
    },
    {
      href: "/image-resizer",
      title: "Image resizer workflow",
      copy: "Resize before compressing when dimensions matter as much as file size.",
    },
    {
      href: "/image-converter",
      title: "Image converter workflow",
      copy: "Switch formats when JPG, PNG, or WebP choice changes the final upload result.",
    },
  ].filter((item) => item.href !== `/${params.slug}`);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
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
    datePublished: date,
    dateModified: date,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${baseUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `${baseUrl}/blog/${params.slug}`,
      },
    ],
  };

  return (
    <main className="blog-shell landing">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <div className="section-content blog-stack">
        <article className="article-shell">
          <div className="article-copy">
            <Link href="/blog" className="eyebrow-link">
              Back to blog
            </Link>
            <h1 className="article-title">{title}</h1>
            <p className="article-summary">{description}</p>
            <div className="article-meta">
              <span>
                Published{" "}
                {new Date(date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span>{post.keywords.slice(0, 3).join(" | ")}</span>
            </div>
            <div className="article-chip-row">
              <span className="article-chip">India-focused use cases</span>
              <span className="article-chip">Internal tool links</span>
              <span className="article-chip">Honest quality guidance</span>
            </div>
          </div>

          <div className="article-layout">
            <div className="article-main">
              <section className="article-internal-links">
                <div className="article-internal-links-header">
                  <h2>Useful internal links for this topic</h2>
                  <p>
                    Keep readers moving between the guide, the live tool, and the next best
                    supporting workflow without making them search from scratch.
                  </p>
                </div>

                <div className="article-link-grid">
                  {activeToolLinks.slice(0, 3).map((item) => (
                    <Link key={item.href} href={item.href} className="article-cta">
                      <span className="eyebrow-link">Tool</span>
                      <h3>{item.title}</h3>
                      <p>{item.copy}</p>
                    </Link>
                  ))}
                </div>
              </section>

              <article className="article-prose">
                <ReactMarkdown
                  components={{
                    a: ({ ...props }) => <a {...props} target="_self" rel={undefined} />,
                    h1: ({ children }) => <h2>{children}</h2>,
                  }}
                >
                  {content}
                </ReactMarkdown>
              </article>

              <section className="article-cta">
                <h3>Continue with the tool</h3>
                <p>
                  Move from the guide directly into the workflow for compression, resizing,
                  conversion, or exact-KB targets.
                </p>
                <div className="article-link-grid" style={{ marginTop: 20 }}>
                  {activeToolLinks.map((item) => (
                    <Link key={item.href} href={item.href} className="blog-card">
                      <span className="eyebrow-link">Tool</span>
                      <h3>{item.title}</h3>
                      <p>{item.copy}</p>
                    </Link>
                  ))}
                </div>
              </section>

              <section className="article-cta">
                <h3>More related paths</h3>
                <p>
                  Add deeper internal links so each guide supports exact-KB pages, conversion
                  tools, and the most relevant workflows on the site.
                </p>
                <div className="article-link-grid" style={{ marginTop: 20 }}>
                  {relatedToolJourneys.map((item) => (
                    <Link key={item.href} href={item.href} className="blog-card">
                      <span className="eyebrow-link">Next step</span>
                      <h3>{item.title}</h3>
                      <p>{item.copy}</p>
                    </Link>
                  ))}
                </div>
              </section>
            </div>

            <aside className="article-sidebar">
              <div className="article-sidebar-card">
                <h3>Article snapshot</h3>
                <div className="article-stat">
                  <strong>{post.keywords.length}</strong>
                  <span>SEO keywords covered</span>
                </div>
                <div className="article-stat">
                  <strong>4</strong>
                  <span>Exact-KB shortcuts</span>
                </div>
                <div className="article-stat">
                  <strong>100%</strong>
                  <span>Internal-tool focused journey</span>
                </div>
                <div className="article-stat">
                  <strong>India</strong>
                  <span>Use cases like forms, KYC, and mobile uploads</span>
                </div>
              </div>

              <div className="article-sidebar-card">
                <h3>Popular exact-size pages</h3>
                <ul className="article-link-list">
                  {popularTargets.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href}>
                        <strong>{item.title}</strong>
                        <span>Open the preset page and start closer to the file size you need.</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </article>
      </div>
    </main>
  );
}
