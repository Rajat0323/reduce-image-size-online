import Link from "next/link";
import type { Metadata } from "next";

import "../../styles/hub.css";
import { getAllPosts } from "@/lib/blog";
import { homeTools } from "@/lib/toolCatalog";

export const metadata: Metadata = {
  title: "Image Compression Blog India | ReduceImageSize",
  description:
    "Read practical guides for image compression, exact-KB uploads, website speed, and ml to oz calculator searches.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Image Compression Blog India | ReduceImageSize",
    description:
      "Practical guides for image compressor to 20KB, exact-size uploads, format conversion, faster web images, and ml to oz.",
    url: "https://www.reduceimagesizeonline.com/blog",
    siteName: "ReduceImageSize",
    images: [
      {
        url: "https://www.reduceimagesizeonline.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "ReduceImageSize blog",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Compression Blog India | ReduceImageSize",
    description:
      "Learn exact-KB compression, image conversion, and mobile-friendly upload workflows for India-focused use cases.",
    images: ["https://www.reduceimagesizeonline.com/og-image.png"],
  },
};

export default function BlogPage() {
  const blogs = getAllPosts();
  const [featuredPost, ...otherPosts] = blogs;
  const featuredTools = homeTools.slice(0, 4);
  const quickLinks = [
    {
      href: "/image-compressor",
      title: "Open the main compressor",
      copy: "Reduce JPG, PNG, and WebP images with before-and-after previews.",
    },
    {
      href: "/compress-image-to-50kb",
      title: "Compress image to 50KB",
      copy: "Great for forms, applications, and profile uploads with size limits.",
    },
    {
      href: "/compress-image-to-100kb",
      title: "Compress image to 100KB",
      copy: "Useful for web-ready profile photos, avatars, and lightweight assets.",
    },
    {
      href: "/ml-to-oz-calculator",
      title: "Use the ML to oz calculator",
      copy: "Convert milliliters to ounces fast for US recipes, bottles, and packaging.",
    },
  ];

  return (
    <main className="blog-shell landing">
      <div className="section-content blog-stack">
        {featuredPost && (
          <section className="blog-hero-card reveal-fade">
            <div className="blog-hero-copy">
              <span className="eyebrow-link">Featured guide</span>
              <h1 className="blog-title">Image Optimization Blog</h1>
              <p className="blog-summary">
                Learn how to compress, resize, convert, and prepare images for Indian government
                forms, KYC uploads, passport photos, exams, mobile uploads, and fast websites.
              </p>
              <div className="blog-chip-row">
                <span className="blog-chip">Exact-KB workflows</span>
                <span className="blog-chip">Website performance</span>
                <span className="blog-chip">Professional image editing</span>
              </div>
              <div className="article-actions">
                <Link href={`/blog/${featuredPost.slug}`} className="btn btn-primary">
                  Read featured article
                </Link>
                <Link href="/image-compressor" className="btn btn-ghost">
                  Open compressor
                </Link>
              </div>
            </div>

            <Link href={`/blog/${featuredPost.slug}`} className="blog-card">
              <span className="eyebrow-link">Editor&apos;s pick</span>
              <h2>{featuredPost.title}</h2>
              <p>{featuredPost.description}</p>
              <div className="blog-card-footer">
                <span>
                  {new Date(featuredPost.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="blog-card-cta">Read article</span>
              </div>
            </Link>
          </section>
        )}

        <section className="blog-grid">
          <div className="blog-stack">
            <div>
              <p className="section-heading">Latest image guides</p>
              <p className="section-subtitle">
                Every article is written to help visitors choose the right tool quickly and move
                through exact-size uploads with fewer retries and more confidence about quality
                limits.
              </p>
            </div>

            <div className="blog-card-grid">
              {otherPosts.map((blog) => (
                <Link key={blog.slug} href={`/blog/${blog.slug}`} className="blog-card reveal-fade">
                  <span className="eyebrow-link">Blog article</span>
                  <h2>{blog.title}</h2>
                  <p>{blog.description}</p>
                  <div className="blog-card-footer">
                    <span>
                      {new Date(blog.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="blog-card-cta">Read more</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <aside className="blog-sidebar">
            <div className="blog-sidebar-card reveal-fade">
              <h3>Popular tool paths</h3>
              <p>Send readers directly into the most common workflows from the content hub.</p>
              <ul className="blog-link-list">
                {quickLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>
                      <strong>{item.title}</strong>
                      <span>{item.copy}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="blog-sidebar-card reveal-fade">
              <h3>Browse top tools</h3>
              <p>Move between content and tools without breaking the user journey.</p>
              <ul className="blog-link-list">
                {featuredTools.map((tool) => (
                  <li key={tool.slug}>
                    <Link href={`/${tool.slug}`}>
                      <strong>{tool.name}</strong>
                      <span>{tool.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
