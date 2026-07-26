# Single Homepage Compressor — Changelog

## Strategy

Consolidate authority into **one homepage tool** at `/`. Programmatic exact-KB and intent clone pages **301 redirect** to `/` (with query presets where useful). Sitemap no longer lists redirected URLs.

## Homepage `/`

- **Action:** Rewritten as the single image compressor studio
- **Changed:** Large drag/drop + paste upload; Convert To; Target file size presets + custom KB/MB; advanced quality/resize/metadata/sharpen; before/after preview; human-written content; FAQ + SoftwareApplication/WebApplication/FAQ/Breadcrumb/WebSite schema; AuthorBio
- **Assumption:** Browser output formats are JPG/PNG/WEBP (canvas-safe). AVIF/BMP/GIF/TIFF are accepted as uploads when the browser can decode them.

## Redirected URLs (301 permanent)

| URL pattern | Destination |
|-------------|-------------|
| `/compress-image-to-{10,20,30,40,50,60,80,100,150,200,300,500}kb` | `/?target={n}` |
| `/compress-image-to-1mb` (and 2mb/5mb if hit) | `/?target={1024\|2048\|5120}` |
| `/compress-to-{20,50,100,200}kb` | `/?target={n}` |
| `/image-compressor`, `/image-resizer`, `/image-converter`, `/bulk-image-compressor` | `/` |
| Format converter intents (`jpg-to-webp-converter`, etc.) | `/?format=…` |
| Resize intents (`resize-image-to-1080x1080`, etc.) | `/?width=&height=` |
| Platform/use-case compress intents | `/` |
| `/reduce-image-size` | `/` (query preserved) |

## Kept specialty tools (still indexable)

- `/background-remover`
- `/crop-image`
- `/image-upscaler`
- `/remove-image-metadata`
- `/rotate-flip-image`

## Technical

- Sitemap via `indexableUrls.ts`: home + specialty tools + blog + static only
- Nav/footer simplified — no exact-KB link farms
- Blog `toolUrl()` resolves consolidated slugs to homepage destinations
- Stack note: shipped on **Next.js 14** + existing CSS + Framer Motion (already in repo). Full Tailwind/shadcn/Next 15 migration deferred to avoid breaking production mid-redesign.
