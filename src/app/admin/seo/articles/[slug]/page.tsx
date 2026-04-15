import ReactMarkdown from "react-markdown";

import SeoArticleAdminActions from "@/components/SeoArticleAdminActions";
import { getAdminSeoArticle } from "@/lib/seoAdminApi";

type Props = {
  params: { slug: string };
};

export default async function SeoArticleDetailPage({ params }: Props) {
  const article = await getAdminSeoArticle(params.slug);

  return (
    <main className="blog-shell landing">
      <div className="section-content blog-stack">
        <article className="article-shell">
          <div className="article-copy">
            <span className="eyebrow-link">{article.status}</span>
            <h1 className="article-title">{article.title}</h1>
            <p className="article-summary">{article.meta_description}</p>
            <SeoArticleAdminActions slug={article.slug} status={article.status} />
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
                <div className="article-stat">
                  <strong>{article.status}</strong>
                  <span>Current status</span>
                </div>
              </div>

              <div className="article-sidebar-card">
                <h3>Workflow tip</h3>
                <p>
                  Draft-first mode keeps public pages cleaner. Review the copy, polish the keyword
                  targeting, and publish only when the page feels genuinely useful.
                </p>
              </div>
            </aside>
          </div>
        </article>
      </div>
    </main>
  );
}
