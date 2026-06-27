import matter from "gray-matter";

import { SITE_NAME, SITE_URL } from "@/constants";
import type { BlogFaq } from "@/lib/blog";
import { blogTopicQueue, blogUrl, toolUrl, type BlogTopic } from "@/lib/blogAutomation/topics";

const MIN_TOTAL_WORDS = 2600;
const MIN_FAQ_COUNT = 12;

function faqWordCount(faqs: BlogFaq[]) {
  return faqs.reduce(
    (sum, faq) => sum + countWords(faq.question) + countWords(faq.answer),
    0
  );
}

const evergreenBlogLinks = [
  { slug: "free-online-image-tools-guide-2026", label: "Free online image tools guide" },
  { slug: "complete-image-optimization-seo-guide-2026", label: "Complete image SEO guide" },
  { slug: "how-to-reduce-image-size", label: "How to reduce image size online" },
  { slug: "reduce-image-size-without-losing-quality", label: "Reduce size without losing quality" },
  { slug: "complete-guide-to-image-tools-india", label: "Image tools for global uploads" },
];

const globalExactKbLinks = [
  "compress-image-to-20kb",
  "compress-image-to-50kb",
  "compress-image-to-100kb",
  "compress-image-to-200kb",
  "compress-image-to-500kb",
];

function countWords(text: string) {
  return text.split(/\s+/).filter(Boolean).length;
}

function link(slug: string, label: string) {
  return `[${label}](${toolUrl(slug)})`;
}

function blogLink(slug: string, label: string) {
  return `[${label}](${blogUrl(slug)})`;
}

function buildFaqs(topic: BlogTopic): BlogFaq[] {
  const primary = topic.primaryTool;
  return [
    {
      question: `${topic.h1}?`,
      answer: `Open the ${primary.label} page on ReduceImageSize, upload your image at the top of the tool, adjust settings, preview the result, and download. Processing stays in your browser for privacy.`,
    },
    {
      question: `Is ${primary.label.toLowerCase()} free for users in the USA and UK?`,
      answer: `Yes. ReduceImageSize tools are free for ${topic.regions.join(", ")} users with no account required. Files are processed locally in your browser.`,
    },
    {
      question: "Are my images uploaded to ReduceImageSize servers?",
      answer: "No. Standard tools process files on your device using browser APIs. Your photos are not stored on our servers for editing.",
    },
    {
      question: `Which tool should I use first for ${topic.audience}?`,
      answer: `Start with ${link(primary.slug, primary.label)}. Related workflows include ${topic.relatedTools.slice(0, 3).map((t) => link(t.slug, t.label)).join(", ")}.`,
    },
    {
      question: "Does image compression help Google rankings?",
      answer: "Yes. Smaller images improve page speed and Core Web Vitals, which Google uses as quality signals. Faster pages often rank better and convert more visitors in the USA, UK, and worldwide.",
    },
    {
      question: "What is the best format for web uploads?",
      answer: "WebP often delivers the smallest size on modern sites. JPG remains the safest default for forms and legacy portals. PNG is best when transparency is required.",
    },
    {
      question: "Should I resize before compressing?",
      answer: "Yes when targeting strict KB limits or large camera originals. Resize to the required pixel box first, then compress with the main compressor or an exact-KB preset.",
    },
    {
      question: "Can I use these tools on mobile phones?",
      answer: "Yes. ReduceImageSize works in modern mobile browsers for quick uploads before submitting forms, listings, or chat attachments.",
    },
    {
      question: `How does this guide help ${topic.regions.join(" and ")} search intent?`,
      answer: `This page targets ${topic.keywords.slice(0, 3).join(", ")} with step-by-step workflows, internal links to live tools, and FAQ schema so Google understands the topic deeply.`,
    },
    {
      question: "How many internal links should a SEO blog include?",
      answer: "Strong topical pages link to 8–15 relevant tool URLs plus related guides. ReduceImageSize blogs connect compressors, converters, resizers, and platform pages to build trust and crawl depth.",
    },
    {
      question: "When should I request indexing in Google Search Console?",
      answer: "After publishing, open Search Console URL Inspection for this blog post and click Request Indexing. Also submit your sitemap and monitor Coverage reports weekly.",
    },
    {
      question: "What if my file is still rejected after compression?",
      answer: "Verify pixel dimensions, format, and background rules—not just KB size. Try cropping, converting format, or a lower exact-KB preset before re-uploading.",
    },
    {
      question: `Why is ${primary.label} popular in high-click regions?`,
      answer: `Users in the USA, UK, and global markets search for practical upload fixes. ${primary.label} matches real intent with a fast, private, browser-based workflow and no sign-up friction.`,
    },
    {
      question: "Can I batch process many images?",
      answer: "Use the bulk image compressor for catalogs. Single-file tools remain better when each image needs individual quality review at 100% zoom.",
    },
  ];
}

function buildBody(topic: BlogTopic, faqs: BlogFaq[]): string {
  const primary = topic.primaryTool;
  const relatedList = topic.relatedTools.map((t) => `- ${link(t.slug, t.label)}`).join("\n");
  const exactKbList = globalExactKbLinks
    .map((slug) => `- ${link(slug, slug.replace(/-/g, " "))}`)
    .join("\n");
  const blogLinks = evergreenBlogLinks
    .filter((b) => b.slug !== topic.slug)
    .map((b) => `- ${blogLink(b.slug, b.label)}`)
    .join("\n");

  return `# ${topic.h1}

${topic.audience} across ${topic.regions.join(", ")} repeatedly hit the same wall: uploads fail, pages load slowly, or Google Search Console flags image weight. ${topic.searchIntent}. ReduceImageSize solves this with **free browser-based tools** — upload at the top of each page, preview locally, and download without sending files to unknown servers.

This guide connects **${topic.keywords[0]}** intent to live workflows on ${SITE_NAME}. You will learn which tool to open first, how to combine resize + convert + compress, and how strong internal links help Google trust your site cluster.

## Why ${primary.label} matters in the USA, UK, and global markets

High-click regions like the United States, London and the wider UK, Canada, Australia, and Western Europe share demanding upload rules. Marketplaces, professional networks, CMS platforms, and mobile chat apps all re-compress images — starting with an optimized file preserves quality.

**${topic.audience}** benefit when they:

- open ${link(primary.slug, primary.label)} before deadlines
- match pixel dimensions portals publish
- choose JPG, WebP, or PNG deliberately
- monitor Core Web Vitals after publishing web assets

Search demand for **${topic.keywords.slice(0, 4).join(", ")}** is intent-rich: users want a result now, not a desktop install. ReduceImageSize pages match that intent with 3000+ word tool guides, FAQ schema, and HowTo markup sitewide.

## Start here: ${primary.label}

The fastest path is the dedicated tool page:

- **Primary workflow:** ${link(primary.slug, primary.label)}
- **General compression:** ${link("image-compressor", "Image Compressor")}
- **Resize dimensions:** ${link("image-resizer", "Image Resizer")}
- **Format changes:** ${link("image-converter", "Image Converter")}

Upload areas sit **above the fold** on every tool page so you never hunt for the workspace. That UX pattern reduces bounce rate — a positive engagement signal for SEO.

## Step-by-step workflow

1. Read the destination platform requirements (KB, pixels, format, background).
2. Open ${link(primary.slug, primary.label)} and upload your source file.
3. Crop or rotate if framing is wrong — ${link("crop-image", "Crop Image")}, ${link("rotate-flip-image", "Rotate and Flip")}.
4. Resize when dimensions are specified — ${link("image-resizer", "Image Resizer")}.
5. Convert HEIC/PNG/WebP if needed — ${link("image-converter", "Image Converter")}.
6. Compress to target size — ${link("image-compressor", "Image Compressor")} or exact-KB presets below.
7. Preview at 100% zoom; check faces, text, and edges.
8. Download and verify file properties before submitting.
9. Add descriptive alt text and filename if publishing on a website.
10. Request indexing in Search Console when publishing supporting blog content.

## Related tools for this topic

${relatedList}

## Exact-KB presets for strict portals

Government forms, job boards, and legacy portals often publish hard caps:

${exactKbList}

If quality looks soft at low KB targets, **resize first** then compress again. Removing empty background with ${link("crop-image", "Crop Image")} or ${link("background-remover", "Background Remover")} often saves more kilobytes than aggressive quality sliders.

## USA-focused optimization tips

United States users drive high click volume for marketplace, professional, and CMS workflows. US sellers and publishers should:

- pre-compress hero images before WordPress or Shopify upload
- use WebP with JPG fallback when themes allow — ${link("jpg-to-webp-converter", "JPG to WebP")}
- keep product galleries under ~200KB per image when possible
- test mobile LTE performance — many US users upload from phones

For Amazon and eBay sellers, pair ${link("compress-image-for-amazon", "Compress for Amazon")} and ${link("compress-image-for-ebay", "Compress for eBay")} with white-background product shots.

## UK, London, and European upload tips

UK professionals and London-based remote workers often use LinkedIn, gov.uk services, and EU-facing marketplaces. Recommendations:

- compress profile photos before ${link("compress-image-for-linkedin", "LinkedIn uploads")}
- verify passport and visa photo dimensions carefully
- use ${link("compress-image-for-whatsapp", "WhatsApp compression")} before sharing large albums on mobile data
- prefer sRGB exports for consistent color on web

## Global SEO: Core Web Vitals and internal linking

Google evaluates **page experience** alongside content relevance. Images affect **Largest Contentful Paint** when heroes or product shots are the LCP element. Optimize above-the-fold assets first:

- ${link("compress-image-for-website", "Compress for Website")}
- ${link("compress-image-for-wordpress", "Compress for WordPress")}
- ${link("compress-image-to-200kb", "Compress to 200KB")}

Internal links matter as much as file size. This blog connects to live tools so crawlers discover related URLs. Your own site should link **from** high-traffic posts **to** tool pages and **between** guides — mirroring the ReduceImageSize hub pattern.

### Suggested internal link cluster

| Page type | Example URL |
|-----------|-------------|
| Primary tool | ${toolUrl(primary.slug)} |
| Compressor hub | ${toolUrl("image-compressor")} |
| Converter hub | ${toolUrl("image-converter")} |
| This blog | ${blogUrl(topic.slug)} |
| Sitemap | ${SITE_URL}/sitemap.xml |

## Format guide: JPG, PNG, WebP, HEIC

- **JPG** — default for photos and most forms; smallest for portraits
- **PNG** — transparency and crisp UI text; larger files
- **WebP** — excellent for modern marketing sites and blogs
- **HEIC** — iPhone default; convert before strict portals — ${link("heic-to-jpg-converter", "HEIC to JPG")}

Never convert PNG to JPG when transparency is required. For listings, ${link("png-to-jpg-converter", "PNG to JPG")} helps when alpha is unnecessary.

## Platform quick links (high click intent)

- Instagram: ${link("compress-image-for-instagram", "Compress for Instagram")} + ${link("resize-image-to-1080x1080", "1080×1080 resize")}
- Facebook: ${link("compress-image-for-facebook", "Compress for Facebook")}
- LinkedIn: ${link("compress-image-for-linkedin", "Compress for LinkedIn")}
- YouTube: ${link("resize-image-for-youtube-thumbnail", "YouTube thumbnail resize")}
- Shopify: ${link("compress-image-for-shopify", "Compress for Shopify")}
- Email: ${link("compress-image-for-email", "Compress for Email")}

## Bulk and metadata workflows

Catalog teams processing dozens of SKUs should use ${link("bulk-image-compressor", "Bulk Image Compressor")}. Privacy-conscious teams strip EXIF with ${link("remove-image-metadata", "Remove Image Metadata")} before publishing supplier assets.

## Common mistakes to avoid

- Compressing 4000px phone photos without resizing first
- Re-compressing the same JPG repeatedly
- Ignoring pixel dimensions when KB is correct
- Using screenshots when originals are available
- Skipping alt text on informative images
- Linking only to the homepage instead of specific tool URLs

## How to request Google indexing (manual step)

After this post is live:

1. Open [Google Search Console](https://search.google.com/search-console)
2. Paste: \`${blogUrl(topic.slug)}\`
3. Click **Request Indexing**
4. Confirm \`${SITE_URL}/sitemap.xml\` is submitted

Indexing is not instant, but manual requests help new daily blogs enter the crawl queue faster.

## Related guides on ${SITE_NAME}

${blogLinks}

## Privacy and local processing

Browser-based tools keep files on-device during editing — important for ID scans, contracts, and unreleased product shots. Verify your organization policy for regulated industries.

## Troubleshooting rejected uploads

When portals reject files:

1. Re-read dimension and aspect ratio rules
2. Confirm JPG vs PNG vs PDF requirements
3. Check background color for ID photos
4. Remove metadata if forbidden
5. Aim 5–10% below published KB caps
6. Try ${link("compress-image-to-50kb", "50KB")} or ${link("compress-image-to-100kb", "100KB")} presets

## Build trust with Google over time

Daily SEO-rich blogs only work when the site graph is coherent. ReduceImageSize publishes:

- tool pages with 3000+ words and FAQ schema
- platform intent pages for Instagram, WordPress, Amazon, and more
- blogs with HowTo + BlogPosting + FAQPage JSON-LD

Your rankings improve when users find answers quickly, click through to working tools, and return — not when pages are thin or disconnected.

## Deep workflow for ${topic.primaryTool.label}

When ${topic.audience} open ${link(primary.slug, primary.label)}, they should expect a predictable sequence. First, the upload surface appears immediately at the top of the page — no hunting through long intros. Second, format and quality controls reflect the destination: JPG for photos, PNG when transparency matters, WebP when the marketing site supports modern formats. Third, the preview panel shows original versus output size so you can validate results before download.

If the portal publishes both **KB caps** and **pixel boxes**, always satisfy pixels first. A 50KB file at the wrong dimensions still fails. Use ${link("image-resizer", "Image Resizer")} presets or custom width and height, then return to ${link(primary.slug, primary.label)} or an exact-KB route.

## Region-by-region search behavior

### United States (high click volume)

US searchers often click tools tied to **marketplaces**, **professional networks**, and **CMS publishing**. Common high-intent queries include Amazon product photo size, LinkedIn headshot compression, WordPress image SEO, and Core Web Vitals fixes. US mobile traffic is large — optimize on phone, download, then upload from the same device.

### United Kingdom and London

UK users mirror US needs but also hit gov.uk digital photo rules, NHS-related uploads, and EU-facing marketplace specs. London-based remote workers frequently compress LinkedIn photos and passport scans. WhatsApp sharing on UK mobile networks benefits from ${link("compress-image-for-whatsapp", "WhatsApp compression")} before sending albums.

### Global English-speaking markets

Canada, Australia, New Zealand, and Singapore users search the same English keywords. Global blogs should link to tool URLs consistently (canonical on ${SITE_URL}) and avoid duplicate thin pages. One strong 2600+ word guide plus internal links outperforms many short posts.

## Internal linking playbook (copy this pattern)

Every new blog should link to:

1. One **primary tool** — ${link(primary.slug, primary.label)}
2. Three **supporting tools** from the related list above
3. At least **four exact-KB pages** when compression is relevant
4. Two **converter pages** when format is relevant
5. Two **existing blogs** for topical cluster strength

Example anchor text (good): "open the compress for Amazon tool" — not "click here."

Google discovers relationships through links. Users discover the next step through links. Both improve trust.

## Extended tool reference for this topic

${topic.relatedTools
  .map(
    (tool) =>
      `### ${tool.label}\n\nUse ${link(tool.slug, tool.label)} when ${topic.searchIntent.toLowerCase()} requires an adjacent step — resizing, converting, compressing, or preparing assets for ${topic.regions.join(" / ")} audiences. Bookmark the URL for your team SOP library.`
  )
  .join("\n\n")}

## Content freshness and reruns

Platform rules change. Amazon, LinkedIn, Instagram, and gov portals update photo guidance periodically. When rules change, update internal links from your CMS to the latest ReduceImageSize intent page rather than creating conflicting advice across old posts.

If you already published about this topic, refresh the **tool links** and **FAQ** sections instead of duplicating near-identical posts. Google rewards genuinely updated helpful content.

## Analytics and Search Console monitoring

After indexing:

- Watch **Queries** in Search Console for ${topic.keywords.slice(0, 3).join(", ")}
- Compare **CTR** before and after publishing supporting blogs
- Track **LCP** in PageSpeed Insights for money pages linked from this post
- Confirm GA4 Realtime shows landing traffic from organic tests

High-click regions like the USA and UK show movement in Search Console within days to weeks — not instantly.

## Security note for teams

Browser-based processing reduces third-party exposure but does not replace corporate policy. Regulated teams should document approved tools. ReduceImageSize keeps standard editing local; still avoid processing highly classified material on shared kiosks.

## Conclusion

${topic.audience} in ${topic.regions.join(", ")} should bookmark ${link(primary.slug, primary.label)} and related tools. Combine resize, convert, and compress steps, link internally between guides and tools, and request Search Console indexing when you publish.

**Open now:** ${link(primary.slug, primary.label)} · ${link("image-compressor", "Image Compressor")} · ${link("image-resizer", "Image Resizer")} · ${link("image-converter", "Image Converter")}
`;
}

export type GeneratedBlogPost = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  date: string;
  faqs: BlogFaq[];
  body: string;
  bodyWordCount: number;
  totalWordCount: number;
  topic: BlogTopic;
};

export function generateBlogPost(topic: BlogTopic, date: string): GeneratedBlogPost {
  const faqs = buildFaqs(topic);
  let body = buildBody(topic, faqs);
  let bodyWordCount = countWords(body);
  let totalWordCount = bodyWordCount + faqWordCount(faqs);

  if (totalWordCount < MIN_TOTAL_WORDS) {
    const primary = topic.primaryTool;
    const padding = `

## Additional best practices for ${topic.regions.join(" and ")} teams

Teams publishing daily should document which ${SITE_NAME} URLs they use for each platform. Maintain a shared sheet mapping **platform → tool URL → KB target → pixel box**. When Google updates Core Web Vitals thresholds or platforms change upload rules, update internal links from your CMS blog posts to the newest ReduceImageSize guides.

Auditing competitors in the USA and UK often reveals slow hero images and unoptimized PNG screenshots. You can outperform them by shipping WebP heroes, descriptive alt text, and internal links to intent-specific tool pages rather than generic homepages. Track click-through rates in Search Console and double down on topics that already earn impressions for ${topic.keywords.join(", ")}.

Publishers in London, New York, San Francisco, and other high-competition markets should treat image SEO as ongoing operations — not a one-time plugin install. Schedule quarterly audits: export top landing pages, list LCP elements, open the linked image URL, and re-compress if weight exceeds your budget. Link from those landing pages to ${link(primary.slug, primary.label)} and sibling tools so users and crawlers always find a working next step.

Long-term trust comes from helpful depth: 2600+ word guides, honest FAQ answers, working browser tools, and a crawlable sitemap. ReduceImageSize is built as a global hub so each new blog strengthens the whole graph — not an isolated post. When your team adds a new SKU, job listing, or blog post, reuse the same internal link pattern: primary tool, exact-KB helper, converter fallback, and two related guides.

`;

    body += padding;
    bodyWordCount = countWords(body);
    totalWordCount = bodyWordCount + faqWordCount(faqs);
  }

  if (faqs.length < MIN_FAQ_COUNT) {
    throw new Error(`FAQ count ${faqs.length} below minimum ${MIN_FAQ_COUNT}`);
  }

  if (totalWordCount < MIN_TOTAL_WORDS) {
    throw new Error(`Total word count ${totalWordCount} below minimum ${MIN_TOTAL_WORDS}`);
  }

  return {
    slug: topic.slug,
    title: topic.title,
    description: topic.description,
    keywords: topic.keywords,
    date,
    faqs,
    body,
    bodyWordCount,
    totalWordCount,
    topic,
  };
}

export function renderBlogMarkdown(post: GeneratedBlogPost) {
  return matter.stringify(post.body, {
    title: post.title,
    description: post.description,
    keywords: post.keywords.join(", "),
    date: post.date,
    faqs: post.faqs,
    autoGenerated: true,
    regions: post.topic.regions,
    primaryTool: post.topic.primaryTool.slug,
  });
}

export function pickNextTopic(existingSlugs: Set<string>) {
  for (const topic of blogTopicQueue) {
    if (!existingSlugs.has(topic.slug)) {
      return topic;
    }
  }

  const base = blogTopicQueue[existingSlugs.size % blogTopicQueue.length];
  const suffix = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return {
    ...base,
    slug: `${base.slug}-${suffix}`,
    title: `${base.title} (${new Date().getFullYear()} Update)`,
  };
}

export { blogTopicQueue, MIN_TOTAL_WORDS, MIN_FAQ_COUNT };
