"use client";

import { useState, useTransition } from "react";

import type { SeoPipelineResult } from "@/lib/seoAutomationApi";

const defaultForm = {
  seed_keyword: "image compressor to 20kb",
  niche: "india",
  country: "IN",
  max_results: 5,
  publish_count: 1,
  target_word_count: 2200,
  sync_rankings: false,
};

async function callAdminApi<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const error = (await response.json().catch(() => null)) as { detail?: string } | null;
    throw new Error(error?.detail || "Request failed.");
  }

  return response.json() as Promise<T>;
}

export default function SeoAutomationControls() {
  const [form, setForm] = useState(defaultForm);
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<SeoPipelineResult | null>(null);
  const [isPending, startTransition] = useTransition();

  function updateField<K extends keyof typeof defaultForm>(key: K, value: (typeof defaultForm)[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function runPipeline() {
    setMessage("");
    startTransition(async () => {
      try {
        const response = await callAdminApi<SeoPipelineResult>("/api/admin/manual-run", {
          method: "POST",
          body: JSON.stringify(form),
        });
        setResult(response);

        const draftCount = response.published_articles.filter((article) => article.status !== "published").length;
        if (draftCount > 0) {
          setMessage(`Manual pipeline completed. ${draftCount} draft${draftCount > 1 ? "s" : ""} ready for review.`);
        } else {
          setMessage("Manual pipeline completed.");
        }
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Pipeline failed.");
      }
    });
  }

  function runRankingSync() {
    setMessage("");
    startTransition(async () => {
      try {
        const response = await callAdminApi<{ synced_keywords: number; records_written: number; source: string }>(
          "/api/admin/sync-rankings",
          {
            method: "POST",
          }
        );
        setMessage(
          `Ranking sync finished. Checked ${response.synced_keywords} keywords and wrote ${response.records_written} rows.`
        );
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Ranking sync failed.");
      }
    });
  }

  const draftCount = result?.published_articles.filter((article) => article.status !== "published").length || 0;
  const publishedCount = result?.published_articles.filter((article) => article.status === "published").length || 0;

  return (
    <section className="blog-card admin-action-card">
      <div className="admin-action-header">
        <div>
          <p className="section-heading">Manual trigger</p>
          <p className="section-subtitle">
            Free-stage workflow: manually trigger keyword discovery, generate richer draft content,
            and publish only after review.
          </p>
        </div>
        <div className="blog-chip-row">
          <span className="blog-chip">No worker needed</span>
          <span className="blog-chip">Draft-first flow</span>
          <span className="blog-chip">Protected admin run</span>
        </div>
      </div>

      <div className="admin-form-grid">
        <label>
          <span className="field-label">Seed keyword</span>
          <input
            className="tool-input"
            value={form.seed_keyword}
            onChange={(event) => updateField("seed_keyword", event.target.value)}
          />
        </label>
        <label>
          <span className="field-label">Niche</span>
          <input
            className="tool-input"
            value={form.niche}
            onChange={(event) => updateField("niche", event.target.value)}
          />
        </label>
        <label>
          <span className="field-label">Country</span>
          <input
            className="tool-input"
            value={form.country}
            onChange={(event) => updateField("country", event.target.value.toUpperCase())}
          />
        </label>
        <label>
          <span className="field-label">Keyword count</span>
          <input
            className="tool-input"
            type="number"
            min={1}
            max={20}
            value={form.max_results}
            onChange={(event) => updateField("max_results", Number(event.target.value))}
          />
        </label>
        <label>
          <span className="field-label">Articles to draft</span>
          <input
            className="tool-input"
            type="number"
            min={1}
            max={5}
            value={form.publish_count}
            onChange={(event) => updateField("publish_count", Number(event.target.value))}
          />
        </label>
        <label>
          <span className="field-label">Target words</span>
          <input
            className="tool-input"
            type="number"
            min={1200}
            max={4000}
            step={100}
            value={form.target_word_count}
            onChange={(event) => updateField("target_word_count", Number(event.target.value))}
          />
        </label>
      </div>

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={form.sync_rankings}
          onChange={(event) => updateField("sync_rankings", event.target.checked)}
        />
        <span>Also sync rankings after drafting</span>
      </label>

      <div className="admin-action-row">
        <button className="btn btn-primary" type="button" onClick={runPipeline} disabled={isPending}>
          {isPending ? "Running..." : "Run Manual Pipeline"}
        </button>
        <button className="btn btn-ghost" type="button" onClick={runRankingSync} disabled={isPending}>
          Sync Rankings Only
        </button>
      </div>

      {message ? <p className="admin-feedback">{message}</p> : null}

      {result ? (
        <div className="admin-result-shell">
          <div className="blog-chip-row">
            <span className="blog-chip">{result.discovered_keywords.length} keywords discovered</span>
            {draftCount > 0 ? <span className="blog-chip">{draftCount} drafts prepared</span> : null}
            {publishedCount > 0 ? <span className="blog-chip">{publishedCount} articles published</span> : null}
            {result.rankings_sync ? (
              <span className="blog-chip">{result.rankings_sync.records_written} ranking rows updated</span>
            ) : null}
          </div>

          <div className="blog-card-grid">
            {result.published_articles.map((article) => {
              const articleHref =
                article.status === "published" ? `/articles/${article.slug}` : `/admin/seo/articles/${article.slug}`;
              const ctaLabel = article.status === "published" ? "Open public page" : "Review draft";

              return (
                <a key={article.article_id} href={articleHref} className="blog-card">
                  <span className="eyebrow-link">{article.status}</span>
                  <h3>{article.title}</h3>
                  <p>{article.keyword}</p>
                  <div className="blog-card-footer">
                    <span>{article.slug}</span>
                    <span className="blog-card-cta">{ctaLabel}</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      ) : null}
    </section>
  );
}
