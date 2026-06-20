import Link from "next/link";
import type { Metadata } from "next";

import { getSeoArticles } from "@/lib/seoAutomationApi";

export const metadata: Metadata = {
  title: "Image Guides & Tips",
  description:
    "Browse practical image compression guides, exact-KB upload tips, and format conversion articles for Indian forms, KYC, and website optimization.",
  alternates: {
    canonical: "/articles",
  },
  openGraph: {
    title: "Image Guides & Tips | ReduceImageSize",
    description:
      "Practical image compression guides and exact-KB upload tips for Indian forms, KYC, passport photos, and website optimization.",
    url: "https://www.reduceimagesizeonline.com/articles",
    siteName: "ReduceImageSize",
    images: ["https://www.reduceimagesizeonline.com/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Guides & Tips | ReduceImageSize",
    description:
      "Practical image compression guides and exact-KB upload tips for Indian forms, KYC, and website optimization.",
    images: ["https://www.reduceimagesizeonline.com/og-image.png"],
  },
};

export default async function PublicSeoArticlesPage() {
  const articles = await getSeoArticles().catch(() => []);

  return (
    <main className="blog-shell landing">
      <div className="section-content blog-stack">
        <header>
          <h1 className="blog-title">Image Guides & Tips</h1>
          <p className="blog-summary">
            Practical guides for image compression, exact-KB uploads, format conversion, and
            mobile-friendly workflows for Indian government forms, KYC, and website optimization.
          </p>
        </header>

        <div className="blog-card-grid">
          {articles
            .filter((article) => article.status === "published")
            .map((article) => (
              <Link key={article.id} href={`/articles/${article.slug}`} className="blog-card">
                <span className="eyebrow-link">Guide</span>
                <h2>{article.title}</h2>
                <p>{article.meta_description}</p>
                <div className="blog-card-footer">
                  <span>{article.published_at ? new Date(article.published_at).toLocaleDateString("en-IN") : ""}</span>
                  <span className="blog-card-cta">Read article</span>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </main>
  );
}
