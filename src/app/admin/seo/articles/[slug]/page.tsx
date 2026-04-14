import ReactMarkdown from "react-markdown";

import { getSeoArticle } from "@/lib/seoAutomationApi";

type Props = {
  params: { slug: string };
};

export default async function SeoArticleDetailPage({ params }: Props) {
  const article = await getSeoArticle(params.slug);

  return (
    <main className="blog-shell landing">
      <div className="section-content blog-stack">
        <article className="article-shell">
          <div className="article-copy">
            <span className="eyebrow-link">{article.status}</span>
            <h1 className="article-title">{article.title}</h1>
            <p className="article-summary">{article.meta_description}</p>
          </div>

          <div className="article-layout">
            <div className="article-main">
              <article className="article-prose">
                <ReactMarkdown>{article.content_markdown}</ReactMarkdown>
              </article>
            </div>

            <aside className="article-sidebar">
              <div className="article-sidebar-card">
                <h3>SEO metadata</h3>
                <div className="article-stat">
                  <strong>{article.meta_title}</strong>
                  <span>Meta title</span>
                </div>
                <div className="article-stat">
                  <strong>{article.slug}</strong>
                  <span>Slug</span>
                </div>
              </div>
            </aside>
          </div>
        </article>
      </div>
    </main>
  );
}
