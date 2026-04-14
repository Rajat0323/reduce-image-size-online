from collections.abc import Iterable

import httpx

from app.config import settings


class KeywordDiscoveryService:
    """Heuristic keyword discovery scaffold.

    Replace the fallback expansion with your preferred provider or crawler.
    """

    def generate(self, seed_keyword: str, niche: str | None, country: str, max_results: int) -> list[dict]:
        if settings.serp_api_key:
            discovered = self._discover_from_serpapi(seed_keyword, niche, country, max_results)
            if discovered:
                return discovered

        modifiers = [
            "best",
            "guide",
            "calculator",
            "for beginners",
            "for ecommerce",
            "for small business",
            "checklist",
            "examples",
            "template",
            "comparison",
        ]
        prefixes = [seed_keyword]
        if niche:
            prefixes.append(f"{seed_keyword} {niche}")

        keywords: list[str] = []
        for prefix in prefixes:
            keywords.extend(self._expand(prefix, modifiers))

        unique_keywords = []
        seen = set()
        for keyword in keywords:
            normalized = keyword.lower().strip()
            if normalized in seen:
                continue
            seen.add(normalized)
            unique_keywords.append(keyword)
            if len(unique_keywords) >= max_results:
                break

        return [
            {
                "keyword": keyword,
                "difficulty": 18.0 + index,
                "volume": max(50, 1200 - index * 25),
                "country": country,
                "status": "discovered",
            }
            for index, keyword in enumerate(unique_keywords, start=1)
        ]

    def _expand(self, prefix: str, modifiers: Iterable[str]) -> list[str]:
        return [prefix] + [f"{prefix} {modifier}" for modifier in modifiers]

    def _discover_from_serpapi(
        self, seed_keyword: str, niche: str | None, country: str, max_results: int
    ) -> list[dict]:
        query = f"{seed_keyword} {niche}".strip() if niche else seed_keyword
        params = {
            "engine": "google_autocomplete",
            "q": query,
            "gl": country.lower(),
            "hl": "en",
            "api_key": settings.serp_api_key,
        }

        try:
            response = httpx.get("https://serpapi.com/search.json", params=params, timeout=20.0)
            response.raise_for_status()
            suggestions = response.json().get("suggestions", [])
        except Exception:
            return []

        keywords = [query]
        for item in suggestions:
            value = (item.get("value") or "").strip()
            if value:
                keywords.append(value)

        unique_keywords = []
        seen = set()
        for keyword in keywords:
            normalized = keyword.lower()
            if normalized in seen:
                continue
            seen.add(normalized)
            unique_keywords.append(keyword)
            if len(unique_keywords) >= max_results:
                break

        return [
            {
                "keyword": keyword,
                "difficulty": None,
                "volume": None,
                "country": country,
                "status": "discovered",
            }
            for keyword in unique_keywords
        ]
