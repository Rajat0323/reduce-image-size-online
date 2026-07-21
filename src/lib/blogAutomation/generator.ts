import matter from "gray-matter";

import { SITE_AUTHOR } from "@/seo/author";
import { SITE_NAME, SITE_URL } from "@/constants";
import type { BlogFaq } from "@/lib/blog";
import { blogTopicQueue, blogUrl, toolUrl, type BlogTopic } from "@/lib/blogAutomation/topics";
import { assertSiteToolSlug, validateBlogTopicTools } from "@/lib/blogAutomation/siteTools";

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
].filter((slug) => {
  try {
    assertSiteToolSlug(slug, "globalExactKbLinks");
    return true;
  } catch {
    return false;
  }
});

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
      question: `How do I ${primary.label.toLowerCase()} step by step?`,
      answer: `Open ${link(primary.slug, primary.label)}, upload your image at the top of the page, adjust settings, preview the result, and download. Processing stays in your browser — your file is not sent to our servers for editing.`,
    },
    {
      question: `Is ${primary.label.toLowerCase()} free for users in the USA and UK?`,
      answer: `Yes. ${SITE_NAME} tools are free for ${topic.regions.join(", ")} users with no account required. Files are processed locally in your browser.`,
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
      question: "Does compressing images help page speed?",
      answer: "Yes. Smaller images load faster, which helps Core Web Vitals and keeps visitors on your site. I notice the biggest wins when hero images and product photos are optimized before upload.",
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
      question: "Can I use these tools on my phone?",
      answer: "Yes. I test most workflows on mobile browsers. Upload from your gallery, preview, download, and submit — no app install needed.",
    },
    {
      question: `What should ${topic.audience} do when an upload keeps failing?`,
      answer: `Check pixel dimensions, format, and background rules — not just file size. I usually resize first with ${link("image-resizer", "Image Resizer")}, then compress with ${link(primary.slug, primary.label)} or an exact-KB preset.`,
    },
    {
      question: "Who writes these guides?",
      answer: `${SITE_AUTHOR.name}, founder of ${SITE_NAME}, writes and tests each guide against the live tools. See the full profile at ${SITE_URL}/about.`,
    },
    {
      question: "How do I know my file is private?",
      answer: "Standard tools process images locally in your browser. Your photos are not stored on our servers while you edit.",
    },
    {
      question: "What if my file is still rejected after compression?",
      answer: "Verify pixel dimensions, format, and background rules — not just KB size. Try cropping, converting format, or a lower exact-KB preset before re-uploading.",
    },
    {
      question: `When would I pick ${primary.label} over a desktop editor?`,
      answer: `When you need a quick result on any device without installing software. ${primary.label} is built for one-off uploads — forms, listings, and chat attachments — not layered design work.`,
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

If you work with ${topic.audience.toLowerCase()} in ${topic.regions.join(", ")}, you have probably seen an upload fail at the last minute — wrong file size, wrong dimensions, or a format the portal does not accept. ${topic.searchIntent} I built ${SITE_NAME} for exactly these moments: open a tool in your browser, fix the file locally, and download without installing software.

This guide walks through **${topic.keywords[0]}** using tools I maintain and test myself. You will see which page to open first, when to resize before compressing, and which related tools save time on repeat uploads.

*Written by ${SITE_AUTHOR.name}, founder of ${SITE_NAME}.*

## Why ${primary.label} comes up so often

Marketplaces, job boards, CMS dashboards, and mobile apps all have different rules. A photo that looks fine on your phone can still fail a strict portal. Starting with ${link(primary.slug, primary.label)} usually fixes the problem faster than guessing in a generic editor.

**${topic.audience}** typically need to:

- open ${link(primary.slug, primary.label)} before a deadline
- match pixel dimensions the portal publishes
- pick JPG, WebP, or PNG on purpose
- check the result at 100% zoom before submitting

People search for **${topic.keywords.slice(0, 4).join(", ")}** because they need a working file today — not a tutorial that sends them to desktop software they do not have installed.

## Start here: ${primary.label}

The fastest path is the dedicated tool page:

- **Primary workflow:** ${link(primary.slug, primary.label)}
- **General compression:** ${link("image-compressor", "Image Compressor")}
- **Resize dimensions:** ${link("image-resizer", "Image Resizer")}
- **Format changes:** ${link("image-converter", "Image Converter")}

Every tool page puts the upload area at the top. You should not scroll past a long intro to find the workspace — I designed it that way on purpose.

## Step-by-step workflow

1. Read the destination platform requirements (KB, pixels, format, background).
2. Open ${link(primary.slug, primary.label)} and upload your source file.
3. Crop or rotate if framing is wrong — ${link("crop-image", "Crop Image")}, ${link("rotate-flip-image", "Rotate and Flip")}.
4. Resize when dimensions are specified — ${link("image-resizer", "Image Resizer")}.
5. Convert HEIC/PNG/WebP if needed — ${link("image-converter", "Image Converter")}.
6. Compress to target size — ${link("image-compressor", "Image Compressor")} or exact-KB presets below.
7. Preview at 100% zoom; check faces, text, and edges.
8. Download and verify file properties before submitting.
9. Add descriptive alt text and a sensible filename if publishing on a website.

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

## Faster pages and useful links

Heavy images slow down websites — especially hero shots and product galleries. If you publish on WordPress or Shopify, optimize before upload:

- ${link("compress-image-for-website", "Compress for Website")}
- ${link("compress-image-for-wordpress", "Compress for WordPress")}
- ${link("compress-image-to-200kb", "Compress to 200KB")}

I link related tools inside each guide so you can jump straight to the next step without searching the site.

### Quick reference

| What you need | Where to go |
|---------------|-------------|
| Primary tool | ${toolUrl(primary.slug)} |
| General compressor | ${toolUrl("image-compressor")} |
| Format converter | ${toolUrl("image-converter")} |
| This guide | ${blogUrl(topic.slug)} |

## Format guide: JPG, PNG, WebP, HEIC

- **JPG** — default for photos and most forms; smallest for portraits
- **PNG** — transparency and crisp UI text; larger files
- **WebP** — excellent for modern marketing sites and blogs
- **HEIC** — iPhone default; convert before strict portals — ${link("heic-to-jpg-converter", "HEIC to JPG")}

Never convert PNG to JPG when transparency is required. For listings, ${link("png-to-jpg-converter", "PNG to JPG")} helps when alpha is unnecessary.

## Platform quick links

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

## How to choose the right target file size

There is no single "correct" file size — it depends on where the image will live. For ${topic.audience.toLowerCase()}, I use a simple rule of thumb: match the destination, then leave a small safety margin. A profile avatar rarely needs more than 100KB, a feed photo usually looks great between 150KB and 300KB, and a full-width hero image can sit around 200KB to 400KB after resizing. When a portal publishes a hard cap, aim 5–10% under it so metadata and re-encoding never push you back over the line at the last second.

If you are unsure where to start, open the general ${link("image-compressor", "Image Compressor")} and watch the live output size as you move the quality slider. When you need an exact number rather than a range, switch to a preset such as ${link("compress-image-to-100kb", "Compress to 100KB")} or ${link("compress-image-to-200kb", "Compress to 200KB")} instead of guessing and re-exporting several times.

## Mobile-first upload workflow

Most ${topic.audience.toLowerCase()} in ${topic.regions.join(" and ")} now upload straight from a phone. Because every ${SITE_NAME} tool runs in the browser, the mobile flow mirrors desktop: open ${link(primary.slug, primary.label)}, pick the photo from your gallery, adjust, and save the result back to your device. There is no app to install and nothing syncs to a server while you edit. On slower mobile data, compressing before upload also means the file transfers faster and is far less likely to time out mid-submission — a common cause of "upload failed" errors that have nothing to do with the portal's size rules.

If your source is an iPhone HEIC file, convert it first with ${link("heic-to-jpg-converter", "HEIC to JPG")} so the destination accepts the format, then resize and compress as usual.

## A quick before-and-after quality check

Before submitting anything, I run the same three checks every time. First, zoom to 100% and inspect faces, logos, and small text — these are where over-compression shows first. Second, confirm the pixel dimensions match what the platform asked for, not just the KB size, because a small file at the wrong dimensions still fails. Third, open the exported file's properties to verify the final size and format before upload. This 30-second habit prevents the most common rejection of all: a technically small file that still breaks a dimension or format rule.

## Accessibility, alt text, and SEO

If the image ends up on a public web page, the file itself is only half the job. Descriptive, human-readable alt text helps screen readers and gives search engines context, which matters for ${topic.regions.join(" / ")} SEO. Keep filenames meaningful — for example \`blue-running-shoe-side.jpg\` instead of \`IMG_4821.jpg\` — and reuse the same optimized asset across pages rather than uploading several heavy copies. For publishing platforms, compress once with ${link("compress-image-for-website", "Compress for Website")} and serve modern formats via ${link("jpg-to-webp-converter", "JPG to WebP")} wherever your theme supports them.

## Deep workflow for ${topic.primaryTool.label}

When ${topic.audience} open ${link(primary.slug, primary.label)}, they should expect a predictable sequence. First, the upload surface appears immediately at the top of the page — no hunting through long intros. Second, format and quality controls reflect the destination: JPG for photos, PNG when transparency matters, WebP when the marketing site supports modern formats. Third, the preview panel shows original versus output size so you can validate results before download.

If the portal publishes both **KB caps** and **pixel boxes**, always satisfy pixels first. A 50KB file at the wrong dimensions still fails. Use ${link("image-resizer", "Image Resizer")} presets or custom width and height, then return to ${link(primary.slug, primary.label)} or an exact-KB route.

## Region-by-region notes

### United States

US sellers and publishers often need Amazon product photos, LinkedIn headshots, WordPress assets, and mobile-friendly uploads. I test these flows on phone and desktop — many people fix a file on their phone and submit from the same device.

### United Kingdom and London

UK users hit gov.uk digital photo rules, passport scans, and EU-facing marketplace specs. WhatsApp sharing on mobile data is smoother when you compress first with ${link("compress-image-for-whatsapp", "WhatsApp compression")}.

### Other English-speaking markets

Canada, Australia, New Zealand, and Singapore share similar upload limits. One thorough guide with clear tool links beats a pile of short posts that repeat the same advice.

## When to use each related tool

${topic.relatedTools
  .map(
    (tool) =>
      `### ${tool.label}\n\nUse ${link(tool.slug, tool.label)} when ${topic.searchIntent.toLowerCase()} requires an adjacent step — resizing, converting, compressing, or preparing assets for ${topic.regions.join(" / ")} audiences. Bookmark the URL for your team SOP library.`
  )
  .join("\n\n")}

## Keeping guides up to date

Platform rules change. Amazon, LinkedIn, Instagram, and government portals update photo guidance from time to time. When that happens, I update the matching tool page and refresh links in related guides.

## About the author

${SITE_AUTHOR.bioLong} Read more at [${SITE_AUTHOR.name} — About](${SITE_URL}/about) or email ${SITE_AUTHOR.email} if you spot outdated portal limits.

## Conclusion

${topic.audience} in ${topic.regions.join(", ")} should bookmark ${link(primary.slug, primary.label)} and the related tools above. Resize when dimensions matter, convert when format matters, then compress to the target your portal expects.

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
  validateBlogTopicTools(topic);
  const faqs = buildFaqs(topic);
  let body = buildBody(topic, faqs);
  let bodyWordCount = countWords(body);
  let totalWordCount = bodyWordCount + faqWordCount(faqs);

  if (totalWordCount < MIN_TOTAL_WORDS) {
    const primary = topic.primaryTool;
    const padding = `

## Extra tips from ${SITE_AUTHOR.name}

When I help ${topic.audience.toLowerCase()} in ${topic.regions.join(" and ")}, I keep a simple checklist: read the portal rules, resize to the published pixel box, pick the right format, then compress with ${link(primary.slug, primary.label)}. Skipping the dimension step is the most common reason uploads fail even when the KB count looks correct.

If you manage a team, save the tool URLs you use most often in a shared doc — one link per platform beats searching every time a listing or form is due. When a platform changes its limits, update that doc and re-test with a sample photo at 100% zoom before rolling out to everyone.

For catalog work, ${link("bulk-image-compressor", "Bulk Image Compressor")} saves time, but I still spot-check faces and text on high-value images individually. A batch pass that looks fine at thumbnail size can look soft when zoomed in on a product page.

Questions about this workflow? I read feedback at ${SITE_AUTHOR.email} and update guides when real users report new portal rules.

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
