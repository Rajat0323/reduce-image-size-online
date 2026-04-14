const API_BASE_URL =
  process.env.NEXT_PUBLIC_SEO_API_BASE_URL || process.env.SEO_API_BASE_URL || "http://localhost:8000";

async function fetchSeoApi<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`SEO API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export type SeoKeyword = {
  id: number;
  keyword: string;
  difficulty?: number | null;
  volume?: number | null;
  country: string;
  status: string;
};

export type SeoArticle = {
  id: number;
  title: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  content_markdown: string;
  status: string;
  published_at?: string | null;
};

export type SeoRanking = {
  keyword: string;
  position?: number | null;
  impressions?: number | null;
  clicks?: number | null;
  ctr?: number | null;
  date: string;
};

export async function getSeoArticles() {
  return fetchSeoApi<SeoArticle[]>("/articles");
}

export async function getSeoArticle(slug: string) {
  return fetchSeoApi<SeoArticle>(`/articles/${slug}`);
}

export async function getSeoRankings() {
  return fetchSeoApi<SeoRanking[]>("/rankings");
}
