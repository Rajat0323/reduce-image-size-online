"use client";

import { useState, useTransition } from "react";

import { runManualSeoPipeline, syncSeoRankingsNow, type SeoPipelineResult } from "@/lib/seoAutomationApi";

const defaultForm = {
  seed_keyword: "image compressor to 20kb",
  niche: "india",
  country: "IN",
  max_results: 5,
  publish_count: 1,
  target_word_count: 2200,
  sync_rankings: false,
};

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
        const response = await runManualSeoPipeline(form);
        setResult(response);
        setMessage("Manual pipeline completed.");
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Pipeline failed.");
      }
    });
  }

  function runRankingSync() {
    setMessage("");
    startTransition(async () => {
      try {
        const response = await syncSeoRankingsNow();
        setMessage(
          `Ranking sync finished. Checked ${response.synced_keywords} keywords and wrote ${response.records_written} rows.`
        );
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Ranking sync failed.");
      }
    });
  }

  return (
    <section className="blog-card admin-action-card">
      <div className="admin-action-header">
        <div>
          <p className="section-heading">Manual trigger</p>
          <p className="section-subtitle">
            Free-stage workflow: manually trigger keyword discovery, content generation, publishing,
            and optional rank sync without paid background workers.
          </p>
        </div>
        <div className="blog-chip-row">
          <span className="blog-chip">No worker needed</span>
          <span className="blog-chip">One-click run</span>
          <span className="blog-chip">Free-friendly setup</span>
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
          <span className="field-label">Articles to publish</span>
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
        <span>Also sync rankings after publishing</span>
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
            <span className="blog-chip">{result.published_articles.length} articles published</span>
            {result.rankings_sync ? (
              <span className="blog-chip">{result.rankings_sync.records_written} ranking rows updated</span>
            ) : null}
          </div>

          <div className="blog-card-grid">
            {result.published_articles.map((article) => (
              <a key={article.article_id} href={`/articles/${article.slug}`} className="blog-card">
                <span className="eyebrow-link">{article.status}</span>
                <h3>{article.title}</h3>
                <p>{article.keyword}</p>
                <div className="blog-card-footer">
                  <span>{article.slug}</span>
                  <span className="blog-card-cta">Open article</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
