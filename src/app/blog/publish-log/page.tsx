import Link from "next/link";
import type { Metadata } from "next";

import { readPublishHistory } from "@/lib/blogAutomation/history";

export const metadata: Metadata = {
  title: "Blog Publish History — Manual Indexing Links",
  description:
    "Daily auto-published SEO blog history with live URLs and Google Search Console inspect links for manual indexing.",
  robots: { index: false, follow: false },
};

type HistoryRow = {
  date: string;
  slug: string;
  title: string;
  url: string;
  wordCount: number;
  faqCount: number;
  searchConsoleInspectUrl: string;
};

export default function BlogPublishLogPage() {
  const rows = readPublishHistory() as HistoryRow[];

  return (
    <main className="blog-shell landing">
      <div className="section-content blog-stack">
        <section className="blog-hero-card">
          <h1 className="blog-title">Daily Blog Publish Log</h1>
          <p className="blog-summary">
            Auto-published at 10:00 AM IST via Cursor. Use the Search Console links below when you have time
            to request manual indexing.
          </p>
          <Link href="/blog" className="btn btn-ghost">
            Back to blog
          </Link>
        </section>

        <section className="blog-card" style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th align="left">Date</th>
                <th align="left">Title</th>
                <th align="left">Live URL</th>
                <th align="left">Words</th>
                <th align="left">Index</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td colSpan={5}>No auto-published posts yet. First run: npm run blog:daily</td>
                </tr>
              )}
              {rows.map((row) => (
                <tr key={`${row.slug}-${row.date}`}>
                  <td>{row.date}</td>
                  <td>{row.title}</td>
                  <td>
                    <Link href={`/blog/${row.slug}`}>{row.url}</Link>
                  </td>
                  <td>{row.wordCount}</td>
                  <td>
                    <a href={row.searchConsoleInspectUrl} target="_blank" rel="noopener noreferrer">
                      Search Console
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}
