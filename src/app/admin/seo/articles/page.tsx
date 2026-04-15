import Link from "next/link";

import { getAdminSeoArticles } from "@/lib/seoAdminApi";

export const metadata = {
  title: "SEO Articles",
  description: "Admin list of generated SEO articles and publication status.",
};

export default async function SeoArticlesPage() {
  const articles = await getAdminSeoArticles().catch(() => []);

  return (
    <main className="blog-shell landing">
      <div className="section-content blog-stack">
        <div>
          <p className="section-heading">SEO article review queue</p>
          <p className="section-subtitle">
            Work through drafts, improve quality, and publish the strongest pages when they are
            truly ready for the public site.
          </p>
        </div>

        <div className="blog-card-grid">
          {articles.map((article) => (
            <Link key={article.id} href={`/admin/seo/articles/${article.slug}`} className="blog-card">
              <span className="eyebrow-link">{article.status}</span>
              <h2>{article.title}</h2>
              <p>{article.meta_description}</p>
              <div className="blog-card-footer">
                <span>{article.slug}</span>
                <span className="blog-card-cta">Review</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
