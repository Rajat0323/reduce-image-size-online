import "server-only";

import { revalidatePath } from "next/cache";

import type { SeoArticle, SeoPipelineResult, SeoRanking } from "@/lib/seoAutomationApi";

const API_BASE_URL =
  process.env.SEO_API_BASE_URL || process.env.NEXT_PUBLIC_SEO_API_BASE_URL || "http://localhost:8000";

function getAdminApiSecret() {
  return process.env.SEO_API_ADMIN_SECRET || process.env.ADMIN_API_SECRET || "";
}

async function fetchSeoAdminApi<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  headers.set("Content-Type", "application/json");

  const adminSecret = getAdminApiSecret();
  if (adminSecret) {
    headers.set("x-admin-secret", adminSecret);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
    cache: init?.method && init.method !== "GET" ? "no-store" : undefined,
    next: init?.method && init.method !== "GET" ? undefined : { revalidate: 60 },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `SEO admin API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function revalidateSeoAdminPages(slug?: string) {
  revalidatePath("/admin/seo");
  revalidatePath("/admin/seo/articles");
  revalidatePath("/articles");

  if (slug) {
    revalidatePath(`/admin/seo/articles/${slug}`);
    revalidatePath(`/articles/${slug}`);
  }
}

export async function getAdminSeoArticles() {
  return fetchSeoAdminApi<SeoArticle[]>("/articles?include_drafts=true");
}

export async function getAdminSeoArticle(slug: string) {
  return fetchSeoAdminApi<SeoArticle>(`/articles/${slug}`);
}

export async function runAdminSeoPipeline(payload: {
  seed_keyword: string;
  niche?: string;
  country: string;
  max_results: number;
  publish_count: number;
  target_word_count: number;
  sync_rankings: boolean;
}) {
  return fetchSeoAdminApi<SeoPipelineResult>("/pipeline/manual-run", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function syncAdminSeoRankings() {
  return fetchSeoAdminApi<{ synced_keywords: number; records_written: number; source: string }>("/rankings/sync", {
    method: "POST",
  });
}

export async function publishAdminSeoArticle(slug: string) {
  return fetchSeoAdminApi<SeoArticle>(`/articles/${slug}/publish`, {
    method: "POST",
  });
}

export async function getAdminSeoRankings() {
  return fetchSeoAdminApi<SeoRanking[]>("/rankings");
}
