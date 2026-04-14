import Link from "next/link";

import { getSeoArticles, getSeoRankings } from "@/lib/seoAutomationApi";

export const metadata = {
  title: "SEO Automation Dashboard",
  description: "Dashboard for keywords, generated articles, rankings, and automated SEO workflows.",
};

export default async function SeoDashboardPage() {
  const [articles, rankings] = await Promise.all([getSeoArticles().catch(() => []), getSeoRankings().catch(() => [])]);

  const publishedCount = articles.filter((article) => article.status === "published").length;
  const avgPosition =
    rankings.length > 0
      ? (
          rankings.reduce((total, item) => total + (item.position || 0), 0) /
          rankings.filter((item) => item.position).length
        ).toFixed(1)
      : "—";

  return (
    <main className="blog-shell landing">
      <div className="section-content blog-stack">
        <section className="blog-hero-card">
          <div className="blog-hero-copy">
            <span className="eyebrow-link">Admin panel</span>
            <h1 className="blog-title">SEO Automation Dashboard</h1>
            <p className="blog-summary">
              Monitor keywords, generated content, publishing output, and ranking performance from
              one place.
            </p>
            <div className="blog-chip-row">
              <span className="blog-chip">FastAPI backend</span>
              <span className="blog-chip">PostgreSQL + Redis</span>
              <span className="blog-chip">Automated publishing</span>
            </div>
          </div>

          <div className="blog-card">
            <h2>System snapshot</h2>
            <div className="article-stat">
              <strong>{articles.length}</strong>
              <span>articles in database</span>
            </div>
            <div className="article-stat">
              <strong>{publishedCount}</strong>
              <span>published articles</span>
            </div>
            <div className="article-stat">
              <strong>{avgPosition}</strong>
              <span>average tracked position</span>
            </div>
          </div>
        </section>

        <section className="blog-grid">
          <div className="blog-stack">
            <div>
              <p className="section-heading">Recent automation output</p>
              <p className="section-subtitle">
                Review generated content, check metadata, and open the public article pages.
              </p>
            </div>

            <div className="blog-card-grid">
              {articles.slice(0, 6).map((article) => (
                <Link key={article.id} href={`/admin/seo/articles/${article.slug}`} className="blog-card">
                  <span className="eyebrow-link">{article.status}</span>
                  <h2>{article.title}</h2>
                  <p>{article.meta_description}</p>
                  <div className="blog-card-footer">
                    <span>{article.published_at ? new Date(article.published_at).toLocaleDateString("en-US") : "Draft"}</span>
                    <span className="blog-card-cta">Open article</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <aside className="blog-sidebar">
            <div className="blog-sidebar-card">
              <h3>Quick links</h3>
              <ul className="blog-link-list">
                <li>
                  <Link href="/admin/seo/articles">
                    <strong>Article list</strong>
                    <span>See all generated and published articles.</span>
                  </Link>
                </li>
                <li>
                  <Link href="/articles">
                    <strong>Public article view</strong>
                    <span>Preview the frontend rendering used for published content.</span>
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
