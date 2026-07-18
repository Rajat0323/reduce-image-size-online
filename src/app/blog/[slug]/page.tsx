import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import "../../../styles/hub.css";
import AuthorBio from "@/components/AuthorBio";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { buildMetaDescription } from "@/seo/metaUtils";
import { buildArticleAuthorSchema, buildPublisherSchema, SITE_AUTHOR } from "@/seo/author";
import { SITE_NAME, SITE_URL } from "@/constants";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: buildMetaDescription(post.description),
    keywords: post.keywords,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical: `/blog/${params.slug}`,
    },
    openGraph: {
      title: `${post.title} | ${SITE_NAME}`,
      description: buildMetaDescription(post.description),
      url: `${SITE_URL}/blog/${params.slug}`,
      siteName: SITE_NAME,
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | ${SITE_NAME}`,
      description: buildMetaDescription(post.description),
      images: [`${SITE_URL}/og-image.png`],
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

  const { content, title, description, date, faqs = [] } = post;
  const wordCount = content.split(/\s+/).filter(Boolean).length;
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
      href: "/remove-image-metadata",
      title: "Remove image metadata",
      copy: "Strip EXIF and GPS data from photos before sharing or uploading.",
    },
  ];
  const contextualToolLinks = toolLinks.filter((item) => {
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
    description: buildMetaDescription(description),
    image: `${SITE_URL}/og-image.png`,
    author: buildArticleAuthorSchema(),
    publisher: buildPublisherSchema(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${params.slug}`,
    },
    datePublished: date,
    dateModified: date,
    wordCount,
    inLanguage: "en",
  };

  const faqSchema =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to use free online image tools on ${SITE_NAME}`,
    description: buildMetaDescription(description),
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Choose the right tool",
        text: "Match your goal to the compressor, resizer, converter, or exact-KB page on ReduceImageSize.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Upload your image",
        text: "Use the upload area at the top of the tool page. Files stay in your browser during processing.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Adjust settings and preview",
        text: "Resize or convert first if needed, then compress. Preview at full zoom before downloading.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Download and verify",
        text: "Check file size and dimensions against portal requirements before submitting.",
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `${SITE_URL}/blog/${params.slug}`,
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

      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
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
                By{" "}
                <Link href="/about">{SITE_AUTHOR.name}</Link>
                {" · "}
                {new Date(date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span>{post.keywords.slice(0, 3).join(" · ")}</span>
            </div>
            <div className="article-chip-row">
              <span className="article-chip">Practical upload guides</span>
              <span className="article-chip">Tested in the browser</span>
              <span className="article-chip">Written by {SITE_AUTHOR.name.split(" ")[0]}</span>
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

              {faqs.length > 0 && (
                <section className="article-cta">
                  <h2>Frequently asked questions</h2>
                  <p className="article-summary">
                    Common questions about this workflow, file privacy, and upload tips.
                  </p>
                  <div className="grid faq-grid" style={{ marginTop: 20 }}>
                    {faqs.map((faq) => (
                      <article key={faq.question} className="faq-card">
                        <h3>{faq.question}</h3>
                        <p>{faq.answer}</p>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              <AuthorBio />
            </div>

            <aside className="article-sidebar">
              <div className="article-sidebar-card">
                <AuthorBio variant="compact" className="author-bio-compact" />
              </div>

              <div className="article-sidebar-card">
                <h3>About this guide</h3>
                <div className="article-stat">
                  <strong>{wordCount.toLocaleString()}</strong>
                  <span>Words — written for real upload problems</span>
                </div>
                <div className="article-stat">
                  <strong>{faqs.length || "—"}</strong>
                  <span>FAQ answers from hands-on testing</span>
                </div>
                <div className="article-stat">
                  <strong>{SITE_AUTHOR.name.split(" ")[0]}</strong>
                  <span>Author — founder of {SITE_NAME}</span>
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
